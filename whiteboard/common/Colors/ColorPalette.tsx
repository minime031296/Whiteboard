import React from 'react'

const ColorPalette = ({ setOptions }) => {
    const handleChange = (e) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            lineColor: e.target.value,
        }));
    }
  return (
    <div>
        <input type="color" onChange={handleChange} />
    </div>
  )
}

export default ColorPalette
