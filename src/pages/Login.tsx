import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'primary.light',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Container maxWidth='sm' sx={{ zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box
            sx={{
              height: 64,
              width: 64,
              bgcolor: 'primary.dark',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            范略
          </Box>
        </Box>

        <Typography variant='h4' align='center' sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>
          VenTal Management System
        </Typography>

        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
          }}
        >
          <Typography variant='h6' sx={{ color: 'primary.main', mb: 3 }}>
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              label='Email address'
              fullWidth
              margin='normal'
              variant='outlined'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='admin@ventalms.com'
              required
            />

            <TextField
              label='Password'
              type='password'
              fullWidth
              margin='normal'
              variant='outlined'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
              <FormControlLabel control={<Checkbox color='primary' />} label='Remember me' />

              <Link href='#' variant='body2' color='primary'>
                Forgot your password?
              </Link>
            </Box>

            <Button type='submit' fullWidth variant='contained' color='primary' size='large' disabled={isLoading} sx={{ py: 1.5 }}>
              {isLoading ? <CircularProgress size={24} color='inherit' /> : 'Sign in'}
            </Button>
          </form>

          {/* <Box sx={{ position: 'relative', my: 4 }}>
            <Divider />
            <Typography
              variant='body2'
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                px: 2,
                color: 'text.secondary',
              }}
            >
              Choose role
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button fullWidth variant='outlined' color='inherit'>
                Admin
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth variant='outlined' color='inherit'>
                Mentor
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth variant='outlined' color='inherit'>
                Startup
              </Button>
            </Grid>
          </Grid> */}
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant='body2' color='primary.contrastText'>
            © 2025 VenTal Management System • All rights reserved
          </Typography>
          <Typography variant='body2' color='primary.contrastText' sx={{ mt: 1 }}>
            Powered by 范略 Technology
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
