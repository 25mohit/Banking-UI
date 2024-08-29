import React from 'react'
import { RandomNumber } from '../../../functions/RandomNo'

interface inputInterface{
    label: string;
}
interface SelectProps {
    label: string;
    options: inputInterface[];
    placeholder: string
}

const Select:React.FC<SelectProps> = ({ label, options, placeholder }) => {
    const id = RandomNumber(9)
  return (
    <div className='df field'>
        <label htmlFor={id}>{label}</label>
        <select name="" id={id}>
            <option value="">{placeholder}</option>
            {options.map((option: any, index: any) => (
            <option key={index} value={option.label}>
                {option.label}
            </option>
            ))}
        </select>
    </div>
  )
}

export default Select