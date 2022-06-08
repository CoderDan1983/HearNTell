import { useState } from 'react';
import { Rating, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function RatingComponent({ readOnly, rated }) {
  const [rating, setRating] = useState(rated);
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 125,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={ rating }
        precision={0.5}
        getLabelText={getLabelText}
        readOnly = { readOnly }
        onChange={(event, newValue) => {           
            //alert('41')
            setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {            
            //alert('47')
            setHover(newHover);            
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
      )}
    </Box>
  );
}