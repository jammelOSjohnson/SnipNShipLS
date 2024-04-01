import * as React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import InfoIcon from '@mui/icons-material/InfoRounded';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { Box, Container, IconButton, Stack, Tooltip, Zoom, useTheme } from '@mui/material';
// TableFooter,
// TablePagination,

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Moment from 'moment';
import MUIDataTable from 'mui-datatables';
// context
import { useGeneral } from '../../context/general';
import { Colors } from '../../theme/palette';
import EditPackage from '../editpackage';
import ViewCustomer from '../viewcustomer';
// import SearchBar from '../searchbar/SearchBar';
import DeletePackage from '../deletepackage';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: Colors.primary,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

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

function createData(InfoID, TrackingNum, Name, Description, Mailbox, Status, OrderDate) {
  return { InfoID, TrackingNum, Name, Description, Mailbox, Status, OrderDate };
}

// createData('Frozen yoghurt', 159, 6.0, 24),
//   createData('Ice cream sandwich', 237, 9.0, 37),
//   createData('Eclair', 262, 16.0, 24),
//   createData('Cupcake', 305, 3.7, 67),
//   createData('Gingerbread', 356, 16.0, 49),
//   createData('Anotherbread', 356, 16.0, 49),

export default function ViewPackagesAdmin() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Kit',
        name: 'InfoID',
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        label: 'Tracking #',
        name: 'TrackingNum',
        options: {
          filter: true,
          sort: true,
          customBodyRender: (val) => {
            const parentStyle = {};
            const cellStyle = {
              wordWrap: 'break-word',
            };
            return (
              <div style={{ position: 'relative', height: '20px' }}>
                <div style={parentStyle}>
                  <div style={cellStyle}>{val}</div>
                </div>
              </div>
            );
          },
        },
      },
      {
        label: 'Name',
        name: 'Name',
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: 'Description',
        name: 'Description',
        options: {
          customBodyRender: (val) => {
            const parentStyle = {};
            const cellStyle = {
              wordWrap: 'break-word',
            };
            return (
              <div style={{ position: 'relative', height: '20px' }}>
                <div style={parentStyle}>
                  <div style={cellStyle}>{val}</div>
                </div>
              </div>
            );
          },
        },
      },
      {
        label: 'Mailbox',
        name: 'Mailbox',
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: 'Status',
        name: 'Status',
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: 'OrderDate',
        name: 'OrderDate',
        options: {
          filter: true,
          sort: true,
        },
      },
    ],
    rows: [],
  });
  const [searched, setSearched] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [tracking, setTracking] = React.useState('');
  const [currentUserID, setCurrentUserID] = React.useState('');
  const [previousUserID, setPreviousUserID] = React.useState('');
  const { value } = useGeneral();
  const { rangeOfPackages, currentUser, editPackageStaff, deletePackage, findUserForDashboard } = value;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const location = useLocation().pathname;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datatable.rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const options = {
    filterType: 'dropdown',
    search: true,
    selectableRows: 'none',
    download: false,
    print: false,
  };

  React.useEffect(() => {
    // console.log('page load');
    if (rangeOfPackages !== undefined) {
      if (searched === '' || searched === undefined || searched === null) {
        const tempRows = [];
        rangeOfPackages.map((item) => {
          if (item.PackageDetails.TrackingNumber === 'DONOTDELETE_TESTTRACKING') {
            // console.log(Moment(item.PackageDetails.OrderDate.toDate()).format('YYYY-MM-DD'));
          }
          const firstCol = (
            <Stack direction="row" key={item.PackageDetails.TrackingNumber}>
              <Tooltip TransitionComponent={Zoom} title="Click to view customer info">
                <PersonIcon
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen2(true);
                    setCurrentUserID(item.UID);
                    // console.log(currentUserID);
                  }}
                  color="primary"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  {item.PackageDetails.TrackingNumber}
                </PersonIcon>
              </Tooltip>
              <Tooltip TransitionComponent={Zoom} title="Click to open delete package window">
                <CloseIcon
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen3(true);
                    setTracking(item.PackageDetails.TrackingNumber);
                    // console.log(currentUserID);
                  }}
                  color="error"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                />
              </Tooltip>
            </Stack>
          );

          tempRows.push(
            createData(
              firstCol,
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
        // console.log(tempRows);
        setDatatable({ ...datatable, rows: tempRows });
      }
    }
  }, [rangeOfPackages, currentUser, datatable.rows.length, value]);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal.target.value);
    const filteredRows = rangeOfPackages.filter((row) => {
      // console.log(row);
      return row.clientName.toLowerCase().includes(searchedVal.target.value.toLowerCase())
        ? row.clientName.toLowerCase().includes(searchedVal.target.value.toLowerCase())
        : row.PackageDetails.TrackingNumber.includes(searchedVal.target.value)
        ? row.PackageDetails.TrackingNumber.includes(searchedVal.target.value)
        : row.PackageDetails.ItemName.toLowerCase().includes(searchedVal.target.value.toLowerCase())
        ? row.PackageDetails.ItemName.toLowerCase().includes(searchedVal.target.value.toLowerCase())
        : [];
    });
    const tempRows = [];
    console.log(filteredRows);
    filteredRows.map((item) => {
      const firstCol = (
        <Stack direction="row" key={item.PackageDetails.TrackingNumber}>
          <Tooltip TransitionComponent={Zoom} title="Click to view customer info">
            <PersonIcon
              onClick={(e) => {
                e.preventDefault();
                setOpen2(true);
                setCurrentUserID(item.UID);
                // console.log(currentUserID);
              }}
              color="primary"
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {item.PackageDetails.TrackingNumber}
            </PersonIcon>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Click to open delete package window">
            <CloseIcon
              onClick={(e) => {
                e.preventDefault();
                setOpen3(true);
                setTracking(item.PackageDetails.TrackingNumber);
                // console.log(currentUserID);
              }}
              color="error"
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          </Tooltip>
        </Stack>
      );

      tempRows.push(
        createData(
          firstCol,
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
    console.log(tempRows);
    setDatatable({ ...datatable, rows: tempRows });
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };
  // console.log(tracking);
  return (
    <>
      <Container>
        {/* <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        /> */}
        {/* <SearchBar searched={searched} requestSearch={requestSearch} placeholder="Enter search value" /> */}
        <MUIDataTable title={'Packages'} data={datatable.rows} columns={datatable.columns} options={options} />

        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <InfoIcon />
                </StyledTableCell>
                <StyledTableCell>Tracking #</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Mailbox</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Order Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? datatable.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : datatable.rows
              ).map((row) => (
                <StyledTableRow key={row.TrackingNum}>
                  <StyledTableCell component="th" scope="row">
                    <Stack direction="row">
                      <Tooltip TransitionComponent={Zoom} title="Click to view customer info">
                        <PersonIcon
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen2(true);
                            setCurrentUserID(row.InfoID);
                            // console.log(currentUserID);
                          }}
                          color="primary"
                          sx={{ '&:hover': { cursor: 'pointer' } }}
                        >
                          {row.TrackingNum}
                        </PersonIcon>
                      </Tooltip>
                      <Tooltip TransitionComponent={Zoom} title="Click to open delete package window">
                        <CloseIcon
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen3(true);
                            setTracking(row.TrackingNum);
                            // console.log(currentUserID);
                          }}
                          color="error"
                          sx={{ '&:hover': { cursor: 'pointer' } }}
                        />
                      </Tooltip>
                    </Stack>
                  </StyledTableCell>
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
              ))}

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
                  count={datatable.rows.length}
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
        </TableContainer> */}

        <EditPackage
          open={open}
          handleClose={handleClose}
          tracking={tracking}
          pack={rangeOfPackages}
          editPackageStaff={editPackageStaff}
          value={value}
        />
        <DeletePackage
          open3={open3}
          handleClose3={handleClose3}
          tracking={tracking}
          pack={rangeOfPackages}
          deletePackage={deletePackage}
        />

        <ViewCustomer
          open2={open2}
          handleClose2={handleClose2}
          currentUserID={currentUserID}
          previousUserID={previousUserID}
          findUserForDashboard={findUserForDashboard}
          value={value}
        />
      </Container>
      <style>
        {`
            table {
              table-layout: fixed;
              width: 100%;
              overflow: hidden;
            }

            th{
              background-color: ${Colors.primary} !important;
            }

            th > span > button > div > div{
              color: #FFF !important;
            }
          `}
      </style>
    </>
  );
}
