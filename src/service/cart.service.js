const { Op, where } = require("sequelize")
const Cart = require("../model/cart.model")
const Goods = require("../model/goods.model")


class CartService{
    async createOrUpdate(user_id,goods_id){
        //根据user_id与goods_id同时查找有没有记录
        let res = await Cart.findOne({
            where: {
            [Op.and]:{
                user_id,
                goods_id,
            },
        },
    })
    if(res){
        //说明已经存在一条记录，将number+1
        await res.increment("number")
        //更新实例
        return await res.reload()
    }else{
        return await Cart.create({
            //其他俩项有默认值
            user_id,
            goods_id,
        })
    }
    }
    async findCarts(pageNum,pageSize){
        const offset = (pageNum - 1) * pageSize
        const {count,rows} = await Cart.findAndCountAll({
            attributes:['id','number','selected'],
            offset:offset,
            limit:pageSize * 1,
            //include:Goods,
            // 取名字
            include: {
                model: Goods,
                attributes:['id','goods_name','goods_price','goods_img'],
                as: "goods_info",
            }
        })
        return {
            pageSize,
            pageNum,
            total:count,
            list:rows,
        }
    }
    async updateCarts(params){
        const {id,number,selected} = params
        const res = await Cart.findByPk(id)
        if(!res) return ''
        number !== undefined ? (res.number = number) : ''
        if(selected !== undefined){
            res.selected = selected
        }
        return  await res.save()

    }
    async removeCarts(ids){
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in] : ids
                }}
        })
    }
    async selectAllCarts(user_id){
        return await Cart.update(
            {selected:true},
            {
                where:{
            //user_id:user_id
            //es6语法可以简写
            user_id,
        },
        })
    }
    async unselectAllCarts(user_id){
        return await Cart.update(
            {selected:false},
            {
                where:{
            //user_id:user_id
            //es6语法可以简写
            user_id,
        },
        })
    }
}

module.exports = new CartService()