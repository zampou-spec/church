const cinetpay = require("cinetpay-nodejs")

export default function handler(req, res) {

  const cp = new cinetpay('12912847765bc0db748fdd44.40081707', 445160, '')

  cp.pay(100, '12200', 'CFA', 'JEAN ANNE', '')
    .then(response => console.log(response))
    .catch(err => console.log(err))
  
  res.status(200).json({ name: 'John Doe' })
}
