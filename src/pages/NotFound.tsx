// src/pages/NotFound.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper, useTheme, Avatar } from '@mui/material';
import { Home as HomeIcon, Search as SearchIcon } from '@mui/icons-material';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '30%',
          bgcolor: 'primary.main',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '30%',
          height: '30%',
          bgcolor: 'secondary.light',
          borderTopLeftRadius: '100%',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Container maxWidth='md' sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              范略
            </Avatar>
          </Box>

          {/* Title */}
          <Typography variant='h3' component='h1' sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
            404
          </Typography>

          <Typography variant='h5' component='h2' sx={{ mb: 1, color: 'secondary.main', fontWeight: 'medium' }}>
            Page Not Found
          </Typography>

          {/* Description */}
          <Typography variant='body1' color='text.secondary' sx={{ mb: 4, maxWidth: 450, mx: 'auto' }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable in the VenTal
            Management System.
          </Typography>

          {/* Large 404 visual */}
          <Box
            sx={{
              fontSize: '15rem',
              fontWeight: 'bold',
              color: 'rgba(0,0,0,0.03)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
              lineHeight: 1,
              display: { xs: 'none', md: 'block' },
            }}
          >
            404
          </Box>

          {/* Search icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <SearchIcon sx={{ fontSize: 64, color: 'grey.300' }} />
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant='contained' color='primary' size='large' startIcon={<HomeIcon />} onClick={handleGoHome}>
              Go to Dashboard
            </Button>
            <Button variant='outlined' color='secondary' size='large' onClick={handleGoBack}>
              Go Back
            </Button>
          </Box>

          {/* Footer */}
          <Typography variant='body2' color='text.secondary' sx={{ mt: 6 }}>
            © 2025 VenTal Management System • Powered by 范略 Technology
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;
