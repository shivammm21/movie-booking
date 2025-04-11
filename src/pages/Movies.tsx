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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// Mock data - replace with API call later
export const mockMovies = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    image: 'https://th.bing.com/th/id/OIP.grGgKS0m0e6N4obGbAqwogHaK-?rs=1&pid=ImgDetMain',
    description: 'The Avengers must reunite and assemble once more to restore balance to the universe.',
    duration: '3h 1min',
    genre: 'Action, Sci-Fi, Adventure'
  },
  {
    id: 2,
    title: 'Spider-Man: No Way Home',
    image: 'https://th.bing.com/th/id/OIP.jBrDLlYMVAZBr4q1zpCHRgHaMU?rs=1&pid=ImgDetMain',
    description: 'Peter Parker seeks help from Doctor Strange to make people forget his identity as Spider-Man.',
    duration: '2h 28min',
    genre: 'Action, Adventure, Fantasy'
  },
  {
    id: 3,
    title: 'Black Panther: Wakanda Forever',
    image: 'https://th.bing.com/th/id/OIP.udstHPF8mPl8hm3gOsKkwQHaLQ?rs=1&pid=ImgDetMain',
    description: 'The nation of Wakanda fights to protect their home from intervening world powers.',
    duration: '2h 41min',
    genre: 'Action, Adventure, Drama'
  },
  {
    id: 4,
    title: 'Thor: Love and Thunder',
    image: 'https://cosmicbook.news/images/thor-love-thunder-movie-poster-5.jpg',
    description: 'Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher.',
    duration: '1h 58min',
    genre: 'Action, Adventure, Comedy'
  },
  {
    id: 5,
    title: 'Doctor Strange in the Multiverse of Madness',
    image: 'https://cdn11.bigcommerce.com/s-pfbbr25tq3/images/stencil/2000x2000/products/5154/6478/Doctor_strangeintheMultiverseofMadness__31196.1657728711.jpg?c=2',
    description: 'Doctor Strange travels into the multiverse and faces mysterious new adversaries.',
    duration: '2h 6min',
    genre: 'Action, Adventure, Fantasy'
  },
  {
    id: 6,
    title: 'Inception',
    image: 'https://th.bing.com/th/id/OIP.KvWY-Lps3p8FLMjUcFTK3wHaKz?rs=1&pid=ImgDetMain',
    description: 'A thief who steals corporate secrets through dream-sharing technology.',
    duration: '2h 28min',
    genre: 'Sci-Fi, Action'
  },
  {
    id: 7,
    title: 'The Dark Knight',
    image: 'https://www.themoviedb.org/t/p/original/eP5NL7ZlGoW9tE9qnCdHpOLH1Ke.jpg',
    description: 'Batman faces his greatest challenge as the Joker wreaks havoc on Gotham City.',
    duration: '2h 32min',
    genre: 'Action, Crime, Drama'
  },
  {
    id: 8,
    title: 'Guardians of the Galaxy Vol. 3',
    image: 'https://th.bing.com/th/id/OIP.4E32Anj4RLBR4T3KZGh9cgHaLH?rs=1&pid=ImgDetMain',
    description: 'The Guardians of the Galaxy undertake a mission to protect one of their own.',
    duration: '2h 30min',
    genre: 'Action, Adventure, Comedy'
  },
  {
    id: 9,
    title: 'Interstellar',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/297acd129204217.616629e21fe76.png',
    description: 'A team of explorers travel through a wormhole in space.',
    duration: '2h 49min',
    genre: 'Sci-Fi, Adventure'
  },
  {
    id: 10,
    title: 'The Marvels',
    image: 'https://th.bing.com/th/id/OIP.Sm6IYwE454Ek10CWDJ8F0AHaLH?rs=1&pid=ImgDetMain',
    description: 'Carol Danvers teams up with Monica Rambeau and Kamala Khan for an epic adventure.',
    duration: '1h 45min',
    genre: 'Action, Adventure, Fantasy'
  }
];

const Movies = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          mb: 4,
          fontSize: isMobile ? '2rem' : '2.5rem',
          textAlign: 'center'
        }}
      >
        Now Showing
      </Typography>
      <Grid container spacing={4}>
        {mockMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                  '& .movie-overlay': {
                    opacity: 1,
                  },
                  '& .movie-image': {
                    transform: 'scale(1.05)',
                  }
                },
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2
              }}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden', paddingTop: '150%' }}>
                <CardMedia
                  component="img"
                  image={movie.image}
                  alt={movie.title}
                  className="movie-image"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
                <Box
                  className="movie-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                >
                  <PlayCircleOutlineIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(`/booking/${movie.id}`)}
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ 
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {movie.genre}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Duration: {movie.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Movies; 