function sendMail() {
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (!email || !message) {
        errorMsg.style.color = "red";
        errorMsg.textContent = "Please fill in both fields.";
        return;
    }
    errorMsg.textContent = "";

    fetch("http://localhost:2000/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            name: "Your name",
            message: message
        })
    })
    .then(response => {
        if (response.ok) {
            errorMsg.style.color = "green";
            errorMsg.textContent = "Email sent successfully!";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        } else {
            return response.text().then(errorText => {
                errorMsg.style.color = "red";
                errorMsg.textContent = "Failed to send: " + errorText;
            });
        }
    })
    .catch(err => {
        errorMsg.style.color = "red";
        errorMsg.textContent = "Error: " + err.message;
    });
}

document.getElementById("email").addEventListener("focus", () => {
    document.getElementById("error-msg").textContent = "";
});
document.getElementById("message").addEventListener("focus", () => {
    document.getElementById("error-msg").textContent = "";
});