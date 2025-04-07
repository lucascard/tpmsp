import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      toast.error('As senhas não coincidem', {
        position: 'top-right',
        autoClose: 3000
      });
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Registro realizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000
      });
      navigate('/');
    } catch (err: any) {
      if (err.response?.data?.message === 'Email already exists') {
        setError('Este email já está em uso');
        toast.error('Este email já está em uso', {
          position: 'top-right',
          autoClose: 3000
        });
      } else {
        setError('Erro ao criar conta. Tente novamente.');
        toast.error('Erro ao criar conta. Tente novamente.', {
          position: 'top-right',
          autoClose: 3000
        });
      }
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
          Criar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} role="form">
          {error && <Alert severity="error" data-testid="error-message">{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            data-testid="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email"
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
            value={formData.password}
            onChange={handleChange}
            data-testid="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            data-testid="confirmPassword"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            data-testid="register-button"
          >
            Criar Conta
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm; 