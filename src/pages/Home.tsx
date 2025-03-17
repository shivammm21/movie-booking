import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://source.unsplash.com/random?movie)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            color="white"
            gutterBottom
          >
            Book Your Movies
          </Typography>
          <Typography variant="h5" color="white" paragraph>
            Experience the magic of cinema with our easy-to-use booking platform.
            Browse the latest movies and secure your seats today!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/movies')}
          >
            Browse Movies
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 