import React, { useState } from 'react'
import { IoMdCalculator } from "react-icons/io";
import Input from '../FormInput/Input';
import Select from '../FormInput/Select';
import { GrNext } from "react-icons/gr";
import { formatCurrency, INRCurrency } from '../../../functions/FormatCurrency';
import { CalculateLoan } from '../../../functions/CalculateLoan';
import { jsPDF } from 'jspdf';
import { RiFileExcel2Line } from "react-icons/ri";
import { GeneratePDF } from '../../../functions/Utils';
import FAQ from '../Helpers/FAQ/FAQ';

const LoanCalculation = () => {
    const [loanForm, setLoanForm] = useState({
        amount: '',
        tenure: '',
        interest: ''
    })
    const [summury, setSummury] = useState({
        d: {
            amount: '',
            tenure: '',
            interest: ''
        },
        s:{
            interestPerMonth: 0,
            totalPayment: 0,
            emi: 0,
            totalInterest: 0,
        }
    })
    const [error, setError] = useState({
        amount:'',
        tenure: '',
        interest:''
    })

    const interestRates = [
        {
            label: '6%',
            key: '6'
        },
        {
            label: '7%',
            key: '7'
        },
        {
            label: '8%',
            key: '8'
        },
        {
            label: '9%',
            key: '9'
        },
        {
            label: '10%',
            key: '10'
        },
    ]

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        if (name === 'amount' || name === 'tenure' || name === 'interest') {
            // Optional: Check for errors and clear them
            if (error[name] !== '') {
                setError({...error, [name]:''})
                console.log(error[name], name);
            }
        }
        
        if(name === 'tenure'){
            if(Number(value) > 360){
                setError({...error, [name]:'Max 360 months'})
                setLoanForm({...loanForm, [name]: '360'})
            } else {
                setLoanForm({...loanForm, [name]: value})
            }
        } else {
            setLoanForm({...loanForm, [name]: value})
        }
        // console.log("easdasd", e.target.value, e.target.name);   
    }

    const onCalculateHandler = (e:any) => {
        e.preventDefault()

        console.log("loanForm", loanForm);
        let newError = {...error}

        console.log("loanForm", loanForm);
    
        if (loanForm.amount === '') {
            newError.amount = 'Loan amount Required';
        }
    
        if (loanForm.tenure === '') {
            newError.tenure = 'Loan Tenure Required';
        }
        if (loanForm.interest === '') {
            newError.interest = 'Interest rate Required';
        }
    
        setError(newError);
        
        if (!newError.amount && !newError.interest) {
            
            setSummury({
                d: loanForm,
                s: CalculateLoan(loanForm)
            })
        }
        
    }   
    
  return (
    <div className='loan-calculation'>
        <h3>Calculate Loan Amount <span>FREE</span></h3>
        <section className='df jcsb'>
            <form className="input-form" method='post'>
                <Input error={error.amount} value={loanForm.amount} name="amount" label="Loan Amount (₹)" type="number" placeholder="Please enter your loan amount" min="0" onChange={onChangeHandler}/>
                <Input error={error.tenure} value={loanForm.tenure} name="tenure" label="Loan Tenure (in months)" type="number" placeholder="How long you want this loan" min="0" onChange={onChangeHandler}/>
                <Select error={error.interest} value={loanForm.interest} name="interest" label="Loan Interest Rate" options={interestRates} placeholder="Select Interest Rate" onChange={onChangeHandler}/>
                <button className="btn" onClick={onCalculateHandler}>Calculate <IoMdCalculator /></button>
            </form>
            <div className="result-area df">
                <div className="heading">
                    <span>Required : </span>
                    <span className='main'><b>₹{formatCurrency(Number(summury?.d?.amount))} </b>Loan for <b>{summury?.d?.tenure} months</b> with <b>{summury?.d?.interest}%</b> pa</span>
                </div>
                <div className="summury df">
                    <table className='summury-table'>
                        <tbody>
                            <tr>
                                <td>Loan Amount : </td>
                                <td>{INRCurrency(Number(summury?.d?.amount))}</td>
                            </tr>
                            <tr>
                                <td>Tenure : </td>
                                <td>{summury?.d?.tenure} months</td>
                            </tr>
                            <tr>
                                <td>Interest : </td>
                                <td>{INRCurrency(summury?.s?.interestPerMonth)} <span title='Per Month'>pm</span></td>
                            </tr>
                            <tr>
                                <td>EMI : </td>
                                <td>{INRCurrency(summury?.s?.emi)} <span title='Per Month'>pm</span></td>
                            </tr>
                            <tr>
                                <td>Total Interest : </td>
                                <td>{INRCurrency(summury?.s?.totalInterest)}</td>
                            </tr>
                            <tr className='total'>
                                <td>Total Amount : </td>
                                <td>{INRCurrency(summury?.s?.totalPayment)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <footer className='df aic'>
                    <button className="btn">Proceed <GrNext /></button>
                    <button className='export-btn' onClick={() => GeneratePDF(summury)}>Download <RiFileExcel2Line /></button>
                </footer>
            </div>
        </section>
        <p className='terms-heading'>Terms and Condition</p>
        <FAQ />
    </div>
  )
}

export default LoanCalculation