const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:false}));// this function yields a middleware (req,res,next)

app.use("/input", (req,res,next)=>{
    res.send('<form action="/input-msg" method="POST"><input type="text" name="title"/><button type="submit">Submit</button> </form>');
    // next();
});

app.use("/", (req,res,next)=>{
    console.log(req.body);
    res.send('<h1>Hello from OJ Server!!!</h1>')
});


app.listen(8080);