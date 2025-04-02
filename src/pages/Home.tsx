import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PaymentIcon from '@mui/icons-material/Payment';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const bookingSteps = [
    {
      title: "Choose Your Movie",
      description: "Browse our selection of latest movies and pick your favorite one.",
      icon: <MovieIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: "Select Seats",
      description: "Pick your preferred seats from our interactive seating layout.",
      icon: <EventSeatIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: "Book Tickets",
      description: "Select your show time and number of seats you want to book.",
      icon: <ConfirmationNumberIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: "Make Payment",
      description: "Securely pay for your tickets and receive instant confirmation.",
      icon: <PaymentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: isMobile ? 4 : 8,
          pb: isMobile ? 3 : 6,
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
            sx={{ fontSize: isMobile ? '2.5rem' : '3.75rem' }}
          >
            Book Your Movies
          </Typography>
          <Typography 
            variant="h5" 
            color="white" 
            paragraph
            sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}
          >
            Experience the magic of cinema with our easy-to-use booking platform.
            Browse the latest movies and secure your seats today!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/movies')}
            sx={{ mt: 2 }}
          >
            Browse Movies
          </Button>
        </Container>
      </Box>

      {/* Booking Steps Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 6, fontSize: isMobile ? '2rem' : '3rem' }}
        >
          How to Book
        </Typography>

        <Grid container spacing={4}>
          {bookingSteps.map((step, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Paper 
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}
              >
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  {step.icon}
                </Box>
                <Typography variant="h5" component="h3" align="center" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary">
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/movies')}
            sx={{ px: 4, py: 1.5 }}
          >
            Start Booking Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 