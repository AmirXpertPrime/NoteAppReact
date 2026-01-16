import React from 'react'

interface validationErrorProps {
    validationMsg?: string;

}

const validationError = ({ validationMsg }: validationErrorProps) => {
    return (
        <div>
            <p style={{ color: 'red', marginTop: 10 }}>{validationMsg || 'please fill the fields'}</p>
        </div>
    )
}

export default validationError
