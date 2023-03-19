import styles from '../styles/modules/Home.module.scss'
import 'swiper/css'

import * as Yup from 'yup'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Autoplay } from 'swiper'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import LoadingButton from '@mui/lab/LoadingButton'
import { Card, Grid, Modal, Button, CardMedia, TextField, Typography, CardContent, CardActions, InputAdornment } from '@mui/material'

export default function Home() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const formikMoney = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      amount: 0
    },
    validationSchema: Yup.object({
      first_name: Yup
        .string()
        .max(255)
        .required('Ce champ est requis'),
      last_name: Yup
        .string()
        .max(255)
        .required('Ce champ est requis'),
      amount: Yup
        .number()
        .integer()
        .min(100, 'Le montant minimum est de 100 FCFA')
        .max(1500000, 'Le montant maximum est de 1500000 FCFA')
        .required('Ce champ est requis')
    }),
    onSubmit: async (values, helpers) => {
      setOpen(false)
      helpers.resetForm()

      CinetPay.getCheckout({
        transaction_id: Math.floor(Math.random() * 100000000).toString(),
        amount: values.amount,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Test de paiement demo CinetPay',
        cpm_designation: 'Test de paiement demo CinetPay',
        return_url: '',
        notify_url: '',
        alternative_currency: 'EUR',
        // VISA MASTER/CARD
        customer_name: values.first_name,
        customer_surname: values.last_name,
        customer_email: 'cinetpay@cinetpay.com',
        customer_phone_number: '+2250709699688',
        customer_address: '15 BP 1080 ABIDJAN 15',
        customer_city: 'ABIDJAN',
        customer_country: 'CI',
        customer_state: '',
        customer_zip_code: '00225'
      })

      CinetPay.waitResponse(async (data) => {
        if (data.status == 'REFUSED') {
          router.push('/thank-you?status=fail')
        } else if (data.status == 'ACCEPTED') {
          const fullname = values.first_name + ' ' + values.last_name
          router.push(`/thank-you?status=success&fullname=${fullname.toUpperCase()}`)
        }
      })

      helpers.resetForm()
    }
  })

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Head>
        <title>EGLISE CATHOLIQUE NOTE DAME DE CANA - ACCEUIL</title>
        <meta name="description" content="EGLISE CATHOLIQUE NOTE DAME DE CANA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='hero-banner'>
        <div className='content'>
          <Button variant="contained" onClick={() => setOpen(true)} size='large' className='btn'>Faire un don</Button>
        </div>
      </section>

      <main className={styles.main}>
        <section className={styles.about}>
          <div className={styles.container}>
            <div className={styles.imageContent}>
              <Image src={'/about.jpg'} alt='about' width={500} height={500} />
            </div>
            <div className={styles.textContent}>
              <p>
                La création d’une paroisse, si elle répond à un besoin d’ordre pastoral, celui de rapprocher davantage l’église de ses fidèles, nécessite au préalable que l’on puisse avoir les infrastructures humaines et matérielles capables de permettre le bon fonctionnement de cette paroisse. C'est dans cette optique que la nouvelle paroisse Notre-Dame de Cana de Jean folly belle-ville organise sa 2e édition de La fête de Charité du 11 Mars au 16 Avril 2023. En organisant cette fête qui a pour objectif de recueillir des fonds pour la construction de la paroisse, le curé et la communauté paroissiale exhortent les fidèles et les personnes de bonne volonté à y participer à travers des dons en nature ou en espèces.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.textPresentation}>
          <p>
            Comptant sur votre détermination, cette plateforme de collecte de fonds a été mis en place pour que ce défi soit relevé.
          </p>
        </section>

        <section className={styles.donationCategories}>
          <div className={styles.container}>
            <div className={styles.item}>
              <div className={styles.content}>
                <p>
                  Contribuer à la construction de l'église par un don non fixe.
                  Donnez ce que vous pouvez, aussi petit soit-elle votre contribution
                  sera pour l'oeuvre de Dieu.
                </p>
                <Button variant="contained" onClick={() => setOpen(true)} size='large' className={styles.btn}>Faire un don</Button>
              </div>
            </div>
            <div className={styles.item}>
              <div className={`${styles.content} gg`}>
                <p>
                  Decider de combler par votre contribution un besoin en matériels de construction. Consulter notre liste de besoin fixe, offrez ou payez pour la construction de l'église.
                </p>
                <Button variant="contained" href='/needed' size='large' className={styles.btn}>Combler un besoin</Button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.worksite}>
          <div className={styles.container}>
            <h4>Notre chantier</h4>
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{ delay: 1000 }}
            modules={[Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              425: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40
              }
            }}
          >
            <SwiperSlide>
              <Image src={'/sliders/1.jpg'} alt='slider' width={500} height={500} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={'/sliders/2.jpg'} alt='slider' width={500} height={500} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={'/sliders/3.jpg'} alt='slider' width={500} height={500} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={'/sliders/4.jpg'} alt='slider' width={500} height={500} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={'/sliders/5.jpg'} alt='slider' width={500} height={500} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={'/sliders/6.jpg'} alt='slider' width={500} height={500} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={'/sliders/7.jpg'} alt='slider' width={500} height={500} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={'/sliders/8.jpg'} alt='slider' width={500} height={500} />
            </SwiperSlide>
          </Swiper>
        </section>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        className='containerPaymentModal'
      >
        <Card className='paymentModal'>
          <form onSubmit={formikMoney.handleSubmit}>
            <div className='closeModal' onClick={handleClose}>
              <Image src={'/close.svg'} alt='close' width={500} height={500} />
            </div>
            <CardMedia
              sx={{ height: 200 }}
              image='/form.jpg'
              title='Faire un don'
            />
            <CardContent>
              <Typography gutterBottom variant='h4' component='div' className={styles.title} style={{ textAlign: 'center' }}>
                FAIRE UN DON
              </Typography>

              <Grid container spacing={2} alignItems='center' justifyContent='center' >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Nom'
                    size='small'
                    name='first_name'
                    variant='outlined'
                    onBlur={formikMoney.handleBlur}
                    onChange={formikMoney.handleChange}
                    value={formikMoney.values.first_name}
                    helperText={formikMoney.touched.first_name && formikMoney.errors.first_name}
                    error={Boolean(formikMoney.touched.first_name && formikMoney.errors.first_name)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size='small'
                    name='last_name'
                    label='Prenom(s)'
                    variant='outlined'
                    onBlur={formikMoney.handleBlur}
                    onChange={formikMoney.handleChange}
                    value={formikMoney.values.last_name}
                    helperText={formikMoney.touched.last_name && formikMoney.errors.last_name}
                    error={Boolean(formikMoney.touched.last_name && formikMoney.errors.last_name)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size='small'
                    type='number'
                    name='amount'
                    label='Montant'
                    variant='outlined'
                    onBlur={formikMoney.handleBlur}
                    onChange={formikMoney.handleChange}
                    value={formikMoney.values.amount}
                    helperText={formikMoney.touched.amount && formikMoney.errors.amount}
                    error={Boolean(formikMoney.touched.amount && formikMoney.errors.amount)}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>FCFA</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                className='btn'
                variant='contained'
                loading={formikMoney.isSubmitting}
                loadingIndicator='Patientez...'
              >Payez</LoadingButton>
            </CardActions>
          </form>
        </Card>
      </Modal>
    </>
  )
}
