const {cartFormatError} = require('../constant/err.type')

const validator = (rules) =>{
    //闭包，返回了一个函数，函数内部引用函数外部的变量
    return async (ctx,next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
            cartFormatError.result = err
            return ctx.app.emit('error',cartFormatError,ctx)
        }
        await next()
    }
}


module.exports = {
    validator,
}