import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Colors } from '../../theme/palette';

const IconButtonStyled = styled(IconButton)(() => ({
  zIndex: 2,
  position: 'fixed',
  bottom: '5vh',
  backgroundColor: '#80C4DE',
  color: Colors.white,
  '&:hover, &Mui-focusVisible': {
    transitions: '0.3s',
    color: '#397BA6',
    backgroundColor: '#80C4DE',
  },
  right: '5%',
  border: 'none',
}));
const Scroll = ({ showBelow }) => {
  const isTrue = true;
  const [show, setShow] = useState(showBelow ? !isTrue : isTrue);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
  };

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      setShow(false);
    }
    return null;
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
    return null;
  });
  return (
    <div>
      {show && (
        <IconButtonStyled onClick={handleClick}>
          <ExpandLessIcon sx={{ fontSize: '2em' }} />
        </IconButtonStyled>
      )}
    </div>
  );
};

export default Scroll;
