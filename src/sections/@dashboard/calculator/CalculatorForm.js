import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, TextField, Typography, Select, InputLabel, MenuItem, FormControl, Grid, Box } from '@mui/material';
import { Colors } from '../../../theme/palette';

const formValues = {
  category: 'Select a category',
  price: '',
  weight: '',
  delivery: '',
  precessing: '',
  gct: '',
  duty: '',
  caf: '',
  envl: '',
  scf: '',
  total: '',
};

export default function CalculatorForm({ value, error, setError, setLoading, loadingBtn, success, setSuccess }) {
  const { mailboxNum, fetchShippingRates, ratesArr, addRatesArr } = value;
  const [state, setState] = useState(formValues);

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    // console.log(state);
    try {
      if (state.category === 'Select a category') {
        return setError('Please select a category.');
      }

      if (state.price[0] === '0' || state.price === '' || state.price === ' ') {
        return setError('Please enter a price greater than 0');
      }

      if (state.weight[0] === '0' || state.weight === '' || state.weight === ' ' || parseInt(state.weight, 10) > 50) {
        return setError('Please enter a weight greater than 0 and less than 51');
      }

      // Calculate
      let GCT = '0.00';
      const usdtojmdrate = 155.61;
      const dutyThreshold = 100.0;
      let Duty = '0.00';
      let Delivery = '500.00';
      let Processing = '0.00';
      let CAF = '0.00';
      let ENVL = '0.00';
      let SCF = '0.00';
      let Rate = '0.00';
      let Total = 0.0;
      let rateCost = [];

      rateCost =
        parseInt(state.weight, 10) <= 10
          ? ratesArr.filter((item) => item.Pound === `${state.weight} LB`)
          : addRatesArr.filter((item) => item.Pound === `${state.weight} LB`);
      // console.log(rateCost);
      Rate = parseFloat(rateCost[0]?.Cost.split('$')[1]);
      if (state.category === '1') {
        // Energy
        // Calculate ENVL
        ENVL = (parseFloat(state.price) * 0.005).toFixed(2);
        ENVL = (parseFloat(ENVL) * usdtojmdrate).toFixed(2);
        // Calculate SCF
        SCF = (parseFloat(state.price) * 0.003).toFixed(2);
        SCF = (parseFloat(SCF) * usdtojmdrate).toFixed(2);
        // Add rate to processing fee
        Processing = (parseFloat(Processing) + 0).toFixed(2);
        Processing = (parseFloat(Processing) + parseFloat(Rate)).toFixed(2);
        const price = parseFloat(state.price) * usdtojmdrate;
        // Check if above 50$
        if (parseFloat(state.price) > dutyThreshold) {
          Duty = (parseFloat(Duty) + 0).toFixed(2);
          Duty = (parseFloat(Duty) * usdtojmdrate).toFixed(2);
          CAF = '2500.00';
          GCT = ((price + parseFloat(Duty) + parseFloat(CAF) + parseFloat(ENVL) + parseFloat(SCF)) * 0.15).toFixed(2);
        }
        Delivery = (parseFloat(Delivery) + 0).toFixed(2);

        // Convert to jmd
        // Add total
        // console.log(
        //   ` Total is:
        //     ${parseFloat(GCT)}
        //     ${parseFloat(Duty)}
        //     ${parseFloat(Processing)}
        //     ${parseFloat(CAF)}
        //     ${parseFloat(ENVL)}
        //     ${parseFloat(SCF)}
        //     `
        // );
        Total = (
          parseFloat(GCT) +
          parseFloat(Duty) +
          parseFloat(Processing) +
          parseFloat(CAF) +
          parseFloat(ENVL) +
          parseFloat(SCF)
        ).toFixed(2);
        // Total = parseFloat(GCT) + parseFloat(Duty) + parseFloat(Delivery) + parseFloat(Processing);
      } else if (state.category === '2') {
        // Books and Magazines
        // Calculate ENVL
        ENVL = (parseFloat(state.price) * 0.005).toFixed(2);
        ENVL = (parseFloat(ENVL) * usdtojmdrate).toFixed(2);
        Processing = (parseFloat(Processing) + 0).toFixed(2);
        Processing = (parseFloat(Processing) + Rate).toFixed(2);
        // Calculate SCF
        SCF = (parseFloat(state.price) * 0.003).toFixed(2);
        SCF = (parseFloat(SCF) * usdtojmdrate).toFixed(2);

        const price = parseFloat(state.price) * usdtojmdrate;
        // Check if above 50$
        if (parseFloat(state.price) > dutyThreshold) {
          Duty = (parseFloat(state.price) * 0.02).toFixed(2);
          Duty = (parseFloat(Duty) * usdtojmdrate).toFixed(2);
          CAF = '2500.00';
          GCT = ((price + parseFloat(Duty) + parseFloat(CAF) + parseFloat(ENVL) + parseFloat(SCF)) * 0.15).toFixed(2);
        }
        Delivery = (parseFloat(Delivery) + 0).toFixed(2);

        // Add total
        Total = (
          parseFloat(GCT) +
          parseFloat(Duty) +
          parseFloat(Processing) +
          parseFloat(CAF) +
          parseFloat(ENVL) +
          parseFloat(SCF)
        ).toFixed(2);
        // Total = parseFloat(GCT) + parseFloat(Duty) + parseFloat(Delivery) + parseFloat(Processing);
      } else if (state.category === '3') {
        // Clothes and Shoes
        // Calculate ENVL
        ENVL = (parseFloat(state.price) * 0.005).toFixed(2);
        ENVL = (parseFloat(ENVL) * usdtojmdrate).toFixed(2);
        // console.log(`ENVL IS: ${ENVL}`);
        // Calculate SCF
        SCF = (parseFloat(state.price) * 0.003).toFixed(2);
        SCF = (parseFloat(SCF) * usdtojmdrate).toFixed(2);
        // Add rate to processing fee
        Processing = (parseFloat(Processing) + 0).toFixed(2);
        Processing = (parseFloat(Processing) + Rate).toFixed(2);
        const price = parseFloat(state.price) * usdtojmdrate;
        // Check if above 50$
        if (parseFloat(state.price) > dutyThreshold) {
          Duty = (parseFloat(state.price) * 0.2).toFixed(2);
          Duty = (parseFloat(Duty) * usdtojmdrate).toFixed(2);
          CAF = '2500.00';
          GCT = ((price + parseFloat(Duty) + parseFloat(CAF) + parseFloat(ENVL) + parseFloat(SCF)) * 0.15).toFixed(2);

          // console.log(GCT, Duty);
        }
        Delivery = (parseFloat(Delivery) + 0).toFixed(2);
        // console.log(GCT);

        // Add total
        Total = (
          parseFloat(GCT) +
          parseFloat(Duty) +
          parseFloat(Processing) +
          parseFloat(CAF) +
          parseFloat(ENVL) +
          parseFloat(SCF)
        ).toFixed(2);
        // Total = parseFloat(GCT) + parseFloat(Duty) + parseFloat(Delivery) + parseFloat(Processing);
      } else if (state.category === '4') {
        // Sports Equipment
        // Calculate ENVL
        ENVL = (parseFloat(state.price) * 0.005).toFixed(2);
        ENVL = (parseFloat(ENVL) * usdtojmdrate).toFixed(2);
        // Calculate SCF
        SCF = (parseFloat(state.price) * 0.003).toFixed(2);
        SCF = (parseFloat(SCF) * usdtojmdrate).toFixed(2);
        // Add rate to processing fee
        Processing = (parseFloat(Processing) + 0).toFixed(2);
        Processing = (parseFloat(Processing) + Rate).toFixed(2);
        const price = parseFloat(state.price) * usdtojmdrate;
        // Check if above 50$
        if (parseFloat(state.price) > dutyThreshold) {
          Duty = (parseFloat(state.price) * 0.05).toFixed(2);
          Duty = (parseFloat(Duty) * usdtojmdrate).toFixed(2);
          CAF = '2500.00';
          GCT = ((price + parseFloat(Duty) + parseFloat(CAF) + parseFloat(ENVL) + parseFloat(SCF)) * 0.15).toFixed(2);
        }
        Delivery = (parseFloat(Delivery) + 0).toFixed(2);

        // Add total
        Total = (
          parseFloat(GCT) +
          parseFloat(Duty) +
          parseFloat(Processing) +
          parseFloat(CAF) +
          parseFloat(ENVL) +
          parseFloat(SCF)
        ).toString();
        // Total = parseFloat(GCT) + parseFloat(Duty) + parseFloat(Delivery) + parseFloat(Processing);
      } else if (state.category === '5') {
        // Cellphones
        // Calculate ENVL
        ENVL = (parseFloat(state.price) * 0.005).toFixed(2);
        ENVL = (parseFloat(ENVL) * usdtojmdrate).toFixed(2);
        // Calculate SCF
        SCF = (parseFloat(state.price) * 0.003).toFixed(2);
        SCF = (parseFloat(SCF) * usdtojmdrate).toFixed(2);
        // Add rate to processing fee
        Processing = (parseFloat(Processing) + 0).toFixed(2);
        Processing = (parseFloat(Processing) + Rate).toFixed(2);
        const price = parseFloat(state.price) * usdtojmdrate;
        // Check if above 50$
        if (parseFloat(state.price) > dutyThreshold) {
          Duty = (parseFloat(state.price) * 0.07).toFixed(2);
          Duty = (parseFloat(Duty) * usdtojmdrate).toFixed(2);
          CAF = '2500.00';
          GCT = ((price + parseFloat(Duty) + parseFloat(CAF) + parseFloat(ENVL) + parseFloat(SCF)) * 0.15).toFixed(2);
        }
        Delivery = (parseFloat(Delivery) + 0).toFixed(2);

        // Add total
        Total = (
          parseFloat(GCT) +
          parseFloat(Duty) +
          parseFloat(Processing) +
          parseFloat(CAF) +
          parseFloat(ENVL) +
          parseFloat(SCF)
        ).toFixed(2);
        // Total = parseFloat(GCT) + parseFloat(Duty) + parseFloat(Delivery) + parseFloat(Processing);
      } else if (state.category === '6') {
        // Car Parts
        // Calculate ENVL
        ENVL = (parseFloat(state.price) * 0.005).toFixed(2);
        ENVL = (parseFloat(ENVL) * usdtojmdrate).toFixed(2);
        // Calculate SCF
        SCF = (parseFloat(state.price) * 0.003).toFixed(2);
        SCF = (parseFloat(SCF) * usdtojmdrate).toFixed(2);
        // Add rate to processing fee
        Processing = (parseFloat(Processing) + 0).toFixed(2);
        Processing = (parseFloat(Processing) + Rate).toFixed(2);
        const price = parseFloat(state.price) * usdtojmdrate;
        // Check if above 50$
        if (parseFloat(state.price) > dutyThreshold) {
          Duty = (parseFloat(state.price) * 0.2).toFixed(2);
          Duty = (parseFloat(Duty) * usdtojmdrate).toFixed(2);
          CAF = '2500.00';
          GCT = ((price + parseFloat(Duty) + parseFloat(CAF) + parseFloat(ENVL) + parseFloat(SCF)) * 0.15).toFixed(2);
          // console.log('duty is: ', Duty);
        }
        Delivery = (parseFloat(Delivery) + 0).toFixed(2);

        // Add total
        Total = (
          parseFloat(GCT) +
          parseFloat(Duty) +
          parseFloat(Processing) +
          parseFloat(CAF) +
          parseFloat(ENVL) +
          parseFloat(SCF)
        ).toFixed(2);
        // Total = parseFloat(GCT) + parseFloat(Duty) + parseFloat(Delivery) + parseFloat(Processing);
      }

      setState({
        ...state,
        gct: GCT,
        duty: Duty,
        delivery: Delivery,
        precessing: Processing,
        total: Total,
        caf: CAF,
        envl: ENVL,
        scf: SCF,
      });
      return setLoading(false);
    } catch (err) {
      console.log(err);
      return setLoading(false);
    }
  };

  const calculateFees = async function calculateFees(file, cb) {
    try {
      const i = 1;
      return i;
    } catch (err) {
      // console.log(err);
      setError('');
      return '';
    }
  };

  useEffect(() => {
    try {
      // console.log('triggered');
      if (ratesArr === undefined || addRatesArr === undefined) {
        fetchShippingRates(value);
      }
    } catch (err) {
      console.log(err);
    }
  }, [ratesArr, addRatesArr]);

  const onInputChange2 = function onInputChange2(event) {
    // console.log(event.target.value);
    const { value, name } = event.target;
    setState({ ...state, [name.toLowerCase()]: value });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={state.category}
                onChange={(e) => onInputChange2(e)}
                label="Category"
                name="Category"
              >
                <MenuItem value="Select a category" key={'0'}>
                  <em>Select a category</em>
                </MenuItem>
                <MenuItem value={'1'} key={'1'}>
                  Energy Efficient Items, Computer, Tablets and Tools
                </MenuItem>
                <MenuItem value={'2'} key={'2'}>
                  Books & Magazines
                </MenuItem>
                <MenuItem value={'3'} key={'3'}>
                  Clothes, Shoes, Toiletries, Most other things
                </MenuItem>
                <MenuItem value={'4'} key={'4'}>
                  Sports Equipment
                </MenuItem>
                <MenuItem value={'5'} key={'5'}>
                  Cellphones
                </MenuItem>
                <MenuItem value={'6'} key={'6'}>
                  Car Parts
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} />
          <Grid item xs={12} md={6}>
            <TextField
              label="Enter USD price"
              name="price"
              value={state.price}
              onChange={(e) => onInputChange2(e)}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Enter Weight"
              name="weight"
              value={state.merchant}
              onChange={(e) => onInputChange2(e)}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>{`GCT: $${state.gct?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} JMD`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{`Duty: $${state.duty?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} JMD`}</Typography>
          </Grid>
          {/* <Grid item xs={6}>
            <Typography>{`Delivery: $${state.delivery?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} JMD`}</Typography>
          </Grid> */}
          <Grid item xs={6}>
            <Typography>{`Processing: $${state.precessing?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} JMD`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{`CAF: $${state.caf?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} JMD`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{`ENVL: $${state.envl?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} JMD`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{`SCF: $${state.scf?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} JMD`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ color: Colors.primary, fontWeight: 'bolder' }}>{`Total: $${state.total?.replace(
              /(\d)(?=(\d{3})+(?!\d))/g,
              '$1,'
            )} JMD`}</Typography>
          </Grid>
          <Grid item xs={12} md={6} />
          <Grid item xs={12}>
            {error && (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="filled" severity="success">
                {success}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={(e) => handleSubmit(e)}
              disabled={ratesArr === undefined || addRatesArr === undefined ? true : loadingBtn}
            >
              CALCULATE
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
