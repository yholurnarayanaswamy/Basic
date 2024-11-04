document.addEventListener('DOMContentLoaded', function () {
    const billTotalInput = document.getElementById('billTotal');
    const tipPercentageInput = document.getElementById('tipPercentage');
    const tipAmountInput = document.getElementById('tipAmount');
    const totalWithTipInput = document.getElementById('totalWithTip');
    const tipPercentageDisplay = document.getElementById('tipPercentageDisplay');
    const currencySelect = document.getElementById('currency');
    const errorMessage = document.getElementById('error-message');

    const conversionRates = {
        usd: 1,
        inr: 84.07,
        yen: 149.34
    };

    function calculateTip() {
        const billTotal = parseFloat(billTotalInput.value);
        const tipPercentage = parseFloat(tipPercentageInput.value);
        const selectedCurrency = currencySelect.value;
        const conversionRate = conversionRates[selectedCurrency];

        if (billTotalInput.value === '') {
            errorMessage.textContent = '';
            tipAmountInput.value = '';
            totalWithTipInput.value = '';
            return;
        }

        if (isNaN(billTotal) || billTotal < 0) {
            errorMessage.textContent = 'Please enter a valid positive number for the bill total.';
            tipAmountInput.value = '';
            totalWithTipInput.value = '';
            return;
        } else {
            errorMessage.textContent = '';
        }

        const tipAmount = (billTotal * (tipPercentage / 100)) * conversionRate;
        const totalWithTip = (billTotal * conversionRate) + tipAmount;

        tipAmountInput.value = `${(tipAmount).toFixed(2)} ${getCurrencySymbol(selectedCurrency)}`;
        totalWithTipInput.value = `${(totalWithTip).toFixed(2)} ${getCurrencySymbol(selectedCurrency)}`;
    }

    function getCurrencySymbol(currency) {
        switch (currency) {
            case 'usd':
                return '$';
            case 'inr':
                return '₹';
            case 'yen':
                return '¥';
            default:
                return '$';
        }
    }

    tipPercentageInput.addEventListener('input', function () {
        tipPercentageDisplay.value = `${tipPercentageInput.value}%`;
        calculateTip();
    });

    billTotalInput.addEventListener('input', calculateTip);
    currencySelect.addEventListener('change', calculateTip);
});
