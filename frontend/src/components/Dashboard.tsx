import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Planos de Teste
            </Typography>
            <Typography variant="h3" component="div">
              0
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Total de planos criados
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Suítes de Teste
            </Typography>
            <Typography variant="h3" component="div">
              0
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Total de suítes criadas
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Casos de Teste
            </Typography>
            <Typography variant="h3" component="div">
              0
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Total de casos criados
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
};

export default Dashboard; 