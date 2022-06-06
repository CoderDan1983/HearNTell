// TagsInput.jsx
import { useState } from 'react';

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
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>
                        <span>{tag}</span>
                        <i 
                            className="material-icons"
                            onClick={ ()=> removeTags(index) }>
                            close
                        </i>
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