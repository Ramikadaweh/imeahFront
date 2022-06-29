import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '../../components/Iconify';

// mock
import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import logo from '../../images/Logo.png';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {

  const {t}=useTranslation();
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <img src={logo} alt='' style={{width:150}}/>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={[
  {
    title: t("dashboard"),
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: t("user"),
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: t("doctor"),
    path: '/dashboard/doctors',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: t("hospitales"),
    path: '/dashboard/hospitals',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: t("cases"),
    path: '',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: t("messages"),
    path: '',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: t("loginn"),
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: t("register"),
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: t("notFound"),
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
]} />

     
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
