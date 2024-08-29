import React, { HTMLInputTypeAttribute } from 'react'
import { RandomNumber } from '../../../functions/RandomNo';

interface inputInterface{
    label: String,
    placeholder: string,
    type: HTMLInputTypeAttribute,
    min?: string
}
const Input:React.FC<inputInterface> = ({ label, type, placeholder, min }) => {
    const id = RandomNumber(9)
  return (
    <div className='df field'>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} placeholder={placeholder} {...(type === 'number' && { min })}/>
    </div>
  )
}

export default Input