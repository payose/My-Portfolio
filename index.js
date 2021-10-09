import express from "express"
import path from 'path'
import nodemailer from 'nodemailer' 
import {google} from 'googleapis'
import config from './config.js'
const __dirname = path.resolve()
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({refresh_token: config.refreshToken})



const app = express()
app.use(express.static ('public'))
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.sendFile('./public/index.html', {root: __dirname})
})

/* app.post('/', (req, res) =>{
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'inipayose@yahoo.com',
      pass: '[ceasarornothing]'
    }
  })

  const mailOptions = {
    from: req.body.emal,
    to: 'inipayose@gmail.com',
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
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
}) */

app.post('/', (req, res) =>{
  console.log(req.body)
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

  const mailOptions = {
    from: req.body.email,
    to: config.user,
    subject: `${req.body.fullname} | ${req.body.email} | ${req.body.subject}`,
    text: `${req.body.fullname} | ${req.body.email} | ${req.body.message}`
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

// app.listen(PORT)
app.listen(PORT,console.log("Listening on Port 5000"))


