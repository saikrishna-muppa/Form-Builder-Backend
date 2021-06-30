const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
var  fs = require('fs')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors())
const port = 3001

let jsondata;

const readJson=()=>{

    fs.readFile("./db.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        const users = JSON.parse(jsonString);
        // console.log("File data:", jsonString);
        jsondata=users
        // return jsonString
    });
}
readJson()

app.get('/getForm', (req, res) => {
    readJson()
    console.log(jsondata)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(jsondata));
})

app.post('/postForm',(req, res) => {
    const json=req.body;
    
    // const json={"name":"duke"}

    console.log("frontend data",req.body)

    // const finaldata = [...jsondata,data]
    jsondata.push(json)
    let data = JSON.stringify(jsondata);
    fs.writeFileSync('db.json', data);
    console.log(jsondata)
    readJson()
    res.send(json)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})