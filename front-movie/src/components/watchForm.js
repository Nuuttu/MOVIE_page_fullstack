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
import Paper from '@mui/material/Paper';

import React, { useState } from 'react';
import { DateRange } from '@mui/icons-material';
import movieService from '../services/movieService';

import { getAll, addViewing } from '../reducers/movieReducer';
import { useDispatch } from "react-redux"

export default function WatchForm(props) {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false)
  const [newWatch, setNewWatch] = useState({
    Date: null,
    Place: '',
    Note: '',
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewWatch(
      {
        Date: null,
        Place: '',
        Note: '',
      }
    )
  };

  const handleChange = (prop) => (event) => {
    setNewWatch({ ...newWatch, [prop]: event.target.value });
  };

  const handleDateChange = (newDate) => {
    setNewWatch({ ...newWatch, Date: newDate })
  }

  const handleDateSwitchChange = (event) => {
    setChecked(event.target.checked);
    setNewWatch({ ...newWatch, Date: null })
  }

  const handleAdd = (id) => {
    setOpen(false);
    console.log('newWatch', newWatch)
    dispatch(addViewing(newWatch, props.movie))
    setNewWatch(
      {
        Date: null,
        Place: '',
        Note: '',
      }
    )
    //dispatch(getAll())
  }

  /* 
    const addViewing = async () => {
      const rViewing = await movieService.addViewing(newWatch, props.movie.Id)
      console.log('Viewing added ', rViewing)
    } */

  return (
    <div>
      <IconButton color="inherit" onClick={() => handleClickOpen()}><AddCircleOutlineIcon sx={{ fontSize: 20 }} /></IconButton>

      <Dialog open={open} onClose={handleClose} >
        <Paper sx={{ maxWidth: '90vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <DialogTitle sx={{ justifySelf: 'start' }}>New Watch</DialogTitle>
          <DialogContent>
            <Box sx={{ width: '60ch', maxWidth: '60vw', paddingTop: '1ch' }}>
              <Box sx={{
                display: 'flex', flexWrap: 'wrap'
              }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    disabled={checked}
                    label="Date of the Watch"
                    inputFormat="dd/MM/yyyy"
                    value={newWatch.Date}
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
                value={newWatch.Place}
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
                value={newWatch.Note}
                onChange={handleChange('Note')}
                id="Note"
                label="Note"
                variant="outlined" />
            </Box>
          </DialogContent>
          <DialogActions sx={{ alignSelf: 'end' }}>
            <Button onClick={() => handleAdd()} variant="contained">Add Viewing</Button>
            <Button onClick={handleClose} variant="text" color="error" >Cancel</Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  )
}