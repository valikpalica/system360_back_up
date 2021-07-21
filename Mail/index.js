const transporter = require('./configure');
const config = require('./config.json');

module.exports =  (to,password) =>{
    try {
        transporter.sendMail({
            from:config.from,
            to:to,
            subject:'Password',
            text:password,
        })
    } catch (error) {
        console.error('send Message error folder Mail file index.js',error)
    }
}