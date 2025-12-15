import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Stack, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>Iniciar Sesión</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="Usuario"
              fullWidth
              {...register('username', { required: true })}
              error={!!errors.username}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              {...register('password', { required: true })}
              error={!!errors.password}
            />
            <Button type="submit" variant="contained" fullWidth size="large" startIcon={<LoginIcon />}>
              Acceder
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};