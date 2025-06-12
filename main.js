const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");


async function loadCurrencies() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach(currency => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

loadCurrencies();

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "❗ Enter a valid amount.";
    return;
  }

  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  const data = await res.json();
  const rate = data.rates[to];
  const converted = (amount * rate).toFixed(2);

  resultDiv.textContent = `💸 ${amount} ${from} = ${converted} ${to}`;
}
