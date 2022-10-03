import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import { Box, MenuItem, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { UserContext } from '../../App';


export default function UserProfileDetails(props) {
  const id = useLocation().state.idd;
  console.log(id);
  const data = useContext(UserContext);
  const [oneUser, setOneUser] = useState('');

  console.log(oneUser);

  useEffect(() => {
    axios
      .get(`http://localhost:5003/users/${id}`)
      .then((Response) => {
        console.log(Response.data);
        setOneUser(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setOneUser({
      ...oneUser,
      [event.target.name]: event.target.value,
    });
  };

  const editUser = () => {
    axios
      .put(`http://localhost:5003/users/${id}`, oneUser)
      .then((Response) => {
        console.log(Response.data);
        setOneUser(Response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };


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
      value: 'Super Admin',
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
                value={oneUser?.firstname || ''}
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
                value={oneUser?.lastname || ''}
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
                value={oneUser?.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2.5} xs={12}>
              <Select
                labelId="demo-simple-select-label"
                id="local_code"
                name="local_code"
                value={oneUser?.local_code || ''}
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
                value={oneUser?.role || ''}
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
