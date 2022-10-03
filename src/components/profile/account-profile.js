import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

import { useContext } from 'react';


import { UserContext } from '../../App';


const avatar = {
  img: '/static/images/avatars/avatar_6.png',
};

export default function AccountProfile(props) {

  const data = useContext(UserContext);
  return (
    <Card {...props} style={{width:"40%"}}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={avatar.img}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {data.firstname} {data.lastname}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {data.email}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {data.role}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {data.local_code}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
