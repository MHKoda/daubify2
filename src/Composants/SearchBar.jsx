import React, { useState } from "react";

function SearchBar({ list, setList, filterField = item => "", placeholder}) {
    const [value, setValue] = useState("");

    const handleChange = event => {
        const searchValue = event.target.value;
        setValue(searchValue);

        const filteredList = list.filter(item => {
            const fieldValue = filterField(item);
            return fieldValue ? fieldValue.toLowerCase().includes(searchValue.toLowerCase()) : false;
        });
        setList(filteredList);
    };

    return (
        <input 
            type="text" 
            placeholder={`Chercher un `+ placeholder}
            name="search" 
            onChange={handleChange} 
            value={value} 
        />
    );
}

export default SearchBar;
