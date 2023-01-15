import nodemailer from 'nodemailer'

export default async (req, res) => {
  if (req.method == 'POST') {
    const { first_name, last_name, phone } = req.body

    const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      // secure: false,
      service: 'gmail',
      auth: {
        user: 'zampou.elec@gmail.com',
        pass: 'ycpa aret xwty aqrn',
      }
    })

    await transporter.sendMail({
      from: 'zampou.elec@gmail.com',
      to: 'zampou.ibrahim59@gmail.com',
      subject: 'NOUVELLE DEMANDE DE CONTRIBUTION',
      text: "Hello world?",
      html: `
        <h4>NOUVELLE DEMANDE DE CONTRIBUTION</h4>
        <ul>
          <li>Nom: ${first_name}</li>
          <li>Prenom: ${last_name}</li>
          <li>Numero de telephone: ${phone}</li>
        </ul>
    `})

    return res.status(200)
  }

  return res.status(405).json({ message: 'Method not allowed' })
}