import express from "express"
import path from 'path'
import nodemailer from 'nodemailer' 
import {google} from 'googleapis'
import config from './config.js'
const __dirname = path.resolve()
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({refresh_token: config.refreshToken})


const link="https://piusiniobong.herokuapp.com"
const app = express()
app.use(express.static ('public'))
app.use(express.json())

const PORT = process.env.PORT || 3000
const accessToken = OAuth2_client.getAccessToken()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: config.user,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: config.refreshToken,
    accessToken: accessToken
  }
})

app.get('/', (req, res) => {
  res.sendFile('./public/index.html', {root: __dirname})
})

app.post('/', (req, res) =>{
  console.log(req.body)
  const mailOptions = {
    from: req.body.email,
    to: config.user,
    subject: `${req.body.fullname} | ${req.body.email} | ${req.body.subject}`,
    text: `${req.body.fullname} | ${req.body.email} | ${req.body.message}`,
    // html : "Hello,<br> You received this email because you filled out the contact form on my portfolio site <a href="+link+">my portfolio site</a>.<br>This is an automated message, but I will get back to you soonest.<br>Enjoy the rest of your day!"	
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      console.log(error)
      res.send('error')
    }
    else{
      console.log('email sent: ' + info.response)
      res.send('success')
    }
  })

})

app.get('/send',function(req,res){
	const mailOptions={
		to : req.query.to,
		subject : "THANKS FOR CONTACTING INIOBONG PIUS",
		html : "Hello,<br><br> You received this email because you filled out the contact form on my portfolio site <a href="+link+">my portfolio site</a>.<br>This is an automated message, but I will get back to you soonest.<br>Enjoy the rest of your day!"	
	}
	console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error, response){
   	if(error){
      console.log("error message :" + error);
		  res.end("error");
	  }else{
      console.log("Message sent: " + response.response);
		  res.end("sent");
    }
});
});

app.listen(PORT)


