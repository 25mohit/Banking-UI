import React, { useEffect, useState } from 'react'
import { IoMdCalculator } from "react-icons/io";
import Input from '../FormInput/Input';
import Select from '../FormInput/Select';
import { GrNext } from "react-icons/gr";
import { formatCurrency, INRCurrency } from '../../../functions/FormatCurrency';
import { CalculateLoan } from '../../../functions/CalculateLoan';
import { RiFileExcel2Line } from "react-icons/ri";
import { calculateLoanFromAPU, GeneratePDF } from '../../../functions/Utils';
import FAQ from '../Helpers/FAQ/FAQ';
import Loader from '../Helpers/Loader/Loader';
import LoadingScreen from '../Helpers/Loader/LoadingScreen';
import SuccessModal from '../Modals/SuccessModal';

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
    const [interestRates, setInterestRates] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    useEffect(() => {

        // Inside the useEffect getting Interest Rate from API, and setting it's response to setInterestRates
        const endpoint = 'https://resume-backend-production.up.railway.app'
        async function fetchInterestRate(){
            try {
                const response = await fetch(`${endpoint}/interest-rate/bank`)
                const formated = await response.json()
                
                if(formated?.s){
                    setInterestRates(formated?.data)
                }
            } catch (error) {
                console.log("errror", error);   
            }  
        }
        fetchInterestRate()
    },[])

    // Common onChange function for all 3 Loan Form fields, LOan Amount / Loan Tenure / Interest Rate
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        if (name === 'amount' || name === 'tenure' || name === 'interest') {
            if (error[name] !== '') {
                setError({...error, [name]:''})
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
    }

    // Function to validate the Form and Calculate the Loan based on user input
    const onCalculateHandler = (e:any) => {
        e.preventDefault()

        let newError = {...error}
    
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
            setLoadingStatus(true)
            calculateLoanFromAPU(setLoadingStatus)
        }
    }   

    // useEffect to setting calaulated loan data to setSummery state, that we can show in Summury Section
    useEffect(() => {
        if(loadingStatus === false) {
            setSummury({
                d: loanForm,
                s: CalculateLoan(loanForm)
            })
        }
    },[loadingStatus])    
    
    // Function to Proceed the user after calculating loan, and showing success message
    const onProceedHandler = () => {
        setLoadingStatus(true)
        setTimeout(() => {
            setLoadingStatus(false)
            setShowSuccessModal(true)
        },2000)
    }
    
  return (
    <div className='loan-calculation'>
        <h3>Calculate Loan for <span>FREE</span></h3>
        <section className='df jcsb'>
            <form className="input-form" method='post'>
                <Input error={error.amount} value={loanForm.amount} name="amount" label="Loan Amount (₹)" type="number" placeholder="Please enter your loan amount" min="0" onChange={onChangeHandler}/>
                <Input error={error.tenure} value={loanForm.tenure} name="tenure" label="Loan Tenure (in months)" type="number" placeholder="How long you want this loan" min="0" onChange={onChangeHandler}/>
                
                { !interestRates?.length ? <div className="field-loading">
                    <Loader /> 
                </div> :
                <Select error={error.interest} value={loanForm.interest} name="interest" label="Loan Interest Rate" options={interestRates} placeholder="Select Interest Rate" onChange={onChangeHandler}/> }
                <button className="btn" onClick={onCalculateHandler}>Calculate <IoMdCalculator /></button>
            </form>
            <div className="result-area df">
                { !summury?.s?.totalPayment ? 
                    <img src="/Assets/hero.avif" alt="Hero" className='hero-image' />
                    :
                    <>
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
                        <button className="btn" onClick={onProceedHandler}>Proceed <GrNext /></button>
                        <button className='export-btn' onClick={() => GeneratePDF(summury)}>Download <RiFileExcel2Line /></button>
                    </footer>
                    </>
                } 
            </div>
        </section>
        <p className='terms-heading'>Terms and Condition</p>
        <FAQ />
        {loadingStatus === true && <LoadingScreen />}
        {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)}/>}
    </div>
  )
}

export default LoanCalculation