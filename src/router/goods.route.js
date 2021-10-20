const Router = require('koa-router')

const {upload,create,updata,remove,restore,findAll} = require('../controller/goods.controller')
const { auth,hadAdminPermission } = require('../middleware/auth.middleware')
const {validator} = require('../middleware/goods.middleware')

const router = new Router({prefix:'/goods'})

//商品图片上传接口   登录，权限，校验参数
router.post('/upload',auth,hadAdminPermission,upload)
//router.post('/upload',upload)
//发布商品接口
router.post('/',auth,hadAdminPermission,validator,create)
//修改商品接口
router.put('/:id',auth,hadAdminPermission,validator,updata)
//删除商品接口（硬删除）
//router.delete('/:id',auth,hadAdminPermission,remove)
router.post('/:id/off',auth,hadAdminPermission,remove)
router.post('/:id/on',auth,hadAdminPermission,restore)

//获取商品列表
router.get('/',findAll)
module.exports = router