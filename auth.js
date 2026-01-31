const API_BASE = "https://expense-tracker-backend-5eoz.onrender.com/api"; //render api

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
    showDialog("Success ✅", "Login Successful!");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
    
  } else {
    showDialog(data.msg || "Login Failed!");
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
    showDialog("Signup Successful! Please login.");
    window.location.href = "login.html";
  } else {
    showDialog("Signup Failed!");
  }
}

function togglePassword() {
  const field = document.getElementById("password");

  field.type = field.type === "password" ? "text" : "password";
}

/* ✅ Premium Modal Functions */
function showModal(title, message) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalText").innerText = message;

  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
