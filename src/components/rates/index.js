import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { RatesContainer, RatesTab } from '../../styles/rates';
import { Colors } from '../../theme/palette';
// context
import { useGeneral } from '../../context/general';

export default function Rates() {
  // const [value, setValue] = useState('1');
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const { value } = useGeneral();
  const { fetchShippingRates, ratesArr } = value;

  function createData(pound, cost) {
    return { pound, cost };
  }

  const rows = [
    createData('1 lb', '$650 JMD'),
    createData('2 lb', '$950 JMD'),
    createData('3 lb', '$1,150 JMD'),
    createData('4 lb', '$1,450 JMD'),
    createData('5 lb', '$1,750 JMD'),
    createData('6 lb', '$2,400 JMD'),
    createData('7 lb', '$2,600 JMD'),
    createData('8 lb', '$2,800 JMD'),
    createData('9 lb', '$3,000 JMD'),
    createData('10 lb', '$3,500 JMD'),
  ];

  const rows2 = [
    createData('1 lb', '$560 JMD'),
    createData('2 lb', '$560 JMD'),
    createData('3 lb', '$1,000 JMD'),
    createData('4 lb', '$1,250 JMD'),
    createData('5 lb', '$1,550 JMD'),
    createData('6 lb', '$1,850 JMD'),
    createData('7 lb', '$2,150 JMD'),
    createData('8 lb', '$2,450 JMD'),
    createData('9 lb', '$2,750 JMD'),
    createData('10 lb', '$3,050 JMD'),
  ];

  useEffect(() => {
    try {
      // console.log('triggered');
      if (ratesArr === undefined) {
        fetchShippingRates(value);
      }
    } catch (err) {
      // console.log('error: ', err);
    }
  }, [ratesArr]);

  return (
    <>
      <RatesContainer id="rates">
        <Grid container>
          <Grid
            item
            xs={12}
            textAlign="center"
            style={{ marginBottom: '5%', textDecoration: 'underline', color: Colors.white }}
          >
            <Typography variant="h2">Our Rates</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1} md={3} />
          <Grid item xs={10} md={6}>
            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
              <Table sx={{ minWidth: 320 }} aria-label="airfreight table">
                <TableHead>
                  <TableRow key="Head">
                    <TableCell sx={{ fontWeight: 900, color: Colors.primary, fontSize: '1.5em' }}>Weight</TableCell>
                    <TableCell sx={{ fontWeight: 900, color: Colors.primary, fontSize: '1.5em', textAlign: 'right' }}>
                      Cost
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratesArr !== undefined ? (
                    ratesArr.map((rate, index) =>
                      index !== 0 ? (
                        <TableRow key={rate.Pound} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row" sx={{ color: Colors.white }}>
                            {rate.Pound}
                          </TableCell>
                          <TableCell sx={{ color: Colors.white, textAlign: 'right' }}>{rate.Cost}</TableCell>
                        </TableRow>
                      ) : (
                        <></>
                      )
                    )
                  ) : (
                    <></>
                  )}
                  {ratesArr !== undefined ? (
                    <TableRow key={ratesArr[0].Pound} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" sx={{ color: Colors.white }}>
                        {ratesArr[0].Pound}
                      </TableCell>
                      <TableCell sx={{ color: Colors.white, textAlign: 'right' }}>{ratesArr[0].Cost}</TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography style={{ color: 'yellow', paddingTop: '2%', textAlign: 'center', fontWeight: 'bolder' }}>
              11 lbs to 20 lbs $400 for each additional LB*
              <br />
              21 lbs to 50lbs $350 for each additional LB*
            </Typography>
            {/* <RatesTab>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Air Freight" value="1" />
                    <Tab label="Sea Freight" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  
                </TabPanel>
                <TabPanel value="2">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 320 }} aria-label="airfreight table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Weight</TableCell>
                          <TableCell>Cost</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows2.map((row) => (
                          <TableRow key={row.pound} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              {row.pound}
                            </TableCell>
                            <TableCell>{row.cost}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabContext>
            </RatesTab> */}
          </Grid>
          <Grid item xs={1} md={3} />
        </Grid>
      </RatesContainer>
    </>
  );
}
