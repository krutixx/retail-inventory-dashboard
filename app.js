// 1. SELECT ELEMENTS
// We need to tell JS which HTML parts we are talking about.
const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const emptyMsg = document.getElementById('empty-msg');

// 2. LOAD DATA FROM LOCALSTORAGE
// When the page loads, check if we have saved products.
// JSON.parse turns the text back into a real JS Array.
let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to display products on the screen
function renderProducts() {
    // Clear the current list so we don't have duplicates
    productList.innerHTML = '';

    // Check if we have any products
    if (products.length === 0) {
        emptyMsg.style.display = 'block'; // Show "No products" message
    } else {
        emptyMsg.style.display = 'none';  // Hide message
    }

    // Loop through each product and create a Table Row (tr)
    products.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td><span class="badge bg-secondary">${product.category}</span></td>
            <td>₹${product.price}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        // Add the row to the table body
        productList.appendChild(row);
    });
}

// 3. ADD A NEW PRODUCT
productForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop the form from refreshing the page

    // Get values from the input boxes
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = document.getElementById('productPrice').value;

    // Create a product object
    const newProduct = {
        name: name,
        category: category,
        price: price
    };

    // Add to our list
    products.push(newProduct);

    // Save to LocalStorage (Turn array into text)
    localStorage.setItem('products', JSON.stringify(products));

    // Update the screen
    renderProducts();

    // Clear the form inputs
    productForm.reset();
});

// 4. DELETE A PRODUCT
// This function is called when you click the Trash icon
window.deleteProduct = function(index) {
    // Remove 1 item at the specific index
    products.splice(index, 1);

    // Save the new list to LocalStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Update the screen
    renderProducts();
};

// Run this once when page loads to show saved items
renderProducts();