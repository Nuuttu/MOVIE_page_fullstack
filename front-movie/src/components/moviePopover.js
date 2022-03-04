import React, { useState, useEffect, useRef } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { editMovie, getAll } from '../reducers/movieReducer';
import { useDispatch, useSelector } from "react-redux"

const MoviePopover = (props) => {

  const dispatch = useDispatch()

  const { row, prop, align, twidth } = props;

  //const editingMovies = useSelector(state => state.movies)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editingMovie, setEditingMovie] = useState({
    Name: row.Name,
    Year: row.Year,
    Review: row.Review,
    Rating: row.Rating
  })

  const handleOpen = (event) => {
    setEditingMovie({
      Name: row.Name,
      Year: row.Year,
      Review: row.Review,
      Rating: row.Rating
    })
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (prop) => (event) => {
    setEditingMovie({ ...editingMovie, [prop]: event.target.value });
  };

  const handleAdd = () => {
    handleClose()
    editingMovie.Year = parseInt(editingMovie.Year)
    dispatch(editMovie(editingMovie, row.Id))
    setEditingMovie({
      Name: row.Name,
      Year: row.Year,
      Review: row.Review,
      Rating: row.Rating
    })
    //dispatch(getAll())
    //movieService.editMovie(editMovie, row.Id)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'movie-popper' : undefined;


  return (
    <React.Fragment>
      {prop === 'Review' ?
        <Typography
          paragraph
          onDoubleClick={handleOpen}
          variant='body2'
          gutterBottom
          component="div"
          sx={{ whiteSpace: 'pre-line', width: '88ch', maxWidth: '85vw', padding: '10px', wordWrap: 'break-word' }}>
          {row.Review}
        </Typography>
        :
        <TableCell sx={{ /* width: twidth, */ padding: '10px' }} align={align} aria-describedby={id} onDoubleClick={handleOpen}>
          {row[prop]}
        </TableCell>
      }

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
        {/* <PropSwitch p={prop} /> */}
        {prop === 'Name' &&
          <Box sx={{ p: 1, bgcolor: 'background.paper', maxWidth: '95vw' }}>
            <TextField
              autoFocus
              placeholder={prop}
              sx={{ flexGrow: 2, marginRight: '1ch', width: '400px', maxWidth: '80vw' }}
              required
              margin='normal'
              value={editingMovie[prop]}
              onChange={handleChange(prop)}
              id={prop}
              label={prop}
              variant="outlined" />

            <DialogActions>
              <Button onClick={() => handleAdd()} variant="contained">Edit {prop}</Button>
              <Button onClick={handleClose} variant="text" color="error" >Cancel</Button>
            </DialogActions>
          </Box>
        }
        {prop === 'Year' &&
          <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
            <TextField
              autoFocus
              type='number'
              placeholder={prop}
              sx={{ flexGrow: 2, marginRight: '1ch' }}
              required
              margin='normal'
              value={editingMovie[prop]}
              onChange={handleChange(prop)}
              id={prop}
              label={prop}
              variant="outlined" />

            <DialogActions>
              <Button onClick={() => handleAdd()} variant="contained">Edit {prop}</Button>
              <Button onClick={handleClose} variant="text" color="error" >Cancel</Button>
            </DialogActions>
          </Box>
        }
        {prop === 'Rating' &&
          <Box sx={{ width: '40ch', maxWidth: '90vw', p: 1, bgcolor: 'background.paper', display: 'block', align: 'center' }}>
            <Typography id="Rating" gutterBottom>
              Rating
            </Typography>
            <Slider
              required
              //sx={{ marginTop: '3ch', marginBottom: '2ch', marginLeft: '2ch', marginRight: '2ch' }}
              sx={{ marginTop: '3ch', marginBottom: '2ch', marginLeft: '8%', marginRight: '8%', width: '84%', alignSelf: 'center' }}
              color='primary'
              aria-label="Rating"
              value={editingMovie.Rating}
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
        }
        {prop === 'Review' &&
          <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
            <TextField
              autoFocus
              fullWidth
              multiline
              maxRows={16}
              placeholder={prop}
              sx={{ width: '100vw', maxWidth: '90vw', marginRight: '1ch' }}
              required
              margin='normal'
              value={editingMovie[prop]}
              onChange={handleChange(prop)}
              id={prop}
              label={prop}
              variant="outlined" />
            <DialogActions>
              <Button onClick={() => handleAdd()} variant="contained">Edit {prop}</Button>
              <Button onClick={handleClose} variant="text" color="error" >Cancel</Button>
            </DialogActions>
          </Box>
        }


      </Popover>
    </React.Fragment >
  );
}


export default MoviePopover