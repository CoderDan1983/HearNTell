// TagsInput.jsx
import { useState } from 'react';
import { Button, Icon } from '@mui/material';
import { Close } from '@mui/icons-material';

const TagsInput = ({ selectedTags }) => {
    const [tags, setTags] = useState([]);
    const addTags = event => {
        if(event.key === "Enter" && event.target.value !== ""){
            setTags([...tags, event.target.value ]);
            selectedTags([...tags, event.target.value ]); //* updates parent info :D
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    return (
        <div className="tags-input">
            <ul className="tagContainer">
                {tags.map((tag, index) => (
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


{/* <i 
className="material-icons"
onClick={ ()=> removeTags(index) }>
close
</i> */}