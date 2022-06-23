import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Web3Provider from './context/Web3provider';

let theme = createTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <Web3Provider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Web3Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
