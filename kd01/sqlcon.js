const mysql2 = require('mysql2');
const con = mysql2.createConnection(
    {
        host : 'localhost',
        user :'root',
        password: '1234',
        database: 'kuldeep'
    }
);
con.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected");
    }
})
con.query("select * from users",(err,result)=>{
    console.log(result);
})