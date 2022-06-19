import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import Navbar from './Navbar';

export default function Marginals({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#16161a',
      }}
    >
      <CssBaseline />
      <Navbar />
      {/* <Container maxWidth="lg" sx={{ my: 10, mt: 7 }}> */}
      {children}
      {/* </Container> */}

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          textAlign: 'center',
          backgroundColor: '#242629',
        }}
      >
        <Typography variant="body1" style={{ color: '#fffffe' }}>
          Made with ❤ by Team StarFox
        </Typography>
      </Box>
    </Box>
  );
}
