const data = JSON.parse(localStorage.getItem("orderData"));

if (!data) {
    alert("No order found");
    window.location.href = "checkout.html";
}

// price & qty
const price = Number(data.price);
const qty = Number(data.quantity);
const deliveryCharge = 45;
const total = (price * qty) + deliveryCharge;

// product
document.getElementById("bookImage").src = data.image;
document.getElementById("bookName").innerText =
    data.bookName + " (x" + qty + ")";

document.getElementById("price").innerText =
    "Price : ₹" + price + " × " + qty;

document.getElementById("delivery").innerText =
    "Delivery Charge : ₹" + deliveryCharge;

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



function goToPayment() {
    const data = JSON.parse(localStorage.getItem("orderData"));

    if (!data) {
        alert("Order data missing");
        return;
    }

    const amount = (Number(data.price) * Number(data.quantity)) + 45;

    // save total
    data.total = amount;

    // 🔹 Google Apps Script URL
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyHTqSKSbeeT8otqj_3Yhk2wFPjI1mRKokc0lImwccR_9DSic5AfxuSG9b9ykSS1F2R/exec";

    // 🔹 Save order → Sheet + Email
    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {

        console.log("Order saved", response);

        localStorage.setItem("paymentInitiated", "yes");

        // 🔹 UPI DETAILS
        const upiId = "safumk99@okhdfcbank";
        const payeeName = "Alif Books";
        const note = "Book Purchase";

        const upiUrl =
            `upi://pay?pa=${upiId}` +
            `&pn=${encodeURIComponent(payeeName)}` +
            `&am=${amount}` +
            `&cu=INR` +
            `&tn=${encodeURIComponent(note)}`;

        // 🔹 Redirect to Google Pay
        window.location.href = upiUrl;
    })
    .catch(err => {
        console.error(err);
        alert("Order save failed. Try again.");
    });
}
window.onload = function () {

  const paymentDone = localStorage.getItem("paymentInitiated");

  if (paymentDone === "yes") {
    // hide red note
    document.getElementById("paymentNote").style.display = "none";

    // show whatsapp button
    document.getElementById("whatsappBtn").style.display = "block";
  }

};