import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';


import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';
import lg from '../images/Logo.png'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {

  const {t} = useTranslation()

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const [cookies, setCookie] = useCookies(['i18next']);
  useEffect(() => {
   setCookie('i18next', window.navigator.language);
 }, []);

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
        <img alt="register" src={lg} />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              {t('noAccount')} {''}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                {t('getStartedd')}
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              {t('welcomeBack')}
            </Typography>
            <img src="https://media.istockphoto.com/photos/modern-hospital-building-picture-id1312706413?k=20&m=1312706413&s=170667a&w=0&h=NpGueAN1ZlNEIc2OEBcs7V-nOP2s8veEqy29HPSYeEQ=" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              {t('signIn')}
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>{t('enterDetail')}</Typography>

            <AuthSocial />

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                {t('noAccount')}{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  {t('getStartedd')}
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
