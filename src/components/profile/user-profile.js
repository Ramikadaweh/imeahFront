import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

import { useState, useEffect } from 'react';

import axios from 'axios';

import { useLocation } from 'react-router-dom';

const avatar = {
  img: '/static/images/avatars/avatar_6.png',
};

export default function UserProfile(props) {
  const [user, setUser] = useState('');
  const id = useLocation().state.idd;
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:5003/users/${id}`)
      .then((Response) => {
        console.log(Response.data);
        setUser(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card {...props} style={{ width: '40%' }}>
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
            {user.firstname} {user.lastname}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.email}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.role}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.local_code}
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
