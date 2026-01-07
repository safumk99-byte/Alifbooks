function signup(){

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    if(!name || !username || !password){
        error.innerText = "All fields required";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check existing user
    const exists = users.find(u => u.username === username);
    if(exists){
        error.innerText = "Username already exists";
        return;
    }

    users.push({
        name,
        username,
        password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    window.location.href = "login.html";
}

function login(){

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if(user){
        localStorage.setItem("loggedIn","yes");
        localStorage.setItem("currentUser", username);
        window.location.href = "home.html";
    }else{
        error.innerText = "Invalid username or password";
    }
}