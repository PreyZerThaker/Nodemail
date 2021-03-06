// Requiring the packages and modules
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// Creating the app
const app = express();
// Getting everything ready
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// In case of any errors
app.get("/error", function(req, res) {
  res.send("<h1>That's an error.</h1>");
});
// Render the Home Page
app.get("/", function(req, res){
  res.render("email");
});
// Handling the post request from the home route
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
      //Sending the mail
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.redirect("/error");
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
});
//Listening on Port 3000
app.listen(3000, function() {
  console.log("Server is listening on port 3000.")
});
