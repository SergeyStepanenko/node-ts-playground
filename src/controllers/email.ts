import { Request, Response } from 'express'
import * as nodemailer from 'nodemailer'

import { emailPass } from '../../pass'

interface EmailRequest extends Request {
  body: {
    name: string
    phoneNumber: string
  }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'groverfmx@gmail.com',
    pass: emailPass
  }
})

export function sendEmail(req: EmailRequest, res: Response, next: any) {
  const {
    body: { name, phoneNumber }
  } = req

  const mailOptions = {
    to: 'grover2006@yandex.ru',
    subject: 'Заказ тест',
    html: `
      <p>Имя: ${name}</p>
      <p>Телефон: <a href='tel:${phoneNumber}'>${phoneNumber}</a></p>
    `
  }

  if (!phoneNumber) {
    res.status(500).json({
      error: 'Не указан номер телефона'
    })

    return
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json(err)

      return
    }

    res.json(info)
  })
}
