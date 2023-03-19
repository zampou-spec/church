import styles from '../styles/modules/ThankYou.module.scss'

import Head from 'next/head'
import Image from 'next/image'
import JSConfetti from 'js-confetti'
import { useRouter } from 'next/router'

import { loadFull } from 'tsparticles'
import { Button } from '@mui/material'
import Particles from 'react-particles'
import { useEffect, useCallback } from 'react'


export default function ThankYou() {
  const { query, back } = useRouter()

  const customInit = useCallback(async (engine) => {
    await loadFull(engine)
  })

  const color = query.status == 'success' ? ['#0aff3f', '#47ff5f', '#72ff70', '#85ffb6', '#b1fbb6', '#bef9c5'] : ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']

  const options = {
    "fullScreen": {
      "zIndex": 999999
    },
    "particles": {
      "color": {
        "value": color,
      },
      "move": {
        "direction": "bottom",
        "enable": true,
        "outModes": {
          "default": "out"
        },
        "size": true,
        "speed": {
          "min": 1,
          "max": 3
        }
      },
      "number": {
        "value": 500,
        "density": {
          "enable": true,
          "area": 800
        }
      },
      "opacity": {
        "value": 1,
        "animation": {
          "enable": false,
          "startValue": "max",
          "destroy": "min",
          "speed": 0.3,
          "sync": true
        }
      },
      "rotate": {
        "value": {
          "min": 0,
          "max": 360
        },
        "direction": "random",
        "move": true,
        "animation": {
          "enable": true,
          "speed": 60
        }
      },
      "tilt": {
        "direction": "random",
        "enable": true,
        "move": true,
        "value": {
          "min": 0,
          "max": 360
        },
        "animation": {
          "enable": true,
          "speed": 60
        }
      },
      "shape": {
        "type": [
          "circle",
          "square"
        ],
        "options": {}
      },
      "size": {
        "value": {
          "min": 5,
          "max": 10
        }
      },
      "roll": {
        "darken": {
          "enable": true,
          "value": 30
        },
        "enlighten": {
          "enable": true,
          "value": 30
        },
        "enable": true,
        "speed": {
          "min": 15,
          "max": 25
        }
      },
      "wobble": {
        "distance": 30,
        "enable": true,
        "move": true,
        "speed": {
          "min": -15,
          "max": 15
        }
      }
    }
  }

  useEffect(() => {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({ confettiColors: color })
  })

  return (
    <>
      <Head>
        <title>EGLISE CATHOLIQUE NOTE DAME DE CANA</title>
        <meta name="description" content="EGLISE CATHOLIQUE NOTE DAME DE CANA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Particles options={options} init={customInit} />

      <section className={styles.heroBanner} style={{ background: query.status == 'success' ? '#198754' : '#dc3545' }}>
        <div className={styles.content}>
          {query.status == 'success' ?
            <div className={styles.textContent}>
              <h1>Felicitation</h1>
              <h5>{query.fullname}</h5>
            </div>
            : <h1>Ooops erruer</h1>
          }
          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" size='large' className='btn' onClick={() => back()}>REVENIRE EN ARRIERE</Button>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <section className={styles.thankYou}>
          <div className={styles.container}>
            <div className={styles.textContent}>
              {query.status == 'success' ?
                <h3>L'église vous remercie pour votre don</h3>
                : <h3>Une erreur s'est produite lors du don veuillez ressayer plus tard</h3>
              }
            </div>
            <div className={styles.imageContent}>
              <Image src={query.status == 'success' ? '/success.jpg' : '/fail.jpg'} alt='slider' width={600} height={456} priority />
              <Image src={query.status == 'success' ? '/success.jpg' : '/fail.jpg'} alt='slider' width={600} height={456} priority />
              <Image src={query.status == 'success' ? '/success.jpg' : '/fail.jpg'} alt='slider' width={600} height={456} priority />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
