const compare  = require('../CreaptoPass/compare');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../DB_functionality/Clasess/User');

module.exports = (passport) =>{
    passport.use(new LocalStrategy({usernameField:'login',passwordField:'password'},async (login,password,done)=>{
        console.log(login,password);
        let person = await User.find(login);
        if(person===null){
            return done(null, false, { message: 'No user with that login' });
        }
        else{
            let res = await compare(password,person.password);
            if(res){
                return done(null, person);
            }
            else{
                return done(null, false, { message: 'Password incorrect' })
            }
        }
    }))
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => {
        return done(null, user);
    })
};
