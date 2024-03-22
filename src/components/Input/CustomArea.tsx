import React, { ChangeEvent } from 'react'
 
interface CustomAreaProps {
    state: string;
    label: string;
    callable:(newValue: string) => void;
}
 
const CustomArea:React.FC<CustomAreaProps> = ({state, callable, label }) => {
 
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        callable(newValue)
    }
 
  return (
    <div className='mb-3'>
    <label htmlFor={state} className='block text-white font-bold mb-2'>{label}</label>
    <textarea cols={30} rows={10}
    className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
    value={state} onChange={handleChange} />
  </div>
)
}
 
export default CustomArea