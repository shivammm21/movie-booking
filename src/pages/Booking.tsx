import React, { useState } from 'react';
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
} from '@mui/material';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { movieId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showTime, setShowTime] = useState('');

  const showTimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;

  const handleSeatClick = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = () => {
    // TODO: Implement booking logic
    console.log('Booking:', {
      movieId,
      seats: selectedSeats,
      showTime,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book Your Seats
      </Typography>

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
                    return (
                      <Button
                        key={seat}
                        variant={selectedSeats.includes(seat) ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => handleSeatClick(seat)}
                        sx={{ minWidth: 40 }}
                      >
                        {seat}
                      </Button>
                    );
                  })}
                </Box>
              ))}
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
              value={`$${selectedSeats.length * 12}`}
              disabled
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              disabled={!showTime || selectedSeats.length === 0}
              onClick={handleBooking}
            >
              Confirm Booking
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Booking; 