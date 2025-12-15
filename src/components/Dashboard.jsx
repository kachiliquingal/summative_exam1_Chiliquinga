import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Paper, Typography, TextField, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Avatar, Chip, CircularProgress, 
  Alert, Stack, Pagination, Button, Box
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { fetchCharacters } from '../api/rickMortyApi';

export const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', page, search],
    queryFn: () => fetchCharacters({ page, name: search }),
  });

  const characters = data?.results || [];
  const totalPages = data?.info?.pages || 0;

  const handleLogout = () => {
    navigate('/');
  };

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
  if (isError) return <Alert severity="error">Error de conexión</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">Personajes de Rick & Morty</Typography>
          <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Salir
          </Button>
        </Stack>

        <TextField
          label="Buscar personaje..."
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mb: 3 }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <TableContainer sx={{ border: '1px solid #e0e0e0', borderRadius: 1, mb: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Especie</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters.length === 0 ? (
                <TableRow><TableCell colSpan={4} align="center">Sin resultados</TableCell></TableRow>
              ) : (
                characters.map((char) => (
                  <TableRow key={char.id} hover>
                    <TableCell>
                      <Avatar src={char.image} alt={char.name} />
                    </TableCell>
                    <TableCell>{char.name}</TableCell>
                    <TableCell>{char.species}</TableCell>
                    <TableCell>
                      <Chip 
                        label={char.status} 
                        size="small"
                        color={char.status === 'Alive' ? 'success' : char.status === 'Dead' ? 'error' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} alignItems="center">
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={(e, value) => setPage(value)} 
            color="primary" 
            showFirstButton 
            showLastButton
          />
        </Stack>
      </Paper>
    </Box>
  );
};