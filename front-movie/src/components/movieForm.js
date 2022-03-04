import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import React, { useState } from 'react';
import { DateRange } from '@mui/icons-material';

import { addMovie, getAll } from '../reducers/movieReducer';
import { useDispatch } from "react-redux"


const MovieForm = (props) => {


  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false)
  const [newMovie, setNewMovie] = useState({
    Name: '',
    Year: '',
    Review: '',
    Rating: 0,
    Date: null,
    Place: '',
    Note: '',
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmpty = () => {
    setNewMovie(
      {
        Name: '',
        Year: '',
        Review: '',
        Rating: 0,
        Date: null,
        Place: '',
        Note: '',
      }
    )
  }



  const handleChange = (prop) => (event) => {
    setNewMovie({ ...newMovie, [prop]: event.target.value });
  };

  const handleDateChange = (newDate) => {
    setNewMovie({ ...newMovie, Date: newDate })
  }

  const handleDateSwitchChange = (event) => {
    setChecked(event.target.checked);
    setNewMovie({ ...newMovie, Date: null })
  }

  const handleYearChange = (e) => {
    setNewMovie({ ...newMovie, Year: parseInt(e.target.value) })
  }


  const handleAdd = () => {
    setOpen(false);
    console.log('newmovie', newMovie)
    dispatch(addMovie(newMovie))

    // props.addMovie(newMovie)
    setNewMovie(
      {
        Name: '',
        Year: '',
        Review: '',
        Rating: 0,
        Date: null,
        Place: '',
        Note: '',
      }
    )
  }

  return (
    <div>
      <IconButton color="inherit" onClick={() => handleClickOpen()}><AddCircleOutlineIcon sx={{ fontSize: 50 }} /></IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Movie</DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{
              width: '60ch',
              maxWidth: '75vw',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'start',
              alignItems: 'center'
            }}>
              <Box sx={{
                display: 'flex', flexWrap: 'wrap', flexBasis: '100%',
              }}>
                <TextField
                  autoFocus
                  sx={{ flexGrow: 2, marginRight: '1ch' }}
                  required
                  margin='normal'
                  value={newMovie.Name}
                  onChange={handleChange('Name')}
                  id="name"
                  label="Name"
                  variant="outlined" />
                <TextField
                  sx={{ flexGrow: 1 }}
                  type='number'
                  margin='normal'
                  value={newMovie.Year}
                  onChange={handleYearChange}
                  id="Year"
                  label="Year"
                  variant="outlined" />
              </Box>
              <TextField
                fullWidth
                multiline
                maxRows={16}
                type='text'
                margin='normal'
                value={newMovie.Review}
                onChange={handleChange('Review')}
                id="Review"
                label="Review"
                variant="outlined" />
              <Box sx={{
                marginBottom: '2ch',
                maxWidth: '80vw',
                minWidth: '20px',
                flexShrink: 0,
                flex: '0 0 100%',
                flexBasis: '100%'
              }}>
                <Typography id="Rating" gutterBottom>
                  Rating
                </Typography>
                <Box
                >
                  <Slider
                    required
                    sx={{
                      marginTop: '3ch',
                      width: '90%'
                    }}
                    color='primary'
                    aria-label="Rating"
                    // defaultValue={3}
                    value={newMovie.Rating}
                    onChange={handleChange('Rating')}
                    valueLabelDisplay="on"
                    step={1}
                    //marks
                    min={0}
                    max={10}

                  />
                </Box>
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    disabled={checked}
                    label="Date of the Watch"
                    inputFormat="dd/MM/yyyy"
                    value={newMovie.Date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <FormControlLabel
                  control={<Switch checked={checked} onChange={handleDateSwitchChange} />}
                  label="Can't Remember"
                  labelPlacement="start" />
              </Box>
              <TextField
                fullWidth
                margin='normal'
                value={newMovie.Place}
                onChange={handleChange('Place')}
                id="Place"
                label="Place"
                variant="outlined" />
              <TextField
                fullWidth
                multiline
                maxRows={6}
                type='text'
                margin='normal'
                value={newMovie.Note}
                onChange={handleChange('Note')}
                id="Note"
                label="Note"
                variant="outlined" />
            </Box>
            <Stack spacing={2} direction="row">

            </Stack>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAdd()} variant="contained">Add Movie</Button>
          <Button onClick={handleEmpty} variant="text" color="error" size="small">Empty</Button>
          <Button onClick={handleClose} variant="text" color="error" >Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MovieForm