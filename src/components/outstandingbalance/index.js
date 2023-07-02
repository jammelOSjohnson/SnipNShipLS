import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useGeneral } from '../../context/general';

export default function OutstandingBalance() {
  const { value } = useGeneral();
  const { balance } = value;
  const [formatedBal, setFormatedBalance] = useState('0');

  useEffect(() => {
    const formattingOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    };
    const dollarString = new Intl.NumberFormat('en-US', formattingOptions);
    // console.log('about to set balance', balance);
    setFormatedBalance(dollarString.format(balance));
  }, [balance]);

  return <Typography variant="h4">{formatedBal}</Typography>;
}
