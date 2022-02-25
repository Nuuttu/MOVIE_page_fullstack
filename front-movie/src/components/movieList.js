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
import WatchForm from './watchForm';

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
        <TableCell align="right">{row.Year}</TableCell>
        <TableCell align="right">{row.Rating}</TableCell>
        {row.Watches !== null ?
          <TableCell align="right">
            {row.LastViewing > 0 ?
              //dateFormatter(row.Watches[row.Watches.length - 1].Date)
              dateFormatter(row.Watches[0].Date)
              : '-'
            }
          </TableCell>
          : <TableCell align="right">-</TableCell>
        }
        {row.Watchtimes !== null ?
          <TableCell align="right">{row.Watchtimes}</TableCell>
          : <TableCell align="right">-</TableCell>
        }
        <TableCell width={2}>
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
            <Box sx={{ margin: 1 }}>

              <Typography align='center' variant="h5" gutterBottom component="div">
                Review
              </Typography>
              <Typography variant='body2' gutterBottom component="div">
                {row.Review}
              </Typography>
              <Divider variant='fullWidth' ><Box display='flex' flexDirection='row' alignItems='center'><Typography variant='h6'>Watches</Typography><WatchForm movie={row} /></Box></Divider>
              <Table size="small" aria-label="watches">
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Date</TableCell>
                    <TableCell align='left'>Place</TableCell>
                    <TableCell align='left'>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Watches !== null && row.Watches.map((w, i) => (
                    <TableRow key={`watches${i}`}>
                      {new Date(w.Date).getTime() < 0 ?
                        <TableCell component="th" scope="row">-</TableCell>
                        : <TableCell component="th" scope="row">{dateFormatter(w.Date)}</TableCell>
                      }
                      <TableCell>{w.Place}</TableCell>
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
    id: 'Year',
    numeric: true,
    disablePadding: false,
    label: 'Year',
    align: 'right'
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
  {
    id: 'Watchtimes',
    numeric: true,
    disablePadding: false,
    label: 'Watchtimes',
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

      </TableRow>
    </TableHead>
  );
}

export default function MovieList({ movies }) {

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('Rating');

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
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

        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(movies, getComparator(order, orderBy))
            .map((m, i) => {
              return (<Row key={`movies${i}`} row={m} />
              )
            })}

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