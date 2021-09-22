class UserService{
    //输出操作是异步的
    async createUser(user_name,password){
        //todo:写入数据库
        return '写入数据库成功'  //promise对象
    }
}

module.exports = new UserService()