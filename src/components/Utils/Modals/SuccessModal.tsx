import React from 'react'
import { FcApproval } from "react-icons/fc";

interface modalInterface{
    onClose: () => void
}
const SuccessModal:React.FC<modalInterface> = ({onClose}) => {
  return (
    <div className='success-modal'>
        <FcApproval className='approve-icon'/>
        <p><span>Congratulations !</span> your loan is <span>Approved</span></p>
        <p>Soon you'll get confirmation on your <span>E-mail</span> and <span>Mobile</span>.</p>
        <button className="btn" onClick={onClose}>Close</button>
    </div>
  )
}

export default SuccessModal