import { useState } from 'react';
import { Box, Grid, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { RatesContainer, RatesTab } from '../../styles/rates';
import { Colors } from '../../theme/palette';

export default function Rates() {
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <RatesTab>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="Air Freight" value="1" />
                <Tab label="Sea Freight" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">Air Freight</TabPanel>
            <TabPanel value="2">Sea Freight</TabPanel>
          </TabContext>
        </RatesTab>
      </RatesContainer>
    </>
  );
}
