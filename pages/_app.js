import '../styles/globals.scss'

import 'react-phone-input-2/lib/material.css'
import styles from '../styles/modules/_App.module.scss'

import * as Yup from 'yup'
import Link from 'next/link'
import Image from 'next/image'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { httpClient } from '../utils/Api'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import LoadingButton from '@mui/lab/LoadingButton'
import { Card, Grid, Modal, Button, CardMedia, TextField, Typography, CardContent, CardActions } from '@mui/material'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
    formikContact.resetForm()
  }

  useEffect(() => {
    CinetPay.setConfig({
      site_id: 630620,
      apikey: '10651789036408d619c77ce3.80988192',
      notify_url: ''
    })
  })

  const formikContact = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone: '',
      message: ''
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
      message: Yup
        .string()
        .required('Ce champ est requis'),
    }),
    onSubmit: async (values, helpers) => {
      await httpClient
        .post('send-mail-contact', values)
        .then(() => {
          setOpen(false)
          helpers.resetForm()
          const fullname = values.first_name + ' ' + values.last_name
          router.push(`/thank-you?status=success&fullname=${fullname.toUpperCase()}`)
        })
        .catch(console.error)
    }
  })

  return <>
    <script src="https://cinetpay.com/assets/js/sdk_seamless.js"></script>

    <header className='navbar'>
      <nav>
        <Link href='/'>
          <Image src={'/logo.png'} alt='logo' className='logo' width={500} height={500} />
        </Link>
        <Button variant="contained" size='large' className='btn' onClick={() => setOpen(true)}>Contactez-nous</Button>
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

    <Modal
      open={open}
      onClose={handleClose}
      className='containerPaymentModal'
    >
      <Card className='paymentModal'>
        <Card className='paymentModal'>
          <form onSubmit={formikContact.handleSubmit}>
            <div className='closeModal' onClick={handleClose}>
              <Image src={'/close.svg'} alt='close' width={500} height={500} />
            </div>
            <CardMedia
              sx={{ height: 200 }}
              image='/sliders/7.jpg'
              title='Contactez-nous'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div' style={{ textAlign: 'center' }}>
                CONTACTEZ-NOUS
              </Typography>

              <Grid container spacing={2} alignItems='center' justifyContent='center' >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Nom'
                    size='small'
                    name='first_name'
                    variant='outlined'
                    onBlur={formikContact.handleBlur}
                    onChange={formikContact.handleChange}
                    value={formikContact.values.first_name}
                    helperText={formikContact.touched.first_name && formikContact.errors.first_name}
                    error={Boolean(formikContact.touched.first_name && formikContact.errors.first_name)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size='small'
                    name='last_name'
                    label='Prenom(s)'
                    variant='outlined'
                    onBlur={formikContact.handleBlur}
                    onChange={formikContact.handleChange}
                    value={formikContact.values.last_name}
                    helperText={formikContact.touched.last_name && formikContact.errors.last_name}
                    error={Boolean(formikContact.touched.last_name && formikContact.errors.last_name)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    inputProps={{
                      name: 'phone'
                    }}
                    inputClass={styles.phoneInput}
                    inputStyle={{
                      '--box-shadow-focus': (formikContact.touched.phone && formikContact.errors.phone) ? '#d32f2f' : 'var(--primary)',
                      '--border-color-hover': (formikContact.touched.phone && formikContact.errors.phone) ? '#d32f2f' : null,
                      '--border-color-focus': (formikContact.touched.phone && formikContact.errors.phone) ? '#d32f2f' : 'var(--primary)'
                    }}
                    onBlur={formikContact.handleBlur}
                    value={formikContact.values.phone}
                    country={'ci'}
                    masks={{ ci: '.. .. .. .. ..' }}
                    onChange={(phone) => {
                      formikContact.setFieldValue('phone', phone)
                    }}
                  />
                  {(formikContact.touched.phone && formikContact.errors.phone) && <p className={styles.formHelpers}>{formikContact.touched.phone && formikContact.errors.phone}</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    size='small'
                    name='message'
                    label='Message'
                    variant='outlined'
                    rows={4}

                    onBlur={formikContact.handleBlur}
                    onChange={formikContact.handleChange}
                    value={formikContact.values.message}
                    helperText={formikContact.touched.message && formikContact.errors.message}
                    error={Boolean(formikContact.touched.message && formikContact.errors.message)}
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
                loadingIndicator='Patientez...'
                loading={formikContact.isSubmitting}
              >Envoyez</LoadingButton>
            </CardActions>
          </form>
        </Card>
      </Card>
    </Modal>
  </>
}
