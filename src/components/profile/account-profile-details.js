import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';

import { Box, MenuItem, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';

import { UserContext } from '../../App';

export default function AccountProfileDetails(props) {
  const data = useContext(UserContext);
  const [user, setUser] = useState({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    local_code: data.local_code,
    role: data.role,
  });

  console.log(user);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const editUser = () => {
    axios
      .put(`http://localhost:5003/users/${data.id}`, user)
      .then((Response) => {
        console.log(Response.data);
        setUser(Response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setUser(data);
  }, [data]);

  const LANGS = [
    {
      value: 'en-US',
      label: 'English-US',
    },
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'fr-FR',
      label: 'French',
    },
  ];

  const ROLE = [
    {
      value: 'SuperAdmin',
    },
    {
      value: 'Admin',
    },
    {
      value: 'Doctor',
    },
    {
      value: 'Expert',
    },
    {
      value: 'User',
    },
  ];

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card style={{ width: '80%', margin: 'auto', marginTop: '10px' }}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstname"
                onChange={handleChange}
                required
                value={user?.firstname || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastname"
                onChange={handleChange}
                required
                value={user?.lastname || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user?.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2.5} xs={12}>
              <Select
                labelId="demo-simple-select-label"
                id="local_code"
                name="local_code"
                value={user?.local_code || ''}
                label="Language"
                onChange={handleChange}
                style={{ width: '150px' }}
              >
                {LANGS.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item md={4} xs={12}>
              <Select
                labelId="demo-simple-select-label"
                id="role"
                name="role"
                value={user?.role || ""}
                label="Language"
                onChange={handleChange}
                style={{ width: '150px' }}
              >
                {ROLE.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={editUser}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
}
