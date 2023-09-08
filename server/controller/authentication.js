exports.getLogin = (req,res,next) => {
    console.log('in the auth controller');
    res.render('auth/login',{
        path: '/login',
        pageTitle : 'Login'
    });
};