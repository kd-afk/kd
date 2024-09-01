const fs = require('fs');
//sync
//fs.mkdirSync("kd02");
//fs.writeFileSync("bio.txt", "my name is kuldeep");
//fs.appendFileSync("bio.txt", "this is a append string");
//const rf =fs.readFileSync("bio.txt","utf8");
//console.log(rf);
//fs.renameSync("bio.txt", "mybio.txt");
//fs.rmdirSync("kd02");
//fs.unlinkSync("mybio.txt");

//async
/*fs.mkdir('kd02',(err)=>{
    });
    fs.writeFile("bio.txt","my name is kuldeep",(err)=>{});
    fs.appendFile("bio.txt"," append",(err)=>{});
    fs.readFile("bio.txt","utf-8",(err,data)=>{
        console.log(data);
        });
    fs.rename("bio.txt","mybio.txt",(err)=>{});
    f.unlink("mybio.txt",(err)=>{});
    fs.rmdir("kd02",(err)=>{});
*/


const biodata = {
    name : "kuldeep",
    dob : "04-06-2003",
    number : 9327384898
}
const obj = JSON.stringify(biodata);
fs.writeFile("bio.json",{obj},()=>{});
