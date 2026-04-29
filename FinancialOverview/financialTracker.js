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
  // loadTransactions()
  //    - loads transactions stored in local storage
  // saveTransactions()
  //    - saves transactions to local storage
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
  //--------------------------------------------------------------------
  // updateUI()
  //    - clears the current Transaction List
  //    - creates a new list with updated/ added transactions
  //    - updates the Total Balance
  // updateHomeUI()
  //    - updates the ui on the home page
  //    - updates balance total
  //    - updates the 3 most recent transactions
  // ---------------------------------------------------------------------
  // setUpSearch()
  //    - checks for search bar
  //    - listens for every addition and deletion
  //    - if it exists, send contents to filterTransactions()
  // filterTransactions(searchTerm = "")
  //    - filters out all transactions that do not include the search condition
  //    - checks: name, price, and description
  //    - if search bar is empty, show all
  constructor() {
    //this.transactions = []; // creates empty array upon creation
    this.transactions = this.loadTransactions();
    this.updateUI(); // update the ui upon loading from local storage
    this.setupSearch();
  }


  loadTransactions() {
    // load transactions from local storage

    const saved = localStorage.getItem("transactions");

    if (!saved) {
      return []; // if nothing is saved, return empty array
    }

    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Could not parse saved transactions:", error);
      return [];
    }
  }

  saveTransactions() {
    // saves transactions to local storage
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  addTransaction(name, amount, description = "") {
    //this.transactions.push({name, amount: Number(amount), description});
    this.transactions.unshift({name, amount: Number(amount), description});
      // creates a new transaction and appends it to the list

    this.saveTransactions(); // store updated array
    
    this.updateUI(); // updates the ui
    this.updateHomeUI(); // update home page
  }

  editTransaction(index, name, amount, description = "") {
    if (index < 0 || index >= this.transactions.length)
      return; // if the indes is out of bounds, return

    this.transactions[index] = {name, amount: Number(amount), description};
      // changes transaction at index to the updated information

    this.saveTransactions(); // store updated array
    this.updateUI(); // update ui
  }

  deleteTransaction(index) {
    if (index < 0 || index >= this.transactions.length)
      return; // if index is out of bounds, return

    this.transactions.splice(index, 1); // removes the indexed element

    this.saveTransactions(); // store updated array
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

  updateHomeUI(){
    // updates the home ui with most recent balance and transactions
    if (!document.getElementById("BalanceTotal"))// if not in home page
      return // quit function

    // set transactions to null
    let transaction1 = null;
    let transaction2 = null;
    let transaction3 = null;

    const t1 = this.getTransaction(0);
    const t2 = this.getTransaction(1);
    const t3 = this.getTransaction(2);

    const balance = this.getBalance();

    // if t's arn't null, then append amount to the name
    if(t1)
      transaction1 = t1.name + ": $" + t1.amount;
    if(t2)
      transaction2 = t2.name + ": $" + t2.amount;
    if(t3)
      transaction3 = t3.name + ": $" + t3.amount;

    document.getElementById("BalanceTotal").textContent = "$" + balance.toFixed(2);
      // print balance to BalanceTotal

    // if the transaction isn't null, print to list
    if(transaction1)
      document.getElementById("t1").textContent = transaction1;
    if(transaction2)
      document.getElementById("t2").textContent = transaction2;
    if(transaction3)
      document.getElementById("t3").textContent = transaction3;
  }

// SEARCH FUNCTIONS-------------------------------
  setupSearch(){
    // function checks for search bar and sends contents to filterTransactions()

    const searchInput = document.getElementById("transactionSearch");

    if (!searchInput) {
      return; // if the search object doesn't exist (user on home page), quit function
    }

    searchInput.addEventListener("input", () => { // listens for every addition and deletion in search bar
      this.filterTransactions(searchInput.value); // sends search condition to filter transactions
    });
  }

  filterTransactions(searchTerm = ""){
    // filters out transactions that do not include search term
    // if search bar is empty, show all

    const items = document.querySelectorAll(".transaction-item"); // gets all transactions, stores in items
    const normalizedSearch = searchTerm.toLowerCase().trim();
      // sets search value to lowercase
      // trim empty spaces on front and back

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
        // concatinates all text in transaction
        // name + price + description

      if (text.includes(normalizedSearch)) { // if transaction includes the search term
        item.style.display = ""; // show it
      } else {
        item.style.display = "none";
      }
    });
  }
//-----------------------------------------------------

  updateUI() {
    // gets reference to TransactionList and Balance
    const list = document.getElementById("transactionList");
    const balance = document.getElementById("balance");
    const searchInput = document.getElementById("transactionSearch"); // Search bar

    if(!list || !balance) {
      return;
    }

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

    if (searchInput){
      this.filterTransactions(searchInput.value);
    }
      // calls the getBalance function, displays at 2 decimal places
  }
}

window.tracker = new FinancialTracker(); // tracker instance
