
let generator = require('generate-password');

let password = generator.generate({
        length:16,
        numbers:true
});

module.exports = password;