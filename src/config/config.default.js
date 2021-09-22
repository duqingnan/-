const dotenv = require('dotenv')

dotenv.config()

//console.log(process.env.APP_POST)   //8000

module.exports = process.env  //进程环境变量