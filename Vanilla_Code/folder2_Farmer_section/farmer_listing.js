document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const type = document.getElementById('productType').value;
    const quality = document.getElementById('Quality').value;
    const duration = document.getElementById('productDuration').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').files[0];

    if (image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const productData = document.getElementById('productData');
            const newData = document.createElement('div');
            newData.classList.add('product-item');
            newData.innerHTML = `
                <img src="${e.target.result}" alt="${name}">
                <span>
                    <strong>Product Name:</strong> ${name} <br> <br>
                    <strong>Type:</strong> ${type} <br> <br>
                    <strong>Quality:</strong> ${quality} <br> <br>
                    <strong>Time Duration:</strong> ${duration} days <br> <br>
                    <strong>Price:</strong> ₹${price}
                </span>`;
            productData.appendChild(newData);
        };
        reader.readAsDataURL(image);
    }
    document.getElementById('productForm').reset();
});