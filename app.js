const nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
           callback(err); 
           throw err;
        }
        else {
            callback(null, html);
        }
    });
};

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
}));

readHTMLFile(`${__dirname}/public/index.html`, function(err, html) {
    const template = handlebars.compile(html);
    const replacements = {
         username: "John Doe"
    };
    const htmlToSend = template(replacements);
    const mailOptions = {
        from: 'nguyendangduy2210@gmail.com',
        to : 'elasticsearch22101995@gmail.com',
        subject : 'test subject',
        html : htmlToSend
     };
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            response(error);
        }
    });
});