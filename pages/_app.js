import '../styles/globals.scss'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { useEffect } from 'react'
import { Button } from '@mui/material'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    CinetPay.setConfig({
      apikey: '12912847765bc0db748fdd44.40081707',
      site_id: 445160,
      notify_url: ''
    })
  })

  return <>
    <script src="https://cinetpay.com/assets/js/sdk_seamless.js"></script>

    <header className='navbar'>
      <nav>
        <Link href='/'>
          <Image src={'/logo.png'} alt='logo' className='logo' width={500} height={500} />
        </Link>
        <Button variant="contained" size='large' className='btn'>Contactez-nous</Button>
      </nav>
    </header>

    <Component {...pageProps} />

    <section className='citation'>
      <div className='top'>
        <div className='container'>
          <h3>Ensemble, Construisons Notre Paroisse</h3>
        </div>
      </div>
      <div className='content'>
        <div className='container'>
          <div className='text-content'>
            <h4>
              “Paroissiens, paroissiennes, notre Église a besoin de votre dynamisme et de votre abnégation
              pour la construction de notre belle paroisse Notre Dame de CANA de Belle-ville”
            </h4>
            <h5>Emmanuel Bayala</h5>
            <h6>Père Curé</h6>
          </div>
          <div className='image-content'>
            <Image src={'/prete.jpg'} alt='prete' width={500} height={500} />
          </div>
        </div>
      </div>
    </section>
  </>
}
