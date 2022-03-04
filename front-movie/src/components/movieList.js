import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';
import WatchForm from './WatchForm';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';

import MoviePopover from './MoviePopover';

import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { deleteViewing } from '../reducers/movieReducer';

// https://www.npmjs.com/package/react-responsive
import { useMediaQuery } from 'react-responsive'

const Small = ({ children }) => {
  const isSmall = useMediaQuery({ maxWidth: 767 })
  return isSmall ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

function WatchPopover(props) {

  const dispatch = useDispatch()

  const { row, w } = props
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'movie-popper' : undefined;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose()
    dispatch(deleteViewing(w.Id, row))
  }

  return (
    <React.Fragment>
      <IconButton size='small' color="inherit" onClick={handleOpen}>
        <DeleteOutlinedIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{ zIndex: 1500 }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ margin: '1ch' }}>
          <Typography variant='h6'>
            Wanna delete this viewing?
          </Typography>
          <DialogActions>
            <Button onClick={() => handleDelete()} variant="contained">Delete</Button>
            <Button onClick={handleClose} variant="text" color="error" >Cancel</Button>
          </DialogActions>
        </Box>
      </Popover>

    </React.Fragment>
  )
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);


  const dateFormatter = (date) => {
    const d = new Date(date)
    return String(d.getDate()).padStart(2, '0') + "." + String(d.getMonth() + 1).padStart(2, '0') + "." + d.getFullYear()
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <MoviePopover row={row} prop='Name' align="left" twidth={225} />
        <Default>
          <MoviePopover row={row} prop='Year' align="right" twidth={80} />
        </Default>
        <MoviePopover row={row} prop='Rating' align="right" twidth={85} />


        {/* <EditableCell row={row} prop={row.Name} />
        <EditableCell row={row} prop={row.Year} />
        <EditableCell row={row} prop={row.Rating} /> */}
        {/* 
        <TableCell component="th" scope="row">
          {row.Name}
        </TableCell>
         
        
        <TableCell align="right">{row.Year}</TableCell>
        <TableCell align="right">{row.Rating}</TableCell>
        */}
        {row.Watches !== null ?
          <TableCell align="right" sx={{ width: '130px', padding: '10px' }}>
            {row.LastViewing > 0 ?
              //dateFormatter(row.Watches[row.Watches.length - 1].Date)
              dateFormatter(row.Watches[0].Date)
              : '-'
            }
          </TableCell>
          : <TableCell align="right" sx={{ width: '130px', padding: '10px' }}>-</TableCell>
        }
        <Default>
          {row.Watchtimes !== null ?
            <TableCell sx={{ width: '100px', padding: '10px' }} align="right">{row.Watchtimes}</TableCell>
            : <TableCell align="right" sx={{ width: '100px', padding: '10px' }}>-</TableCell>
          }
        </Default>

        <TableCell /* width={2} */ sx={{ width: '34px', padding: '10px' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginBottom: 1 }}>

              <Typography align='center' variant="h5" gutterBottom component="div" sx={{ marginTop: '1ch' }}>
                Review
              </Typography>
              <MoviePopover row={row} prop='Review' align="right" />
              {/* 
              <Typography variant='body2' gutterBottom component="div" sx={{ maxWidth: '77ch', padding: '20px' }}>
                {row.Review}
              </Typography> 
 */} {/* MITÄ PITÄISI TEHDÄ TÄLLE kun TABLEHEAD hyppii, kun tämä osa vaihtelee leveyden kanssa. .. .. . ...  */}
              <Divider variant='fullWidth' ><Box display='flex' flexDirection='row' alignItems='center'><Typography variant='h6'>Watches</Typography><WatchForm movie={row} /></Box></Divider>
              <Table size="small" aria-label="watches">
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Date</TableCell>
                    <TableCell align='left'>Place</TableCell>
                    <TableCell align='left'>Note</TableCell>
                    <TableCell width='20px' align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Watches !== null && row.Watches.map((w, i) => (
                    <TableRow key={`watches${i}`}>
                      {new Date(w.Date).getTime() < 0 ?
                        <TableCell component="th" scope="row">-</TableCell>
                        : <TableCell component="th" scope="row" sx={{ maxWidth: '15vw', wordWrap: 'break-word', paddingLeft: '4px', paddingRight: '4px' }}>{dateFormatter(w.Date)}</TableCell>
                      }
                      <TableCell sx={{ maxWidth: '10vw', wordWrap: 'break-word', paddingLeft: '4px', paddingRight: '4px' }}>{w.Place}</TableCell>
                      <TableCell sx={{ maxWidth: '10vw', wordWrap: 'break-word', paddingLeft: '4px', paddingRight: '4px' }}>{w.Note}</TableCell>
                      <TableCell width='20px' align='right'>
                        <WatchPopover row={row} w={w} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCellsLarge = [
  {
    id: 'Name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    align: 'center',
    width: '280px'
  },
  {
    id: 'Year',
    numeric: true,
    disablePadding: false,
    label: 'Year',
    align: 'right',
    width: '80px'
  },
  {
    id: 'Rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
    align: 'right',
    width: '85px'
  },
  {
    id: 'LastViewing',
    numeric: true,
    disablePadding: false,
    label: 'Last Viewing',
    align: 'right',
    width: '130px'
  },
  {
    id: 'Watchtimes',
    numeric: true,
    disablePadding: false,
    label: 'Watchtimes',
    align: 'right',
    width: '100px'
  },
];

const headCellsSmall = [
  {
    id: 'Name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    align: 'center',
    width: '280px'
  },
  {
    id: 'Rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
    align: 'right',
    width: '85px'
  },
  {
    id: 'LastViewing',
    numeric: true,
    disablePadding: false,
    label: 'Last Viewing',
    align: 'right',
    width: '130px'
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow>
        <Default>
          {headCellsLarge.map((headCell) => (
            <TableCell
              key={headCell.id}
              //align={headCell.numeric ? 'right' : 'center'}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ width: headCell.width, padding: '10px' }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'desc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </Default>
        <Small>
          {headCellsSmall.map((headCell) => (
            <TableCell
              key={headCell.id}
              //align={headCell.numeric ? 'right' : 'center'}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ width: headCell.width, padding: '10px' }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'desc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </Small>
      </TableRow>
    </TableHead>
  );
}

export default function MovieList() {

  const movies = useSelector(state => state.movies)

  if (movies != null) {
    movies.sort(function (a, b) {
      if (a.Name < b.Name) { return -1; }
      if (a.Name > b.Name) { return 1; }
      return 0;
    })
  }

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('Rating');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [filterTerm, setFilterTerm] = useState('')
  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movies.length) : 0;


  if (movies === null) return (
    <p>No Movies Found!</p>
  )

  if (movies === []) return (
    <p>No Movies Found!</p>
  )

  if (movies != null) return (
    <React.Fragment>
      <Paper>
        {/* <Default> */}
        <Box sx={{
          display: 'flex',
          //textAlign: 'left',
          paddingLeft: '2ch',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          alignContent: 'flex-start'
        }}>
          <TextField
            sx={{
              flexGrow: 1,
              marginRight: '1ch',
            }}
            margin='normal'
            value={filterTerm}
            onChange={handleFilterChange}
            id='filternameterm'
            label='Filter Name'
            variant="outlined"
          />
          <TablePagination
            sx={{
              alignSelf: 'center',
              flexGrow: 2,
              "& .MuiToolbar-root": { flexWrap: 'wrap', justifyContent: 'end' }
            }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={movies.filter(m => (m.Name.toLowerCase()).includes(filterTerm.toLowerCase())).length}
            rowsPerPage={rowsPerPage}
            page={page}
            showFirstButton={true}
            showLastButton={true}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        {/* 
        </Default>
        <Small>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            //textAlign: 'left',
            paddingLeft: '2ch',
            alignItems: 'flex-start',
            alignContent: 'flex-start'
          }}>
            <TextField
              sx={{
                flexGrow: 1,
                marginRight: '1ch',
              }}
              margin='normal'
              value={filterTerm}
              onChange={handleFilterChange}
              id='filternameterm'
              label='Filter Name'
              variant="outlined"
            />
            <TablePagination
              sx={{ alignSelf: 'center', flexGrow: 2, flexDirection: 'row', flexWrap: 'wrap' }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={movies.filter(m => (m.Name.toLowerCase()).includes(filterTerm.toLowerCase())).length}
        rowsPerPage={rowsPerPage}
        page={page}
        showFirstButton={true}
        showLastButton={true}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </Box>
    </Small>
    */}
        < TableContainer /* component={Paper} */ >
          <Table
            stickyHeader
            aria-label="simple table"
            sx={{ /* width: '86ch',  */ width: '86ch', maxWidth: '100vw' }}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(movies, getComparator(order, orderBy))
                .filter(m => (m.Name.toLowerCase()).includes(filterTerm.toLowerCase()))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((m, i) => {
                  return (<Row key={`movies${i}`} row={m} />
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 55 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer >
        <TablePagination
          sx={{
            flexGrow: 2,
            "& .MuiToolbar-root": { flexWrap: 'wrap', justifyContent: 'end' }
          }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={movies.filter(m => (m.Name.toLowerCase()).includes(filterTerm.toLowerCase())).length}
          rowsPerPage={rowsPerPage}
          page={page}
          showFirstButton={true}
          showLastButton={true}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper >
    </React.Fragment >
  )
}

