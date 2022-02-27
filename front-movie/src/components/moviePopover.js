import React, { useState, useEffect, useRef } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';


import movieService from '../services/movieservice';

export default function MoviePopover(props) {

  const { row, prop, align } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editMovie, setEditMovie] = useState({
    Name: row.Name,
    Year: row.Year,
    Review: row.Review,
    Rating: row.Rating
  })

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (prop) => (event) => {
    setEditMovie({ ...editMovie, [prop]: event.target.value });
  };

  const handleAdd = () => {
    handleClose()
    editMovie.Year = parseInt(editMovie.Year)
    movieService.editMovie(editMovie, row.Id)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'movie-popper' : undefined;

  if (prop === 'Rating') {
    return (

      < React.Fragment >
        <TableCell align={align} aria-describedby={id} onDoubleClick={handleOpen}>
          {row[prop]}
        </TableCell>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          sx={{ zIndex: 1500 }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            <Typography id="Rating" gutterBottom>
              Rating
            </Typography>
            <Slider
              required
              sx={{ marginTop: '3ch', marginBottom: '2ch' }}
              color='primary'
              aria-label="Rating"
              value={editMovie.Rating}
              onChange={handleChange('Rating')}
              valueLabelDisplay="on"
              step={1}
              min={0}
              max={10}
            />
            <DialogActions>
              <Button onClick={() => handleAdd()} variant="contained">Edit {prop}</Button>
              <Button onClick={handleClose} variant="text" color="error" >Cancel</Button>
            </DialogActions>
          </Box>
        </Popover>
      </React.Fragment >
    )
  } else {

    return (
      <React.Fragment>
        <TableCell align={align} aria-describedby={id} onDoubleClick={handleOpen}>
          {row[prop]}
        </TableCell>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          sx={{ zIndex: 1500 }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            <TextField
              autoFocus
              placeholder={prop}
              sx={{ flexGrow: 2, marginRight: '1ch' }}
              required
              margin='normal'
              value={editMovie[prop]}
              onChange={handleChange(prop)}
              id={prop}
              label={prop}
              variant="outlined" />
            <DialogActions>
              <Button onClick={() => handleAdd()} variant="contained">Edit {prop}</Button>
              <Button onClick={handleClose} variant="text" color="error" >Cancel</Button>
            </DialogActions>
          </Box>
        </Popover>
      </React.Fragment>
    );
  }
}