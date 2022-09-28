//will need to run yarn add express cors twilio
//sudo npm install -g --force nodemon
const express = require("express");
const serverless = require("serverless-http")
const cors = require("cors");
const twilio = require("twilio");

// Twilio:

const accountSid = 'AC714d61ea681c2b5b001e0e6855fa0afc';
const authToken = 'YourAuthToken';
const client = new twilio(accountSid, authToken);
let PORT = process.env.PORT || 4000
console.log("Here")
app = express()

app.set("view engine",'ejs')

// Server welcome page

app.get('/',(req, res) => {
    res.send("Welcome to the server")
})
app.get('/api',(req, res) => {
    res.send("Welcome to the test page")
})
app.get('/send-text',(req, res) =>{
    // get variables passed in query string
    const {recipient, textMessage} = req.query

    //send text
    client.messages.create({
        body: textMessage,
        to: recipient,
        from: '+13393297021' //twilio number
    }).then((message) => console.log(message.body))


})

app.listen(PORT, () => console.log("Running on port 4000"));

