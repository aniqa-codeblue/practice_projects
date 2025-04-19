const currencyOne = document.getElementById('currency_one');
const amountCurrencyOne = document.getElementById('number_one');
const currencyTwo = document.getElementById('currency_two');
const amountCurrencyTwo = document.getElementById('number_two');
const swap = document.getElementById('swap');
const rate = document.getElementById('rate');

function calculate_rate() {
    const currency1 = currencyOne.value.trim();
    const currency2 = currencyTwo.value.trim();
    const amount1 = amountCurrencyOne.value.trim();

    const apiKey = 'd8ec0fe2d194426e265be85c';
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency1}`;

    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            if (data.result !== 'success') {
                throw new Error('Invalid API response');
            }

            const conversionRate = data.conversion_rates[currency2];
            rate.innerText = `${amount1} ${currency1} = ${conversionRate} ${currency2}`;
            amountCurrencyTwo.value = (amountCurrencyOne.value * conversionRate).toFixed(2);
        })
        .catch(err => {
            console.error('Fetch error:', err);
            rate.innerText = 'Unable to fetch rate 😢';
        });
}

document.addEventListener('DOMContentLoaded', () => {
    currencyOne.addEventListener('change', calculate_rate);
    amountCurrencyOne.addEventListener('input', calculate_rate);
    currencyTwo.addEventListener('change', calculate_rate);
    amountCurrencyTwo.addEventListener('input', calculate_rate);

    swap.addEventListener('click', () => {
        const temp = currencyOne.value;
        currencyOne.value = currencyTwo.value;
        currencyTwo.value = temp;
        calculate_rate();
    });

    calculate_rate(); // Initial load
});
