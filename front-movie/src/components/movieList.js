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
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';

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

        <TableCell component="th" scope="row">
          {row.Name}
        </TableCell>
        <TableCell align="right">{row.Rating}</TableCell>
        {row.Watches !== null ?
          <TableCell align="right">{dateFormatter(row.Watches[row.Watches.length - 1].Date)}</TableCell> :
          <TableCell align="right">-</TableCell>
        }
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>

              <Typography variant="h6" gutterBottom component="div">
                Review
              </Typography>
              <Typography variant='body1' gutterBottom component="div">
                {row.Review}
              </Typography>
              <Divider variant='fullWidth' ><Typography variant='h6'>Watches</Typography></Divider>
              <Table size="small" aria-label="watches">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Watches !== null && row.Watches.map((w) => (
                    <TableRow key={w.Date}>
                      <TableCell component="th" scope="row">{dateFormatter(w.Date)}</TableCell>
                      <TableCell>{w.Note}</TableCell>
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
  console.log('comparing', a, b)
  console.log('orderby', orderBy)
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

const headCells = [
  {
    id: 'Name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    align: 'center'
  },
  {
    id: 'Rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
    align: 'right'
  },
  {
    id: 'LastViewing',
    numeric: true,
    disablePadding: false,
    label: 'Last Viewing',
    align: 'right'
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            //align={headCell.numeric ? 'right' : 'center'}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
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

      </TableRow>
    </TableHead>
  );
}

export default function MovieList({ movies }) {

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('Rating');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (movies === null) return (
    <p>No Movies Found!</p>
  )

  if (movies === []) return (
    <p>No Movies Found!</p>
  )

  if (movies != null) return (

    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ width: '50ch', maxWidth: '50ch' }} aria-label="simple table">

        {/* 
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Rating&nbsp;(0-10)</TableCell>
            <TableCell align="right">Last Watch</TableCell>
            <TableCell sx={{ width: '3ch' }}></TableCell>
          </TableRow>
        </TableHead>
        */}

        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(movies, getComparator(order, orderBy))
            .map((m, i) => {
              return (<Row key={i} row={m} />
              )
            })}
          {/* 
          {movies.map((m, i) =>
            <Row key={i} row={m} />
          )}
           */}
        </TableBody>
      </Table>
    </TableContainer >
  )
}


/* 
              <TableCell align="right">
                {c.RoastLevel}
              </TableCell>
              <TableCell align="right">
                <IconButton color="inherit" onClick={() => handleDeleteClick(c)}><DeleteIcon /></IconButton>
              </TableCell> 
              */