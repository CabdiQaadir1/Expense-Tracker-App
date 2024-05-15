const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expenses = document.getElementById('expenses');
const transactionList = document.getElementById('transaction-list');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const form = document.getElementById('form');

let transactions = [];

// Function to display transactions
function displayTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${transaction.text} <span class="${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'} font-semibold">${transaction.amount}</span>
            <button class="ml-2 text-red-600 font-semibold" onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        transactionList.appendChild(li);
    });
}

// Function to update balance, income, and expenses
function updateBalance() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const incomeTotal = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expenseTotal = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.textContent = `$${total}`;
    income.textContent = `$${incomeTotal}`;
    expenses.textContent = `$${expenseTotal}`;
}

// Function to add transaction
function addTransaction(e) {
    e.preventDefault();
    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please enter text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: textInput.value,
            amount: +amountInput.value
        };
        transactions.push(transaction);
        displayTransactions();
        updateBalance();
        textInput.value = '';
        amountInput.value = '';
    }
}

// Function to delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    displayTransactions();
    updateBalance();
}

// Function to generate ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Event listener for form submit
form.addEventListener('submit', addTransaction);

// Initialize app
function init() {
    displayTransactions();
    updateBalance();
}

init();
