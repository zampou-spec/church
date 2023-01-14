import '../styles/globals.scss'
import Image from 'next/image'
import { Button } from '@mui/material'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <script src="https://cinetpay.com/assets/js/sdk_seamless.js"></script>
    </Head>

    <header className='navbar'>
      <nav>
        <Image src={'/logo.png'} className='logo' width={500} height={500} />
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
            <Image src={'/prete.jpg'} width={500} height={500} />
          </div>
        </div>
      </div>
    </section>
  </>
}
