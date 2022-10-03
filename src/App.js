// routes
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import i18next from 'i18next';

import Router from './routes';
// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

export const UserContext = createContext();

// ----------------------------------------------------------------------

export default function App() {
  const [data, setData] = useState('');
  const [oneUer, setOneUser] = useState('');

  useEffect(() => {
    axios.defaults.headers.common[['Authorization']] = `Bearer ${localStorage.getItem('token')}`;
    async function func1() {
      axios
        .get('http://localhost:5003/users/me')
        .then((response) => {
          setOneUser(response.data);
        })
        .catch((err) => console.log(err));
    }
    func1();
  }, []);


  useEffect(() => {
    async function func2() {
      axios
        .get(`http://localhost:5003/users/${oneUer.sub}`)
        .then((response) => {
          console.log(response);
          setData(response.data);
        })
        .catch((err) => console.log(err));
    }
    if (oneUer) {
      func2();
    }
  }, [oneUer]);

  useEffect(() => {
    i18next.changeLanguage(data.local_code);
  }, [data]);

  return (
    <ThemeProvider>
      <UserContext.Provider value={data}>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </UserContext.Provider>
    </ThemeProvider>
  );
}
