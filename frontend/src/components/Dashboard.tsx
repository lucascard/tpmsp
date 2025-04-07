import React from 'react';
import { Container, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography>
        Bem-vindo ao seu painel de controle!
      </Typography>
    </Container>
  );
};

export default Dashboard; 