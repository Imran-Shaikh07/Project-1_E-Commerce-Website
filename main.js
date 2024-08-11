// active bar
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function() {
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("scroll-on");
    }
    else{
        nav.classList.remove("scroll-on");
    }
}

// nav hide
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse .collapse");
navBar.forEach(function(a){
    a.addEventListener("click",function(){
        navCollapse.classList.remove("show");
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('filter-form');
    const productList = document.getElementById('products');
    const products = Array.from(productList.getElementsByClassName('item-product'));
    const reviewForm = document.getElementById('review-form');
    const reviewFormElement = document.getElementById('reviewForm');
    const productIdInput = document.getElementById('productId');
    const cancelButton = document.getElementById('cancelReview');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const category = document.getElementById('category').value.toLowerCase();
        const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
        const sort = document.getElementById('sort').value;

        const filteredProducts = products.filter(product => {
            const productName = product.querySelector('h2').innerText.toLowerCase();
            const productPrice = parseFloat(product.getAttribute('data-price'));
            return productName.includes(category) && productPrice >= minPrice && productPrice <= maxPrice;
        });

        filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            if (sort === 'asc') return priceA - priceB;
            if (sort === 'desc') return priceB - priceA;
            return 0;
        });

        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            productList.appendChild(product);
        });
    });

    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('review-btn')) {
            const productId = event.target.getAttribute('data-id');
            productIdInput.value = productId;
            reviewForm.style.display = 'block';
        }
    });

    cancelButton.addEventListener('click', () => {
        reviewForm.style.display = 'none';
    });

    reviewFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const productId = productIdInput.value;
        const reviewText = document.getElementById('reviewText').value;
        const rating = document.getElementById('rating').value;

        // Here you would typically send the review to the server.
        alert(`Review submitted for product ID ${productId}:\nRating: ${rating}\nReview: ${reviewText}`);

        // Hide the review form after submission
        reviewForm.style.display = 'none';
    });
});