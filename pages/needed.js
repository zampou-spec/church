import styles from '../styles/modules/Needed.module.scss'
import 'react-phone-input-2/lib/material.css'

import useSWR from 'swr'
import * as Yup from 'yup'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { httpClient } from '../utils/Api'
import PhoneInput from 'react-phone-input-2'
import LoadingButton from '@mui/lab/LoadingButton'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { Tab, Box, Grid, Card, Modal, Paper, Button, Skeleton, CardMedia, TextField, Typography, CardContent, CardActions, LinearProgress, InputAdornment } from '@mui/material'

const getNeeded = async () => httpClient.get('needed').then((res) => res.data).catch(console.log)
const formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 3 });

export default function Home() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [panel, setPanel] = useState('1')

  const { data: neededs, isLoading, mutate } = useSWR('/needed', getNeeded)

  const formikMoney = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      amount: 0,
      need_id: '',
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
        .required('Ce champ est requis'),
      need_id: Yup
        .string()
        .required('Ce champ est requis'),
    }),
    onSubmit: async (values, helpers) => {
      setPanel('1')
      setOpen(false)

      CinetPay.getCheckout({
        transaction_id: Math.floor(Math.random() * 100000000).toString(),
        amount: values.amount,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Don pour l\'eglise catholique notre dame de cana',
        cpm_designation: 'Don pour l\'eglise catholique notre dame de cana',
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
          await httpClient
            .post(`needed/${values.need_id}`, { amount: values.amount })
            .then(() => {
              mutate()
              const fullname = values.first_name + ' ' + values.last_name
              router.push(`/thank-you?status=success&fullname=${fullname.toUpperCase()}`)
            })
            .catch(console.error)
        }
      })

      helpers.resetForm()
      formikMaterial.resetForm()
    }
  })

  const formikMaterial = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone: ''
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
      phone: Yup
        .string()
        .max(255)
        .required('Ce champ est requis'),
    }),
    onSubmit: async (values, helpers) => {
      await httpClient
        .post('send-mail-needed', values)
        .then(() => {
          setPanel('1')
          setOpen(false)
          helpers.resetForm()
          formikMoney.resetForm()
          const fullname = values.first_name + ' ' + values.last_name
          router.push(`/thank-you?status=success&fullname=${fullname.toUpperCase()}`)
        })
        .catch(console.error)
    }
  })

  const handleClose = () => {
    setPanel('1')
    setOpen(false)
    formikMoney.resetForm()
    formikMaterial.resetForm()
  }

  const handleOpen = (needed_id, needed_name) => {
    setOpen(true)
    formikMoney.setFieldValue('need_id', needed_id)
    formikMaterial.setFieldValue('need_id', needed_id)
    formikMaterial.setFieldValue('need_name', needed_name)
  }

  const handlePanel = (event, newValue) => {
    setPanel(newValue);
  };

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
        <section className={styles.topText}>
          <div className={styles.container}>
            <Paper elevation={3} className={styles.paper}>
              <p>
                Nous avons listé nos besoins en matériels sur cette plateforme pour permettre aux personnes de bonne volonté de nous aider. Vous pouvez selon l'objectif, decider d'offrir du matériel directement à la paroisse en prenant rendez-vous ou decider de payer une somme pour combler l'un des besoins listés ici.
              </p>
            </Paper>
          </div>
        </section>
        <section className={styles.cardContentGrid}>
          <div className={styles.container}>
            {isLoading ?
              [1, 2, 3].map((i) =>
                <Card className={styles.needCard} key={i}>
                  <CardMedia sx={{ height: 140, overflow: 'hidden' }}>
                    <Skeleton height='250px' sx={{ marginTop: '-60px' }} />
                  </CardMedia>
                  <CardContent sx={{ paddingBottom: 0 }}>
                    <Typography gutterBottom variant="h4" component="div" className={styles.title}>
                      <Skeleton />
                    </Typography>
                    <div className={styles.goalContent}>
                      <div className={styles.goal}>
                        <Skeleton />
                        <Skeleton />
                      </div>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Skeleton width={'100%'} height={'72px'} sx={{ marginBottom: '-16px', marginTop: '-3px' }} />
                  </CardActions>
                </Card>
              ) : neededs?.map((needed) =>
                <Card className={styles.needCard} key={needed.id}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={needed.image}
                    title={needed.name}
                  />
                  <CardContent sx={{ paddingBottom: 0 }}>
                    <Typography gutterBottom variant="h4" component="div" className={styles.title}>
                      {needed.name}
                    </Typography>
                    <div className={styles.goalContent}>
                      <div className={styles.goal}>
                        <div className={styles.item}>
                          <Typography gutterBottom variant="h6" component="div" className={styles.title}>
                            Atteint:
                          </Typography>
                          <Typography gutterBottom className={styles.value}>
                            {formatter.format(needed.reached)}
                          </Typography>
                        </div>
                        <LinearProgress variant="determinate" className={styles.progress} value={needed.percent} />
                        <div className={styles.item}>
                          <Typography gutterBottom variant="h6" component="div" className={styles.title}>
                            Objectif:
                          </Typography>
                          <Typography gutterBottom className={styles.value}>
                            {formatter.format(needed.goal)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" onClick={() => handleOpen(needed.id, needed.name)} size='large' fullWidth className='btn'>Contribuer</Button>
                  </CardActions>
                </Card>
              )}
          </div>
        </section>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        className='containerPaymentModal'
      >
        <Card className='paymentModal'>
          <TabContext value={panel}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handlePanel} variant='fullWidth'>
                <Tab label="CONTRIBUTION EN ESPECE" value="1" sx={{ fontFamily: 'Poppins', fontSize: '13px' }} />
                <Tab label="CONTRIBUTION EN MATERIEL" value="2" sx={{ fontFamily: 'Poppins', fontSize: '13px' }} />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: 0 }}>
              <form onSubmit={formikMoney.handleSubmit}>
                <div className='closeModal needed' onClick={handleClose}>
                  <Image src={'/close.svg'} alt='close' width={500} height={500} />
                </div>
                <CardMedia
                  sx={{ height: 200 }}
                  image='/form.jpg'
                  title='Contribution en espece'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div' className={styles.title} style={{ textAlign: 'center' }}>
                    CONTRIBUTION EN ESPECE
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
            </TabPanel>
            <TabPanel value="2" sx={{ padding: 0 }}>
              <form onSubmit={formikMaterial.handleSubmit}>
                <div className='closeModal needed' onClick={handleClose}>
                  <Image src={'/close.svg'} alt='close' width={500} height={500} />
                </div>
                <CardMedia
                  sx={{ height: 200 }}
                  image='/sliders/7.jpg'
                  title='Contribution materiel'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div' className={styles.title} style={{ textAlign: 'center' }}>
                    CONTRIBUTION EN MATERIEL
                  </Typography>

                  <Grid container spacing={2} alignItems='center' justifyContent='center' >
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Nom'
                        size='small'
                        name='first_name'
                        variant='outlined'
                        onBlur={formikMaterial.handleBlur}
                        onChange={formikMaterial.handleChange}
                        value={formikMaterial.values.first_name}
                        helperText={formikMaterial.touched.first_name && formikMaterial.errors.first_name}
                        error={Boolean(formikMaterial.touched.first_name && formikMaterial.errors.first_name)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size='small'
                        name='last_name'
                        label='Prenom(s)'
                        variant='outlined'
                        onBlur={formikMaterial.handleBlur}
                        onChange={formikMaterial.handleChange}
                        value={formikMaterial.values.last_name}
                        helperText={formikMaterial.touched.last_name && formikMaterial.errors.last_name}
                        error={Boolean(formikMaterial.touched.last_name && formikMaterial.errors.last_name)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <PhoneInput
                        inputProps={{
                          name: 'phone'
                        }}
                        specialLabel='Numéro de téléphone'
                        inputClass={styles.phoneInput}
                        inputStyle={{
                          '--box-shadow-focus': (formikMaterial.touched.phone && formikMaterial.errors.phone) ? '#d32f2f' : 'var(--primary)',
                          '--border-color-hover': (formikMaterial.touched.phone && formikMaterial.errors.phone) ? '#d32f2f' : null,
                          '--border-color-focus': (formikMaterial.touched.phone && formikMaterial.errors.phone) ? '#d32f2f' : 'var(--primary)'
                        }}
                        onBlur={formikMaterial.handleBlur}
                        value={formikMaterial.values.phone}
                        country={'ci'}
                        masks={{ ci: '.. .. .. .. ..' }}
                        onChange={(phone) => {
                          formikMaterial.setFieldValue('phone', phone)
                        }}
                      />
                      {(formikMaterial.touched.phone && formikMaterial.errors.phone) && <p className={styles.formHelpers}>{formikMaterial.touched.phone && formikMaterial.errors.phone}</p>}
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
                    loading={formikMaterial.isSubmitting}
                    loadingIndicator='Patientez...'
                  >Envoyez</LoadingButton>
                </CardActions>
              </form>
            </TabPanel>
          </TabContext>
        </Card>
      </Modal>
    </>
  )
}