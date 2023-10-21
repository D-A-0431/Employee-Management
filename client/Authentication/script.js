const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

	errorMessage.style.display = "none";

	if (!email.match(emailRegex)) {
        errorMessage.textContent = "Invalid email format";
        errorMessage.style.display = "block";
        return; 
    }

    fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then((data) => {
            console.log(data.status);
            if (data.status === 201) {
                window.location.href = "./Login.html";
            } else if (data.status === 400) {
                errorMessage.textContent = "Email already registered"; 
                errorMessage.style.display = "block";
            }
        })
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

	errorMessage.style.display = "none";

	if (!email.match(emailRegex)) {
        errorMessage.textContent = "Invalid email format";
        errorMessage.style.display = "block";
        return; 
    }

    fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then((data) => {
            console.log(data.status);
            if (data.status === 201) {
                window.location.href = "../client/Employee-Management/index.html";
            } else if (data.status === 403) {
                errorMessage.textContent = "Incorrect Password";
                errorMessage.style.display = "block";
            } else if (data.status === 404) {
                errorMessage.textContent = "User is not registered";
                errorMessage.style.display = "block";
            }
        })
});
