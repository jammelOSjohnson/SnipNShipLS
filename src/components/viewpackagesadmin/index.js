import * as React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Container,
  IconButton,
  TableFooter,
  TablePagination,
  Tooltip,
  Typography,
  Zoom,
  useTheme,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Moment from 'moment';
// context
import { useGeneral } from '../../context/general';
import { Colors } from '../../theme/palette';
import EditPackage from '../editpackage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(TrackingNum, Name, Description, Mailbox, Status, OrderDate) {
  return { TrackingNum, Name, Description, Mailbox, Status, OrderDate };
}

// createData('Frozen yoghurt', 159, 6.0, 24),
//   createData('Ice cream sandwich', 237, 9.0, 37),
//   createData('Eclair', 262, 16.0, 24),
//   createData('Cupcake', 305, 3.7, 67),
//   createData('Gingerbread', 356, 16.0, 49),
//   createData('Anotherbread', 356, 16.0, 49),

export default function ViewPackagesAdmin() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [tracking, setTracking] = React.useState('');
  const { value } = useGeneral();
  const { rangeOfPackages, currentUser, editPackageStaff } = value;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const location = useLocation().pathname;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (rangeOfPackages !== undefined) {
      const tempRows = [];
      rangeOfPackages.map((item) => {
        tempRows.push(
          createData(
            item.PackageDetails.TrackingNumber,
            item.clientName,
            item.PackageDetails.ItemName,
            item.PackageDetails.MBoxNumber,
            item.PackageDetails.ItemStatus,
            Moment(item.PackageDetails.OrderDate.toDate()).format('YYYY-MM-DD')
          )
        );
        return null;
      });
      setRows(tempRows);
    }
  }, [rangeOfPackages, currentUser, rows.length, value]);

  // console.log(tracking);
  return (
    <>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Tracking #</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Mailbox</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Order Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                (row) => (
                  <StyledTableRow key={row.TrackingNum}>
                    <StyledTableCell component="th" scope="row">
                      <Tooltip TransitionComponent={Zoom} title="Click to Edit Package Details">
                        <a
                          href={location}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                            setTracking(row.TrackingNum);
                            // console.log(tracking);
                          }}
                        >
                          {row.TrackingNum}
                        </a>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="right">
                      {row.Name}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="right">
                      {row.Description}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="right">
                      {row.Mailbox}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="right">
                      {row.Status}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="right">
                      {row.OrderDate}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <EditPackage
          open={open}
          handleClose={handleClose}
          tracking={tracking}
          pack={rangeOfPackages}
          editPackageStaff={editPackageStaff}
          value={value}
        />
      </Container>
    </>
  );
}
