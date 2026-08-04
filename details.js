const data = JSON.parse(localStorage.getItem("orderData"));

if (!data) {
    alert("No order found");
    window.location.href = "checkout.html";
}

// price & qty
const price = Number(data.price);
const qty = Number(data.quantity);
const total = (price * qty) ;

// product
document.getElementById("bookImage").src = data.image;
document.getElementById("bookName").innerText =
    data.bookName + " (x" + qty + ")";

document.getElementById("price").innerText =
    "Price : ₹ " + price + " × " + qty;

document.getElementById("total").innerText =
    "Total : ₹" + total;

// address
document.getElementById("name").innerText = "Name : " + data.name;
document.getElementById("address").innerText = "Address : " + data.address;
document.getElementById("landmark").innerText = "Landmark : " + data.landmark;
document.getElementById("phone").innerText = "Phone : " + data.phone;
document.getElementById("whatsapp").innerText = "WhatsApp : " + data.whatsapp;
document.getElementById("pincode").innerText = "Pincode : " + data.pincode;

function changeAddress() {
    window.location.href = "checkout.html";
}



const scriptURL =
"https://script.google.com/macros/s/AKfycbzOurowKoyzlLl6WEBH_zLTaTZUmvyH-ot4oAY9xx1EXhF2V-9j3ZU5KC66IaxH-OEQ/exec";

function confirmOrder() {
    const btn = document.getElementById("confirmBtn");

    btn.disabled = true;
    btn.innerText = "Confirming...";

    const data = JSON.parse(localStorage.getItem("orderData"));

    if (!data) {
        alert("Order data missing.");
        return;
    }

    // Total ചേർക്കുക
    data.total = Number(data.price) * Number(data.quantity);

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {

        console.log("Order Saved", response);

        alert(
            "Your order has been confirmed successfully.\n\nOur team will contact you shortly to complete your order.\n\nThank you for choosing Alif Books."
        );

        localStorage.removeItem("orderData");

        window.location.href = "home.html";
    })
    .catch(error => {
        console.error(error);
        btn.disabled = false;
        btn.innerText = "Confirm Order";
        alert("Failed to confirm your order. Please try again.");
    });

}