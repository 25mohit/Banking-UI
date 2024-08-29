import React, { HTMLInputTypeAttribute } from 'react'
import { RandomNumber } from '../../../functions/RandomNo';

interface inputInterface{
    label: String,
    placeholder: string,
    type: HTMLInputTypeAttribute,
    min?: string,
    onChange?: any,
    name?: string,
    error?: string,
    value?: string
}
const Input:React.FC<inputInterface> = ({ label, type, placeholder, min, onChange, name, value, error }) => {
    const id = RandomNumber(9)
  return (
    <div className='df field'>
        <div className='df aic jcsb'>
          <label htmlFor={id}>{label}</label>
          <p className='error'>{error}</p>
        </div>
        <input type={type} value={value} id={id} name={name} placeholder={placeholder} onChange={onChange} {...(type === 'number' && { min })}/>
    </div>
  )
}

export default Input