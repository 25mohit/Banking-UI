export function formatCurrency(number) {
    const crore = Math.floor(number / 10000000);
    const lakh = Math.floor((number % 10000000) / 100000);
    const thousand = Math.floor((number % 100000) / 1000);
    const hundred = Math.floor((number % 1000) / 100);
    const remaining = number % 100;
  
    let words = "";
  
    if (crore > 0) {
      words += crore + (crore > 1 ? " crores " : " crore ");
    }
    if (lakh > 0) {
      words += lakh + (lakh > 1 ? " lakhs " : " lakh ");
    }
    if (thousand > 0) {
      words += thousand + (thousand > 1 ? " thousands " : " thousand ");
    }
    if (hundred > 0) {
      words += hundred + " hundred ";
    }
    if (remaining > 0) {
      words += remaining;
    }
  
    if (!words) {
      words = "zero";
    }
  
    words += " rupees";
    return words.trim();
  }  