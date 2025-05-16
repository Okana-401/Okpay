let user = localStorage.getItem("okpayUser");

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    localStorage.setItem("okpayUser", username);
    localStorage.setItem("okpayBalance", "10000");
    localStorage.setItem("okpayTransactions", "[]");
    loadDashboard();
  }
}

function logout() {
  localStorage.removeItem("okpayUser");
  location.reload();
}

function loadDashboard() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  
  const username = localStorage.getItem("okpayUser");
  document.getElementById("welcome").innerText = `Welcome, ${username}`;
  document.getElementById("balance").innerText = localStorage.getItem("okpayBalance");

  const transactions = JSON.parse(localStorage.getItem("okpayTransactions") || "[]");
  const list = document.getElementById("transactions");
  list.innerHTML = "";
  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.innerText = tx;
    list.appendChild(li);
  });
}

function sendMoney() {
  let balance = parseInt(localStorage.getItem("okpayBalance"));
  balance -= 1000;
  localStorage.setItem("okpayBalance", balance);
  updateTransactions("Mandefa vola: -1000 Ar");
  loadDashboard();
}

function withdrawMoney() {
  let balance = parseInt(localStorage.getItem("okpayBalance"));
  balance += 2000;
  localStorage.setItem("okpayBalance", balance);
  updateTransactions("Maka vola: +2000 Ar");
  loadDashboard();
}

function updateTransactions(desc) {
  let tx = JSON.parse(localStorage.getItem("okpayTransactions") || "[]");
  tx.unshift(`${new Date().toLocaleString()} - ${desc}`);
  localStorage.setItem("okpayTransactions", JSON.stringify(tx));
}

if (user) loadDashboard();
