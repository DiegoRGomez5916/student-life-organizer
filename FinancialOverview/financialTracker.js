// ********************************************************
// Project: Student Life Organizer
// File: financialTracker.js
// Programer(s): Dyllan Cummings, Luis Contreras
// Purpose: 
//     - handles functionality of FinacialTracker class (see below)
// Date Due: 4/29/26
// **********************************************************
class FinancialTracker {
  // FinancialTracker class serves as an array for the transaction elements
  // *********************************************************************
  // FinancialTracker functions:
  // addTransaction(name, amount, description = "")
  //    - appends transaction to list
  //    - updates ui
  // editTransaction(index, name, amount, description = "")
  //    - updates transaction at index
  //    - updates ui
  // deleteTransaction(index)
  //    - deletes transaction at index
  //    - updates ui
  // getTransaction(index)
  //    - returns transaction at index
  // getBalance()
  //    - returns sum total of amounts
  // updateUI()
  //    - clears the current Transaction List
  //    - creates a new list with updated/ added transactions
  //    - updates the Total Balance
  constructor() {
    this.transactions = []; // creates empty array upon creation
  }

  addTransaction(name, amount, description = "") {
    this.transactions.push({name, amount: Number(amount), description});
      // creates a new transaction and appends it to the list
    this.updateUI(); // updates the ui
  }

  editTransaction(index, name, amount, description = "") {
    if (index < 0 || index >= this.transactions.length)
      return; // if the indes is out of bounds, return

    this.transactions[index] = {name, amount: Number(amount), description};
      // changes transaction at index to the updated information

    this.updateUI(); // update ui
  }

  deleteTransaction(index) {
    if (index < 0 || index >= this.transactions.length)
      return; // if index is out of bounds, return

    this.transactions.splice(index, 1); // removes the indexed element
    this.updateUI(); // updates ui
  }

  getTransaction(index) {
    if (index < 0 || index >= this.transactions.length)
      return null; // if index is out of bounds, return null
    return this.transactions[index]; // return the indexed transaction
  }

  getBalance() {
    let total = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      total += this.transactions[i].amount; // add the current transaction amount to total
    }

    return total;
  }

  updateUI() {
    // gets reference to TransactionList and Balance
    const list = document.getElementById("transactionList");
    const balance = document.getElementById("balance");

    list.innerHTML = ""; // clears the current printed list

    for(let i = 0; i < this.transactions.length; i++){
      const t = this.transactions[i]; // t is current transaction

      const li = document.createElement("li"); // creates new list object
      li.className = "transaction-item";
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");

      // fills content of transaction element
      // formats amount to 2 decimal places
      // shows description is != ""
      li.innerHTML = `
        <div class="transaction-main">
          <span class="transaction-name">${t.name}</span>
          <span class="transaction-amount">$${Number(t.amount).toFixed(2)}</span>
        </div>
        ${t.description ? `<div class="transaction-description">${t.description}</div>` : ""}
      `;

      // click event
      li.addEventListener("click", () => {
        window.openTransactionPopup("edit", i); // when clicked, passes "edit" mode and index of transaction
      });

      list.appendChild(li); // add transaction to list
    }

    balance.textContent = `Total Balance: $${this.getBalance().toFixed(2)}`;
      // calls the getBalance function, displays at 2 decimal places
  }
}

window.tracker = new FinancialTracker(); // tracker instance
