import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TopBar from './TopBar';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <Container sx={{ mt: 4, flex: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography>
          Bem-vindo ao seu painel de controle!
        </Typography>
      </Container>
    </Box>
  );
};

export default Dashboard; 