var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();
var fs = require('fs');
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });

 var upload = multer({
     storage: Storage
 }).array("image", 3);

 app.get("/", function(req, res) {
     res.sendFile(__dirname + "/index.html");
 });
 app.post("/api/Upload", function(req, res) {
   console.log(req.body.name);
    var b64image = req.body.image;
    //console.log(b64image);
    var name = req.body.name;

    fs.writeFile("./Images/"+name +".jpg", b64image, {encoding: 'base64'}, function(err) {
        console.log('File created'+ name);
    });
    //console.log(b64image);
     /*upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         console.log(req);
         return res.json({"response":"Sucessfully uploaded."});
     });*/
     res.json({"response":"Result: 10%"});
 });

 app.listen(3000, function(a) {
      console.log("Listening to port 3000");
  });
