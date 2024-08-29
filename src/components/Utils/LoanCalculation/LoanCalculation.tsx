import React from 'react'
import { IoMdCalculator } from "react-icons/io";
import Input from '../FormInput/Input';
import Select from '../FormInput/Select';

const LoanCalculation = () => {
    const interestRates = [
        {
            label: 'asdasd',

        }
    ]
  return (
    <div className='loan-calculation'>
        <h3>Calculate Loan Amount <span>FREE</span></h3>
        <section className='df jcsb'>
            <form className="input-form" method='post'>
                <Input label="Loan Amount (₹)" type="number" placeholder="Please enter your loan amount" min="0"/>
                <Input label="Loan Tenure " type="number" placeholder="How long you want this loan" min="0"/>
                <Select label="Loan Interest Rate" options={interestRates} placeholder="Select Interest Rate"/>
                <button className="btn">Calculate <IoMdCalculator /></button>
            </form>
            <div className="result-area df">
                <div className="heading">
                    <span>Required : </span>
                    <span></span>
                </div>
            </div>
        </section>
    </div>
  )
}

export default LoanCalculation