import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { useTranslation } from 'react-i18next';

import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(t('validEml')).required(t('emailReq')),
    hpassword: Yup.string().required(t('pwdReq')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      hpassword: '',
      remember: true,
    },

    validationSchema: LoginSchema,
    onSubmit: () => {
      axios
        .post('http://a63b8a6ee7175471684500510268d66b-571633740.me-south-1.elb.amazonaws.com:5001/user/login', values)
        .then((response) => {
          console.log(response);
          localStorage.setItem('token', response.data);
          if (response.status === 200 || response.status === 201) navigate('/dashboard/app');
        })
        .catch((error) => {
          console.log(error);
          setMsg(error.response.data.message);
          console.log(msg);
        });
    },
  });

  const { errors, touched, values, getFieldProps, handleBlur, handleSubmit } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            id="email"
            name="email"
            fullWidth
            autoComplete="username"
            value={values.lastname}
            onBlur={handleBlur}
            onChange={formik.handleChange}
            type="email"
            label={t('email')}
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
            value={values.lastname}
            onBlur={handleBlur}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.hpassword && errors.hpassword)}
            helperText={touched.hpassword && errors.hpassword}
          />{' '}
          <h4 style={{ textAlign: 'center', color: 'red' }}>{msg}</h4>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label={t('rememberMe')}
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            {t('forgotP')}
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          {t('loginn')}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
