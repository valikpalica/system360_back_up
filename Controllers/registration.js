const user = require('../DB_functionality/Clasess/User');
module.exports = (req,res) =>{
   try {
    console.log(req.body);
    user.registration(req.body).then((data)=>{
        console.log(data);
        res.redirect('/auth/autorization')
        console.log('registration');
    }).catch(()=>{
        console.log('not registration');
        res.status(400).json({answer:'no registration'});
    })
   } catch (error) {
       console.log('file registration controller ->',error)
   }
}