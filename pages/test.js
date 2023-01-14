import { useEffect } from "react"

export default function Home() {
  const clk = () => {
    CinetPay.getCheckout({
      transaction_id: Math.floor(Math.random() * 100000000).toString(),
      amount: 100,
      currency: 'XOF',
      channels: 'ALL',
      description: 'Test de paiement demo CinetPay',
      cpm_designation: 'Test de paiement demo CinetPay',
      return_url: '',
      notify_url: '',
      alternative_currency: 'EUR',
      //VISA MASTER/CARD
      customer_surname: 'CINETPAY',
      customer_name: 'CINETPAY ENTREPRISE',
      customer_email: 'cinetpay@cinetpay.com',
      customer_phone_number: '+2250709699688',
      customer_address: '15 BP 1080 ABIDJAN 15',
      customer_city: 'ABIDJAN',
      customer_country: 'CI',
      customer_state: '',
      customer_zip_code: '00225'
    })

    CinetPay.waitResponse(function (data) {
      if (data.status == "REFUSED") {
        console.log('ok');
        return 'ok'
      } else if (data.status == "ACCEPTED") {
        console.log('no');
        return 'no'
      }
    })
  }


  return (
    <>
      <div style={{ height: '300px', paddingTop: '200px' }}>
        <button onClick={clk} >Click ici</button>
      </div>
    </>
  )
}