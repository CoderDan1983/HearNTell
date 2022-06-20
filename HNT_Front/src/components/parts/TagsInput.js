// TagsInput.jsx
// import { useState } from 'react';
import { Button, Icon } from '@mui/material';
import { Close } from '@mui/icons-material';

//* prop is ONLY used if the setter will be setting an object
const TagsInput = ({ state, setter, property, outerIndex }) => { 
    // const [tags, setTags] = useState([]);
    // const addTags = event => {
    //     if(event.key === "Enter" && event.target.value !== ""){
    //         setter([...state, event.target.value ])
    //         event.target.value = "";
    //     }
    // };
    let oldEntry; let newEntry; let newState;
    if(outerIndex !== undefined){ //* for an array
        newState = [...state ];
        oldEntry = newState[outerIndex];
        newEntry = newState[outerIndex];
    }
    else if(property !== undefined){ //* for an object 
        newState = { ...state }
        oldEntry = newState[property];
        newEntry = newState[property];
    }
    else{ //* if state is a "simple" variable that will hold only this array
        newState = state;
        oldEntry = state;
        newEntry = state;
    }

    const addTags = event => {
        if(event.key === "Enter" && event.target.value !== ""){
            if(outerIndex !== undefined){ //* for an array
                newEntry = [...newState[outerIndex], event.target.value ] //$ okay
                newState[outerIndex] = newEntry;
                setter(newState);
            }
            else if(property !== undefined){ //* for an object 
                newEntry = [...newState[property], event.target.value ];
                newState = { ...newState, [property]: newEntry }
                setter(newState);
            }
            else{ //* if state is a "simple" variable that will hold only this array
                newEntry = [...state, event.target.value ]; 
                newState = newEntry;
                setter(newState);
            }
            event.target.value = "";
        }
    };

    const removeTags = index => {      
        if(outerIndex !== undefined){ //* for an array
            newEntry = [...oldEntry.filter(tag => oldEntry.indexOf(tag) !== index)]
            newState[outerIndex] = newEntry;
            setter(newState);
        }
        else if(property !== undefined){ //* for an object
            newEntry = [...oldEntry.filter(tag => oldEntry.indexOf(tag) !== index)]
            newState = {...newState, [property]: newEntry };
            setter(newState);
        }
        else{ //* if state is a "simple" variable that will hold only this array
            newState = [...state.filter(tag => state.indexOf(tag) !== index)];
            newEntry = newState;
            setter(newState);
        }
    };

    // const displayArray = 
    return (
        <div className="tags-input">
            <ul className="flexWrapper">
                { newEntry && newEntry.map((tag, index) => (
                    <li key={index} className="tag" >
                        <span>
                            {tag}
                        </span>
                        <Close 
                            fontSize='inherit'
                            onClick={ ()=> removeTags(index) } 
                        />
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp={ event => addTags(event) }
                placeholder="Press enter to add tags"
            />
        </div>
    );
};
export default TagsInput;


// const addTags = event => {
//     if(event.key === "Enter" && event.target.value !== ""){
//         if(index !== undefined){
//             const newArray = state;
//             newArray[index] = event.target.value;
//             setter(newArray)
//         }
//         else if(property !== undefined){
//             setter({
//                 ...state,
//                 [property]: event.target.value,
//             })
//         }
//         else{
//             setter(event.target.value)
//         }
//         event.target.value = "";
//     }
// };



// const addTags = event => {
//     if(event.key === "Enter" && event.target.value !== ""){
//         // if(Array.isArray(state)){
//         if(index !== undefined){
//             const newArray = state;
//             newArray[index] = event.target.value;
//             setter(newArray)
//         }
//         //else if(typeof(state) === 'object'){
//         else if(property !== undefined){
//             setter({
//                 ...state,
//                 [property]: event.target.value,
//                 // [event.target.name]: event.target.value,
//             })
//         }
//         else{
//             setter(event.target.value)
//         }
//         // setTags([...tags, event.target.value ]);
//         // selectedTags([...tags, event.target.value ]); //* updates parent info :D
//         setter()
//         event.target.value = "";
//     }
// };

// import { useState } from 'react';
// import { Button, Icon } from '@mui/material';
// import { Close } from '@mui/icons-material';

// const TagsInput = ({ selectedTags }) => {
//     const [tags, setTags] = useState([]);
//     const addTags = event => {
//         if(event.key === "Enter" && event.target.value !== ""){
//             setTags([...tags, event.target.value ]);
//             selectedTags([...tags, event.target.value ]); //* updates parent info :D
//             event.target.value = "";
//         }
//     };

//     const removeTags = index => {
//         setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
//     };

//     return (
//         <div className="tags-input">
//             <ul className="flexWrapper">
//                 {tags.map((tag, index) => (
//                     <li key={index} className="tag" >
//                         <span>
//                             {tag}
//                         </span>
//                         <Close 
//                             fontSize='inherit'
//                             onClick={ ()=> removeTags(index) } 
//                         />
//                     </li>
//                 ))}
//             </ul>
//             <input
//                 type="text"
//                 onKeyUp={ event => addTags(event) }
//                 placeholder="Press enter to add tags"
//             />
//         </div>
//     );
// };
// export default TagsInput;