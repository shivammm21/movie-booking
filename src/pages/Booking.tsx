import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { mockMovies } from './Movies';  // Import mockMovies from Movies.tsx

interface Movie {
  id: number;
  title: string;
  image: string;
  description: string;
  duration: string;
  genre: string;
}

interface Booking {
  id: string;
  movieName: string;
  selectedSeats: string[];
  showTime: string;
  totalAmount: number;
  username: string;
}

const Booking = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showTime, setShowTime] = useState('');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    // Find the movie from mock data
    const foundMovie = mockMovies.find((m: Movie) => m.id === Number(movieId));
    setMovie(foundMovie || null);
  }, [movieId]);

  // Fetch booked seats
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bookings');
        if (response.data.success) {
          // Filter bookings for current movie and selected show time
          const movieBookings = response.data.bookings.filter(
            (booking: Booking) => booking.movieName === movie?.title
          );
          
          // Get all booked seats for this movie
          const allBookedSeats = movieBookings.reduce(
            (seats: string[], booking: Booking) => [...seats, ...booking.selectedSeats],
            []
          );
          
          setBookedSeats(allBookedSeats);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (movie) {
      fetchBookings();
    }
  }, [movie, showTime]);

  const showTimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;

  const handleSeatClick = (seat: string) => {
    if (bookedSeats.includes(seat)) return; // Prevent clicking on booked seats
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    if (!movie || !showTime || selectedSeats.length === 0) return;

    setIsBooking(true);
    try {
      const bookingData = {
        movieName: movie.title,
        selectedSeats: selectedSeats,
        showTime: showTime,
        totalAmount: selectedSeats.length * 120,
        username: "shivammm" // This should come from your auth system
      };

      const response = await axios.post('http://localhost:8080/api/book', bookingData);

      if (response.data.success) {
        setSnackbarMessage('Booking successful!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        
        // Reset form and redirect after 2 seconds
        setTimeout(() => {
          setSelectedSeats([]);
          setShowTime('');
          navigate('/'); // Redirect to home page
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      setSnackbarMessage(error instanceof Error ? error.message : 'Failed to book seats. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsBooking(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'text.primary',
        mb: 1
      }}>
        Book Your Seats
      </Typography>
      
      {movie && (
        <Typography 
          variant="h5" 
          color="primary" 
          gutterBottom 
          sx={{ 
            mb: 4,
            textAlign: 'center',
            fontWeight: 'medium',
            '& span': {
              color: 'text.primary',
              fontWeight: 'bold'
            }
          }}
        >
          Movie: <span>{movie.title}</span>
        </Typography>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Screen
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 8,
                bgcolor: 'grey.300',
                mb: 4,
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {rows.map((row) => (
                <Box
                  key={row}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'center',
                  }}
                >
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seat = `${row}${i + 1}`;
                    const isBooked = bookedSeats.includes(seat);
                    const isSelected = selectedSeats.includes(seat);
                    return (
                      <Button
                        key={seat}
                        variant={isSelected ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => handleSeatClick(seat)}
                        disabled={isBooked}
                        sx={{
                          minWidth: 40,
                          bgcolor: isBooked ? 'grey.400' : isSelected ? '#4CAF50' : 'inherit',
                          '&:hover': {
                            bgcolor: isSelected ? '#45a049' : 'inherit'
                          },
                          '&:disabled': {
                            bgcolor: 'grey.400',
                            color: 'grey.600',
                          },
                          color: isSelected ? 'white' : 'inherit',
                          borderColor: isSelected ? '#4CAF50' : 'inherit',
                        }}
                      >
                        {seat}
                      </Button>
                    );
                  })}
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: 'grey.400', borderRadius: 1 }} />
                <Typography variant="body2">Booked</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, border: 1, borderColor: 'primary.main', borderRadius: 1 }} />
                <Typography variant="body2">Available</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#4CAF50', borderRadius: 1 }} />
                <Typography variant="body2">Selected</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Booking Details
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Show Time</InputLabel>
              <Select
                value={showTime}
                label="Show Time"
                onChange={(e) => setShowTime(e.target.value)}
              >
                {showTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Selected Seats"
              value={selectedSeats.join(', ')}
              disabled
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Total Amount"
              value={`₹${selectedSeats.length * 12}0`}
              disabled
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              disabled={!showTime || selectedSeats.length === 0 || isBooking}
              onClick={handleBooking}
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&:disabled': {
                  bgcolor: 'grey.400',
                }
              }}
            >
              {isBooking ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Booking; 