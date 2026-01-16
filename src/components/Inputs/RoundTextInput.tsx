
import React from 'react'

interface RoundTextInputProps {
    value: string;
    setValue: (value: string) => void;
    LABEL?: string;
    placeholder?: string;
}


const RoundTextInput = ({ value, setValue, LABEL, placeholder }: RoundTextInputProps) => {
    return (
        <div>
            <label htmlFor="Title" className="block mb-2 text-sm font-medium text-gray-700">{LABEL || "Title"}</label>
            <input
                type="text"
                id="Title"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder || "Enter Title..."}
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 hover:border-gray-400 transition duration-300 ease"
            />
        </div>
    )
}

export default RoundTextInput
