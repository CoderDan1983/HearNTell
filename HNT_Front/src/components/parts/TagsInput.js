// TagsInput.jsx
// import { useState } from 'react';
import { Button, Icon } from '@mui/material';
import { Close } from '@mui/icons-material';

//* property is only used with objects.  outerIndex uses
const TagsInput = ({ state, setter, property, outerIndex }) => { //index
    const { removeFromArray, addToArray, oldEntry, newEntry} = arrayProcessor(state, setter, { property, outerIndex }); //index
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
                            onClick={ ()=> removeFromArray(index) } 
                        />
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp = { event => { 
                    //console.log('tagInput key up event runs first?: ', event.keyCode, event.key, event.code);
                    addToArray(event);                 
                }}
                placeholder="Press enter to add tags"
            />
        </div>
    );
};
export default TagsInput;



function getNewState(state, setter, newValue, { property, outerIndex } = {}){
    let newState; let oldEntry; let newEntry;
    if(outerIndex !== undefined){ //* for an array
        newState = [...state ];
        oldEntry = newState[outerIndex];
        newState[outerIndex] = newValue;
    }
    else if(property !== undefined){ //* for an object 
        newState = { ...state }
        oldEntry = newState[property];
        newState[property] = newValue;
    }
    else{ //* if state is a "simple" variable that will hold only this array
        newState = newValue;
        oldEntry = state;
        newEntry = newValue;
    }
    return { newState, oldEntry, newEntry }
}
// //^ returns default "state" values on initialization.  also returns add and remove functions.
// //^ add and remove functions can put the array into an object, another array, 
// //^ or simple state variable and update state accordingly
function arrayProcessor(state, setter, { property, outerIndex } = {}) { //index
    let newState; let oldEntry; let newEntry;
    // [23, "fred", [], "tie"]
    // tags, setTags
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

    const addToArray = event => {
    // if(action === "add"){
        // console.log('116 inside: ', newState, oldEntry, newEntry);
        // console.log('and also: ', state, setter)
        // console.log('not to tension: ', property, event, outerIndex);
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

    const removeFromArray = index => {  
    // if(action === "remove"){   
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

    return { removeFromArray, addToArray, newState, oldEntry, newEntry }
}

















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