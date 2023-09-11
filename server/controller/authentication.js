exports.getLogin = (req,res,next) => {
    console.log('in the auth controller');
    // res.set('Access-Control-Allow-Origin','*');
    // res.render('/login',{
    //     path: '/login',
    //     pageTitle : 'Login'
    // });

    res.send('you have successfully logged in')
    // res.json({"message" : "logged in"})
    console.log("after send command")
    // res.end();
    // next();
};