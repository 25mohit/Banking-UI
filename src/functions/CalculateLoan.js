export function CalculateLoan(data){
    const amount = Number(data?.amount)
    const tenure = Number(data?.tenure)
    const interest = Number(data?.interest) / 100

    const monthlyInterestRate = interest / 12;

    // const interestPerMonth = totalInterest/ tenure
    // const totalAmount = amount + totalInterest
    const emi = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / (Math.pow(1 + monthlyInterestRate, tenure) - 1);
    
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - amount;
    const interestPerMonth = totalInterest / tenure
    return {totalPayment, emi, totalInterest, interestPerMonth}
    
}