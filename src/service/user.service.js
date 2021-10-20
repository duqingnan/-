const User = require('../model/use.model')


class UserService{
    //输出操作是异步的
    async createUser(user_name,password){
        //todo:写入数据库
        //return '写入数据库成功'  //promise对象

        //插入数据
        // User.create({
        //     user_name:user_name,
        //     password:password
        // })
        const res = await User.create({user_name,password})
        //console.log(res)
       // console.log(aaa)
        return res.dataValues
    }
    async getUserInfo({id,user_name,password,is_admin}){
        const whereOpt = {}
        id && Object.assign(whereOpt,{id})
        user_name && Object.assign(whereOpt,{user_name})
        password && Object.assign(whereOpt,{password})
        is_admin && Object.assign(whereOpt,{is_admin})

        const res = await User.findOne({
            //查询哪些字段
            attributes:['id','user_name','password','is_admin'],
            where:whereOpt
        })
        return res ? res.dataValues : null
    }

    async updateById({id,user_name,password,is_admin}){
        const whereOpt = {id}
        const newUser = {}
        user_name && Object.assign(newUser,{user_name})
        password && Object.assign(newUser,{password})
        is_admin && Object.assign(newUser,{is_admin})

        const res = await User.update(newUser,{where:whereOpt})
        //console.log(res)
        return res[0] > 0 ? true : false
    }
}

module.exports = new UserService()