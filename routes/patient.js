const express=require('express');
const app=express();
const mysql=require('mysql');
const flash=require('connect-flash');
const bodyParser=require('body-parser');
app.use(flash());
app.use(express.static(__dirname+'/views'));
app.set('view engine','hbs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'shradha-khapra',
    password : 'shradha@123',
    database : 'healthcare'
});


app.post('/login',function(req,res){
    var x=true;
    connection.query('select * from pdata',function(err,result){
    if(err) {
        console.log('SOMETHING WENT WRONG!!');
        res.redirect('/patients');
    }
      for(var i=0;i<result.length;i++)
        if(result[i].userId==req.body.username && result[i].password==req.body.password)
        {
            x=false;
                res.render('patient', {
            data:result[i],
        });

      }
      if(x) {
          console.log("USER doesn't exist in system!!");
          res.redirect('/patients');
      }

    });

});

app.post('/register',function(req,res){
    var x=req.body;
    connection.query('insert into pdata(first,last,sex,blood,aadhar,password) values("'+x.first+'","'+
        x.last+'","'+x.sex+'","'+x.blood+'",'+x.aadhar+',"'+x.password+'");',function(err,result){
        if(err)
        {   console.log(err);
            res.redirect('/patients'); }
        else
            connection.query('select * from pdata where aadhar='+x.aadhar+';',function(err,result){
                res.render('patient', {
                    data: result[0]
                });
            });


    });

});

app.get('/logout',function(req,res){
    res.redirect('/patients');
});
app.post('/manage',function(req,res){
    var x=req.body;
    if(x.add)
    {connection.query('update pdata set address="'+x.add+'" where userId='+x.userId+';',
    function(err,result){
       if(err)
       { console.log('ERROR');}
    });}
    if(x.ill)
    {connection.query('update pdata set ill="'+x.ill+'" where userId='+x.userId+';',
        function(err,result){
            if(err)
            { console.log('ERROR');}
        });}
    if(x.allergy)
    {connection.query('update pdata set allergy="'+x.allergy+'" where userId='+x.userId+';',
        function(err,result){
            if(err)
            { console.log('ERROR');}
        });}
    if(x.phone)
    {connection.query('update pdata set phone='+x.phone+' where userId='+x.userId+';',
        function(err,result){
            if(err)
            { console.log('ERROR');}
        });}
        connection.query('select * from pdata where userId='+req.body.userId+';',function(err,result){
                        res.render('patient',{
                            data:result[0]
                        })
                })
});

app.post('/delete',function(req,res){
    connection.query('delete from pdata where userId='+req.body.userId+';',function(err,result){
        if(err)
            console.log(err);
        res.redirect('/patients');
    })
});

module.exports=app;