//1.导入sequelize的连接
const {DataTypes} = require ('sequelize')
const seq = require('../db/seq')
const Goods = require("./goods.model")
//2.定义cart模型
const Cart = seq.define('dqn_carts',{
    goods_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:"商品id"
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:"用户id"
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
        comment:"商品数量"
    },
    selected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
        comment:"是否被选中"
    },
    })
//3.同步数据
    //Cart.sync({force:true})   belongsTo()反之hasOne()
    Cart.belongsTo(Goods,{
        //关联
        foreignKey : "goods_id",
        //改名字
        as: 'goods_info',
    })
//4.导出cart模型

module.exports = Cart


