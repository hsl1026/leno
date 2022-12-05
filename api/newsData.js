const express = require("express");
const app = express();
const formidable = require("formidable");

// app.use(express.json());
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200);
  //让options尝试请求快速结束
  else next();
});

//mysql连接
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1026929",
  database: "news",
});

connection.connect();

//保存数据到数据库
app.post("/newData", async (req, res) => {
  const form = formidable({ multiples: true });
  //时间
  var date = new Date();
  let time =
    date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  form.parse(req, (err, fields, files) => {
    console.log(fields.img);
    //数据插入mysql
    const insert =
      "insert into braftcontent(date,img,title,content) values(?,?,?,?)";
    connection.query(
      insert,
      [time, fields.newImg, fields.title, fields.content],
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("数据插入成功");
        }
      }
    );
    res.send("Succeed");
  });
});

//从数据库获取数据
app.get("/newsBoxData", async (req, res) => {
  connection.query(
    `SELECT braftcontent.date ,braftcontent.title ,braftcontent.Img,braftcontent.content FROM braftcontent`,
    function (error, results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

app.get("/newsTitle", async (req, res) => {
  connection.query(
    `SELECT braftcontent.title,braftcontent.id FROM braftcontent`,
    function (error, results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

app.get("/newsContent", async (req, res) => {
  connection.query(
    `SELECT braftcontent.content,braftcontent.title FROM braftcontent WHERE braftcontent.id =${req.query.id}`,
    function (error, results, fields) {
      res.send(JSON.stringify(results[0]));
    }
  );
});

//删除新闻
app.post("/deleteNew", async (req, res) => {
  connection.query(
    `DELETE FROM braftcontent WHERE braftcontent.id=${req.query.id};`,
    function (error, results, fields) {
      if (results) {
        res.send("删除成功");
      }
    }
  );
});

app.listen(3001);
console.log("Server launch Succeed");
