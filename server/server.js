const express=require('express');
const bodyParser=require('body-parser');

// const mongoConnect=require("../server/util/database").mongoConnect;

const app=express();

app.set('view engine','ejs');
app.set('views','views');

const authenticationRoutes=require('./routes/authentication');

app.use(bodyParser.urlencoded({extended:false}));// this function yields a middleware (req,res,next)

app.use(authenticationRoutes);


app.use("/input", (req,res,next)=>{
    res.send('<form action="/input-msg" method="POST"><input type="text" name="title"/><button type="submit">Submit</button> </form>');
    // next();
});

app.use("/", (req,res,next)=>{
    console.log(req.body);
    res.send('<h1>Hello from OJ Server!!!</h1>')
});

// mongoConnect(()=>{
    app.listen(8080);
// });
