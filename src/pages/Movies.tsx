import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock data - replace with API call later
const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    image: 'https://source.unsplash.com/random?inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology.',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    image: 'https://source.unsplash.com/random?batman',
    description: 'Batman faces his greatest challenge as the Joker wreaks havoc on Gotham City.',
  },
  {
    id: 3,
    title: 'Interstellar',
    image: 'https://source.unsplash.com/random?space',
    description: 'A team of explorers travel through a wormhole in space.',
  },
];

const Movies = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Now Showing
      </Typography>
      <Grid container spacing={4}>
        {mockMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="300"
                image={movie.image}
                alt={movie.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {movie.title}
                </Typography>
                <Typography>
                  {movie.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/booking/${movie.id}`)}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Movies; 