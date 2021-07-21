const nodemailer = require("nodemailer");
const config = require('./config.json');
let transporter;
try {
     transporter = nodemailer.createTransport({
        service: 'gmail',
        host:config.host,
        //port: config.port,
        //secure: config.secure,
        // tls: {
        //     maxVersion: config.tls.maxVersion,
        //     minVersion: config.tls.minVersion,
        // },
        auth: {
            user: config.auth.user,
            pass: config.auth.pass
        }
    })
} catch (error) {
    console.error('Error in configure file, Nodemailer ',error)
}

module.exports =transporter;