import styles from '../styles/modules/ThankYou.module.scss'

import Head from 'next/head'
import {
  Tab,
  Box,
  Grid,
  Card,
  Modal,
  Paper,
  Button,
  CardMedia,
  TextField,
  Typography,
  CardContent,
  CardActions,
  LinearProgress,
  InputAdornment,
} from '@mui/material'

export default function Home() {
  return (
    <>
      <Head>
        <title>EGLISE CATHOLIQUE NOTE DAME DE CANA</title>
        <meta name="description" content="EGLISE CATHOLIQUE NOTE DAME DE CANA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.heroBanner}>
        <div className={styles.content}>
          <h1>Nos besoins</h1>
        </div>
      </section>

      <main className={styles.main}>
        <h1>OKKK</h1>
      </main>
    </>
  )
}
