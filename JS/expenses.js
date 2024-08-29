 const expenseForm = document.getElementById("expense-form");
 const expenseName = document.getElementById("expense-name");
 const expenseAmount = document.getElementById("expense-amount");
 const expenseCategory = document.getElementById("expense-category");
 const expenseDate = document.getElementById("expense-date");
 const expenseTable = document.getElementById("expense-table");
 const expenseList = document.getElementById("expense-list");
 const totalAmount = document.getElementById("total-amount");
 const filterCategory = document.getElementById("filter-category");
const submitBtn = document.getElementById("submit-btn");

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
        <button onclick="editExp(this)" class="edit-btn">Edit</button>
        <button onclick="deleteExp(this)" class="delete-btn">Delete</button>
        </td>
        </tr>
        `
    }); 
};

const reset = () => {
    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";
    expenseDate.value = "";
    expenses = [];
}