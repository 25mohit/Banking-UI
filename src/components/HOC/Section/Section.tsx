import React from 'react'

interface SectionInterface{
    children?: any
}
const Section:React.FC<SectionInterface> = ({ children }) => {
  return (
    <section className='section'>
        {children}
    </section>
  )
}

export default Section