import React, { useState } from 'react'
import { IoMdCalculator } from "react-icons/io";
import Input from '../FormInput/Input';
import Select from '../FormInput/Select';
import { GrNext } from "react-icons/gr";
import { formatCurrency } from '../../../functions/FormatCurrency';

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
        }
    })
    const [error, setError] = useState({
        amount:'',
        tenure: '',
        interest:''
    })

    const interestRates = [
        {
            label: 'asdasd',
            key: 'CUstome'
        }
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
                d: loanForm
            })
        }
        
    }
    // console.log("loanForm", loanForm);
    
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
                    <span className='main'><b>₹{formatCurrency(Number(summury?.d?.amount))} Loan</b> for <b>{summury?.d?.tenure} months</b> with <b>{summury?.d?.interest}%</b> pa</span>
                </div>
                <div className="summury df">
                    <table className='summury-table'>
                        <tbody>
                            <tr>
                                <td>Loan Amount : </td>
                                <td>₹58,00,000</td>
                            </tr>
                            <tr>
                                <td>Tenure : </td>
                                <td>24 months</td>
                            </tr>
                            <tr>
                                <td>Interest Per Month : </td>
                                <td>₹6,15,615</td>
                            </tr>
                            <tr>
                                <td>EMI : </td>
                                <td>₹65,000 <span title='Per Month'>pm</span></td>
                            </tr>
                            <tr>
                                <td>Total Interest : </td>
                                <td>₹12,00,000</td>
                            </tr>
                            <tr className='total'>
                                <td>Total Amount : </td>
                                <td>₹41,56,312</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="btn">Proceed <GrNext /></button>
            </div>
        </section>
        <p className='terms-heading'>Terms and Condition</p>
        <ul className='terms'>
            <li>We request you to allow premature withdrawal of Fixed Deposits in line with the operating instructions - ‘Either or Survivor’, 'Anyone or Survivor' or ‘Former or Survivor’. 
</li>
            <li>The same will be applicable even in the event of death of any of the Joint depositors prior to
            maturity of the deposit. </li>
            <li>Any such repayment before maturity shall constitute a valid discharge of
the Bank’s obligations against all concerned including but not limited to the nominees/ legal heirs
of the depositors or anyone claiming under them</li>
            <li> The Bank shall be able to discharge its
            obligations without any need for No Objection Certificates from the nominees/ legal heirs. </li>
            <li>We further understand that premature withdrawal of Fixed Deposits is subject to penal rates as
per the Bank's policies. However, such penalty shall not be levied when premature withdrawal is
done in case of death of any one of us (Joint holders). </li>
        </ul>
    </div>
  )
}

export default LoanCalculation