import nodemailer from "nodemailer"
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.PROD_MAIL_USER, // your email address
    pass: process.env.PROD_MAIL_PASS, // your password
  },
  secure: true,
  logger: true,
  debug: true,
})
const EmailService = async (emailAddress: {
  to: string
  text: string
  subject: string
  from: string
}) => {
  emailAddress.subject = "Generate new password for your email"
  emailAddress.from = "Sirikakire"

  transport.sendMail(emailAddress, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log(info)
    }
  })
}

export default EmailService
