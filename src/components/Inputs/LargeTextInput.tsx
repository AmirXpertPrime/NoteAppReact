import React from 'react'

interface LargeTextInputProps {
    value: string;
    setValue: (value: string) => void;
    LABEL?: string;
    placeholder?: string;
}

const LargeTextInput = ({ value, setValue, LABEL, placeholder }: LargeTextInputProps) => {
    return (
        <div>
            <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-700">{LABEL || 'Description'}</label>
            <textarea
                id="Description"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder || "Enter description..."}
                rows={5}
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 hover:border-gray-400 transition duration-300 ease resize-none"
            />


        </div>
    )
}

export default LargeTextInput