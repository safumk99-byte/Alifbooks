function submitCheckout() {
    
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const landmark = document.getElementById("landmark").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (!name || !address || !phone || !pincode) {
        alert("Please fill all required fields");
        return;
    }

    // book.js already saved this
    const orderData = JSON.parse(localStorage.getItem("orderData"));

    if (!orderData) {
        alert("No book selected");
        return;
    }

    // add address info
    orderData.name = name;
    orderData.address = address;
    orderData.landmark = landmark;
    orderData.phone = phone;
    orderData.whatsapp = whatsapp;
    orderData.pincode = pincode;

    localStorage.setItem("orderData", JSON.stringify(orderData));

    window.location.href = "order-details.html";
}