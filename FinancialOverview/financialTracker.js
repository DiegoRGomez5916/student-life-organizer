class FinancialTracker {
  constructor() {
    this.transactions = [];
  }

  addTransaction() {
    const name = prompt("Transaction Name:");
    const amount = parseFloat(prompt("Enter Income or Expense (+ or -):"));

    this.transactions.push({ name, amount });

    this.updateUI();
  }

  getBalance() {
    let total = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      total += this.transactions[i].amount;
    }

    return total;
  }

  updateUI() {
    const list = document.getElementById("transactionList");
    const balance = document.getElementById("balance");

    list.innerHTML = "";

    for (let i = 0; i < this.transactions.length; i++) {
      const t = this.transactions[i];

      const li = document.createElement("li");
      li.textContent = t.name + ": $" + t.amount;

      list.appendChild(li);
    }

    balance.textContent = "Total Balance:" + this.getBalance();
  }
}

window.tracker = new FinancialTracker();
