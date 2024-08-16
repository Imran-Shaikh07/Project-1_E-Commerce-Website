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

//cart

// cart.js
const cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productElement = button.closest('.product');
      const productId = productElement.getAttribute('data-id');
      const productName = productElement.querySelector('h2').textContent;
      const productPrice = parseFloat(productElement.querySelector('span').textContent.replace('Price: $', ''));
      
      addToCart(productId, productName, productPrice);
    });
  });

  document.getElementById('checkout').addEventListener('click', () => {
    // Handle checkout logic here
    // e.g., send cart data to server
    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart })
    }).then(response => response.json())
      .then(data => {
        console.log('Checkout successful', data);
      });
  });
});

function addToCart(id, name, price) {
  const existingProductIndex = cart.findIndex(item => item.id === id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  const cartItemsElement = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  cartItemsElement.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
    cartItemsElement.appendChild(li);

    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = total.toFixed(2);
}


document.addEventListener('DOMContentLoaded', function() {
  const cartButton = document.querySelector('.add-to-cart');

  cartButton.addEventListener('click', function() {
    cartButton.classList.add('pulse');

    
    cartButton.addEventListener('animationend', function() {
      cartButton.classList.remove('pulse');
    }, { once: true });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.querySelector('.video-container');
  const playButton = document.querySelector('.play-button');
  const videoPlaceholder = document.getElementById('video-placeholder');

  playButton.addEventListener('click', function() {
      const videoId = 'dQw4w9WgXcQ'; // Replace with your YouTube video ID
      const iframe = document.createElement('iframe');

      iframe.setAttribute('src', `https://youtu.be/NYpkCxyOfWA?si=wHMN_e2C4qOv_ceb`);
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '315');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', true);

      // Replace the thumbnail with the video player
      videoPlaceholder.appendChild(iframe);

      // Hide the video container
      videoContainer.style.display = 'none';
  });
});
