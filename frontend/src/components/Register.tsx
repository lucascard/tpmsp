import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      toast.error('As senhas não coincidem', {
        position: 'top-right',
        autoClose: 3000
      });
      return;
    }

    try {
      await register(name, email, password, confirmPassword);
      toast.success('Registro realizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000
      });
      navigate('/');
    } catch (error: any) {
      toast.error('Este email já está em uso', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} role="form">
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ 'data-testid': 'name' }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ 'data-testid': 'email' }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ 'data-testid': 'password' }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            inputProps={{ 'data-testid': 'confirmPassword' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-testid="register-button"
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register; 