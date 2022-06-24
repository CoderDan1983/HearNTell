//* this totally works :D
export function createSetter(state, setter, { property, outerIndex, push } = {}){
    let newState; let oldEntry; let newEntry;

    return function(newValue){
        if(push){ //* push to end of an array
            // console.log('createSetter!');
            // console.log('state is: ', state);
            // console.log('newValue is: ', newValue);
            newState = [...state, newValue ];
            // console.log('newState is: ', newState);
            
            oldEntry = newState[newState.length -2];
            // console.log('oldEntry is: ', oldEntry);
            newEntry = newState[newState.length -1];
            // console.log('newEntry is: ', newEntry);
        }
        else if(outerIndex !== undefined){ //* for an array (with a specific outerIndex)
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
        setter(newState);

        return { newState, oldEntry, newEntry } 
    }
}