import { useState } from 'react';
import { Rating, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const label = {
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
  return `${value} Star${value !== 1 ? 's' : ''}, ${label[value]}`;
}



//* setter should only be necessary if readOnly is false.  In this case,
//* state should be setter's partner from useState :)

export default function RatingComponent({ readOnly, state, setter, property }) {
  // console.log("props passed in are: ", readOnly, state, property); //false, true, undefined.
  // const [state, setter] = useState(rated);
  const [hover, setHover] = useState(-1);
  const rating = property ? state[property] : state;
  // console.log('rating is: ', rating);
  return (
    <Box
    sx={{
      width: 200,
      display: 'flex',
      alignItems: 'center',
    }}
  >
      <Rating
        size="small"
        name="hover-feedback"
        value={ rating }
        precision={ 0.5 }
        getLabelText={ getLabelText }
        readOnly = { readOnly }
        onChange={(event, newValue) => { //newVal is a Number
          if(property){
              let newState = state;
              newState[property] = newValue;
              setter && setter(newState);
          }else{
            setter && setter(newValue);
          }
        }}
        onChangeActive={(event, newHover) => {            
            setHover(newHover);            
        }}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />

      { rating !== null && (
        <Box sx={{ ml: 2 }}>{label[hover !== -1 ? hover : rating]}</Box>
        // <div>{labels[hover !== -1 ? hover : rating ]}</div>
      )}
    </Box>
  );
}















  // return (
  //   <div
  //     // sx={{
  //     //   width: 200,
  //     //   display: 'flex',
  //     //   alignItems: 'center',
  //     // }}
  //   >
  //     <Rating
  //       size="small"
  //       name="hover-feedback"
  //       value={ rating }
  //       precision={ 0.1 }
  //       getLabelText={getLabelText}
  //       readOnly = { readOnly }
  //       onChange={(event, newValue) => {
  //         alert(typeof(newValue));
  //         // const parsed = parseInt(newValue, 10);
  //         // const numRating = isNaN(parsed) ? 0 : parsed;
  //         const numRating = newValue; 
  //         if(property){
  //             let newState = state;
  //             newState[property] = numRating;
  //             setter(newState);
  //         }else{
  //           setter && setter(numRating);
  //         }
  //       }}
  //       onChangeActive={(event, newHover) => {            
  //           setHover(newHover);            
  //       }}
  //       emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.55 }} />}
  //     />
  //     {/* {state !== null && ( */}
  //     { rating ?? (
  //       // <Box sx={{ ml: 3 }}>{labels[hover !== -1 ? hover : rating]}</Box>
  //       <div>{labels[hover !== -1 ? hover : rating ]}</div>
  //     )}
  //   </div>
  // );