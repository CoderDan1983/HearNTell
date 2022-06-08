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

//* setRating should only be necessary if readOnly is false.  In this case,
//* rating should be setRating's partner from useState :)
export default function RatingComponent({ readOnly, rating, setRating }) {
  // const [rating, setRating] = useState(rated);
  const [hover, setHover] = useState(-1);

  return (
    <div
      // sx={{
      //   width: 200,
      //   display: 'flex',
      //   alignItems: 'center',
      // }}
    >
      <Rating
        size="small"
        name="hover-feedback"
        value={ rating ? rating : 0 }
        precision={0.5}
        getLabelText={getLabelText}
        readOnly = { readOnly }
        onChange={(event, newValue) => {           
            //alert('41')
            setRating && setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {            
            //alert('47')
            setHover(newHover);            
        }}
        emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.55 }} />}
      />
      {/* {rating !== null && ( */}
      { rating ?? (
        // <Box sx={{ ml: 3 }}>{labels[hover !== -1 ? hover : rating]}</Box>
        <div>{labels[hover !== -1 ? hover : rating]}</div>
      )}
    </div>
  );
}