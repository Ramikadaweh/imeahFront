import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import useResponsive from '../hooks/useResponsive';
import '../i18n';
// components
import Page from '../components/Page';
// sections
import { RegisterForm } from '../sections/auth/register';
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

export default function Register() {
  const {t} = useTranslation()

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const [cookies, setCookie] = useCookies(['i18next']);
  useEffect(() => {
   setCookie('i18next', window.navigator.language);
 }, []);


  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          {/* <Logo /> */}
          <img alt="register" src={lg} />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
             {t('login')} {''}
              <Link variant="subtitle2" component={RouterLink} to="/login">
              {t('loginn')}
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
              {t('manage')}
            </Typography>
            <img alt="register" src="https://medisensemd.fra1.digitaloceanspaces.com/Doc/3743/uzma.jpg" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              {t('getStarted')}
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>{t('free')}</Typography>

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              {t('byRegistering')}&nbsp;
              <Link underline="always" color="text.primary" href="#">
                {t('terms')}
              </Link>
              {''}and{''}
              <Link underline="always" color="text.primary" href="#">
                {t('privacy')}
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
               {t('login')}{' '}
                <Link variant="subtitle2" to="/login" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
