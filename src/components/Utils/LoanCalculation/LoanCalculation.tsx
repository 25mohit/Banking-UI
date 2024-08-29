import React from 'react'
import { IoMdCalculator } from "react-icons/io";
import Input from '../FormInput/Input';
import Select from '../FormInput/Select';
import { GrNext } from "react-icons/gr";

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
                <Input label="Loan Tenure (in months)" type="number" placeholder="How long you want this loan" min="0"/>
                <Select label="Loan Interest Rate" options={interestRates} placeholder="Select Interest Rate"/>
                <button className="btn">Calculate <IoMdCalculator /></button>
            </form>
            <div className="result-area df">
                <div className="heading">
                    <span>Required : </span>
                    <span className='main'><b>₹58 Lacs Loan</b> for <b>24 months</b> with <b>12%</b> pa</span>
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
            <li>We request you to allow premature withdrawal of Fixed Deposits in line with the operating
instructions - ‘Either or Survivor’, 'Anyone or Survivor' or ‘Former or Survivor’. 
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