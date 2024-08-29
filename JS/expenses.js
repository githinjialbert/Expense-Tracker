const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseDate = document.getElementById("expense-date");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const filterCategory = document.getElementById("filter-category");

let expenses = [];

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (expenseName.value === "" || expenseAmount.value === "" || expenseCategory.value === "" || expenseDate.value === "" || isNaN(expenseAmount.value)) {
        return;
    }

    const expense = {
        id: `${expenseName.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        name: expenseName.value,
        amount: parseFloat(expenseAmount.value),
        category: expenseCategory.value,
        date: expenseDate.value
    };

    expenses.push(expense);
    displayExpenses(expenses);
    updateTotalAmount();

    reset();
});

const displayExpenses = (expenses) => {
    expenseList.innerHTML = "";
    expenses.forEach(({id, name, amount, category, date}) => {
        expenseList.innerHTML += `
        <tr id="${id}">
        <td>${name}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${category}</td>
        <td>${date}</td>
        <td>
        <button class="edit-btn" id="${id}">Edit</button>
        <button class="delete-btn" id="${id}">Delete</button>
        </td>
        </tr>
        `;
    }); 
};

expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.id;
        expenses = expenses.filter(expense => expense.id !== id);
        displayExpenses(expenses);
        updateTotalAmount();
    }

    if (e.target.classList.contains("edit-btn")) {
        const id = e.target.id;
        const expense = expenses.find(expense => expense.id === id);
        expenseName.value = expense.name;
        expenseAmount.value = expense.amount;
        expenseCategory.value = expense.category;
        expenseDate.value = expense.date;

        expenses = expenses.filter(expense => expense.id !== id);
        displayExpenses(expenses);
        updateTotalAmount();
    }
});

filterCategory.addEventListener("change", (e) => {
    const myCategory = e.target.value;
    if (myCategory === "All") {
        displayExpenses(expenses);
    } else {
        const filteredExpenses = expenses.filter(expense => expense.category === myCategory);
        displayExpenses(filteredExpenses);
    }
});

const reset = () => {
    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";
    expenseDate.value = "";
};

const updateTotalAmount = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}