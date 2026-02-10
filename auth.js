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
    showModal("Success", "Login Successful!");
    setTimeout(() => {
      window.location.href = "index.html";
      }, 1500);
  } else {
    showModal("Failed","Invalid Credentials!");
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
    showModal("Signup Successful! Please login.");
    window.location.href = "login.html";
  } else {
    showModal("Signup Failed!");
  }
}

function togglePassword(inputId, iconSpan) {
  const input = document.getElementById(inputId);
  const icon = iconSpan.querySelector("i");

  if (input.type === "password") {
    input.type = "text";

    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";

    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
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


/* ✅ Forgot Password */
async function forgotPassword(event) {
  event.preventDefault();

  const email = document.getElementById("forgotEmail").value;

  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  showModal("Reset Link ✅", data.msg);

  if (data.resetLink) {
    console.log("Reset Link:", data.resetLink);
  }
}


/* ✅ Reset Password */
async function resetPassword(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const newPassword = document.getElementById("newPassword").value;

  const res = await fetch(`${API_BASE}/auth/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newPassword })
  });

  const data = await res.json();

  showModal("Success ✅", data.msg);

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}
