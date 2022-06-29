import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../components/Iconify';

export default function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      hpassword: '',
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required(t('fstnmReq')),
      lastname: Yup.string().required(t('lstnmReq')),
      email: Yup.string().email(t('validEml')).required(t('emailReq')),
      hpassword: Yup.string().required(t('pwdReq')),
    }),
    onSubmit: (values) => {
      values.locale_code = window.navigator.language;
      axios
        .post('http://a63b8a6ee7175471684500510268d66b-571633740.me-south-1.elb.amazonaws.com:5001/user/signup', values)
        .then((response) => {
          console.log(response);
          if (response.status === 200 || response.status === 201) navigate('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const { errors, touched, values, handleBlur, handleSubmit } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="firstname"
              name="firstname"
              fullWidth
              label={t('firstname')}
              value={values.firstname}
              onBlur={handleBlur}
              onChange={formik.handleChange}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={touched.firstname && errors.firstname}
            />
            <TextField
              id="lastname"
              name="lastname"
              fullWidth
              label={t('lastname')}
              value={values.lastname}
              onBlur={handleBlur}
              onChange={formik.handleChange}
              error={Boolean(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
            />
          </Stack>
          <TextField
            id="email"
            name="email"
            fullWidth
            autoComplete="username"
            type="email"
            label={t('email')}
            value={values.email}
            onBlur={handleBlur}
            onChange={formik.handleChange}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            id="hpassword"
            name="hpassword"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label={t('password')}
            value={values.hpassword}
            onBlur={handleBlur}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.hpassword && errors.hpassword)}
            helperText={touched.hpassword && errors.hpassword}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            {t('register')}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
