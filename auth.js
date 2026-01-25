const API_BASE = "https://expense-tracker-backend-5eoz.onrender.com/api";

/* ✅ LOGIN */
async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);

    alert("Login Successful!");
    window.location.href = "index.html";
  } else {
    alert(data.msg || "Login Failed!");
  }
}

/* ✅ SIGNUP */
async function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (data.msg || data.errors === undefined) {
    alert("Signup Successful! Please login.");
    window.location.href = "login.html";
  } else {
    alert("Signup Failed!");
  }
}
