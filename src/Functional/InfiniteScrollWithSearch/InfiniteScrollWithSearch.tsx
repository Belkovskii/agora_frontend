import React, {useState} from "react";
import Select from 'react-select'

const InfiniteScrollWithSearch : React.FunctionComponent<{
    filterByInput : (value : any) => void,
    handleSelect : (value : any) => void,
    handleCountChange : (from : number, to : number) => void
    options : { label: string; value: string; }[]
}> = ({ filterByInput, handleSelect, options, handleCountChange }) => {

    const [inputValue, setInputValue] = useState("");
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(10);

    const handleInputChange = (input : string) => {
        setInputValue(() => input);
        filterByInput(input);
    }   
    
    const handleMenuScrollToBottom = () => {
        setFrom(from => from + 10);
        setTo(to => to + 10);
        handleCountChange(from, to);
    }

    return (
        <div>
            <Select
                onInputChange={handleInputChange}                
                onChange={handleSelect}
                isSearchable                
                isClearable                
                options={options}
                inputValue={inputValue}
                onMenuScrollToBottom={handleMenuScrollToBottom} 
                
            />
        </div>
    )
}

export default InfiniteScrollWithSearch;