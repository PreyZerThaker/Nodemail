const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.render("email");
});

app.post("/", function(req, res) {
    var transporter = nodemailer.createTransport({
        service: req.body.provider,
        auth: {
          user: req.body.email,
          pass: req.body.password,
        }
      });
      
      var mailOptions = {
        from: req.body.email,
        to: req.body.friendEmail,
        subject: req.body.subject,
        text: req.body.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000.")
});