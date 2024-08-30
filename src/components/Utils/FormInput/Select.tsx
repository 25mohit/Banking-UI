import React from 'react'
import { RandomNumber } from '../../../functions/RandomNo'

interface inputInterface{
    label: string;
}
interface SelectProps {
    label: string;
    options: inputInterface[];
    placeholder: string,
    onChange?: any,
    name?: string,
    error?: string,
    value?: string
}

const Select:React.FC<SelectProps> = ({ label, options, placeholder, onChange, name, value, error }) => {
    const id = RandomNumber(9)
  return (
    <div className='df field'>
        <div className='df aic jcsb'>
          <label htmlFor={id}>{label}</label>
          <p className='error'>{error}</p>
        </div>
        <select name={name} id={id} onChange={onChange} value={value}>
            <option value="">{placeholder}</option>
            {options.map((option: any, index: any) => (
            <option key={index} value={option.key}>
                {option.key}% {option.bank} Bank - {option.label} Loan
            </option>
            ))}
        </select>
    </div>
  )
}

export default Select