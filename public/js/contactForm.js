const contactForm = document.querySelector('.contact-form')

let fullname = document.getElementById('name')
let email = document.getElementById('email')
let subject = document.getElementById('subject')
let message = document.getElementById('message')

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let formData = {
    fullname: fullname.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  }
  let xhr = new XMLHttpRequest()
  xhr.open('POST', '/')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.onload = function(){
    console.log(xhr.responseText, 'response text')
    if(xhr.responseText == 'success'){
      alert('email sent')
      fullname.value=''
      email.value=''
      subject.value=''
      message.value=''
    }
    else{
      alert('opps... something went wrong')
    }
  }

  xhr.send(JSON.stringify(formData))
})