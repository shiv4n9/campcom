document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("paymentForm");
  
    paymentForm.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        // Get form data
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const state = document.getElementById("state").value.trim();
        const zip = document.getElementById("zip").value.trim();
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const cardName = document.getElementById("cardName").value.trim();
        const expiryDate = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
  
        // Validate form fields
        if (!name || !email || !address || !city || !state || !zip || !cardNumber || !cardName || !expiryDate || !cvv) {
            alert("Please fill in all the fields!");
            return;
        }
  
        if (!validateCardNumber(cardNumber)) {
            alert("Invalid card number!");
            return;
        }
  
        if (!validateExpiryDate(expiryDate)) {
            alert("Invalid expiry date!");
            return;
        }
  
        if (cvv.length !== 3 || isNaN(cvv)) {
            alert("Invalid CVV!");
            return;
        }
  
        // Simulate payment processing
        alert(`Payment processed successfully! Thank you, ${name}.`);
    });
  
    // Validate card number (simple Luhn algorithm implementation)
    function validateCardNumber(number) {
        let sum = 0;
        let shouldDouble = false;
  
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i), 10);
  
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
  
            sum += digit;
            shouldDouble = !shouldDouble;
        }
  
        return sum % 10 === 0;
    }
  
    // Validate expiry date format (MM/YY)
    function validateExpiryDate(date) {
        const [month, year] = date.split("/");
        if (!month || !year || month.length !== 2 || year.length !== 2) {
            return false;
        }
  
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
  
        if (isNaN(monthNum) || isNaN(yearNum) || monthNum < 1 || monthNum > 12) {
            return false;
        }
  
        // Check if the date is in the future
        const currentDate = new Date();
        const expiryDate = new Date(`20${yearNum}`, monthNum - 1);
  
        return expiryDate > currentDate;
    }
  });
  