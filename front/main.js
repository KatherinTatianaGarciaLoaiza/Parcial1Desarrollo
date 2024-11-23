import App from './resources/modules/app.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email_user = document.getElementById('email').value;
            const password_user = document.getElementById('password').value;
            try {
                const response = await fetch('http://localhost:8081/users/login ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email_user, password_user })
                });
                console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    alert('Inicio de sesion exitoso.');
                    localStorage.setItem('jwt_token', data.token);
                    window.location.href = 'productos.html';
                } else {
                    document.getElementById('login-error').style.display = 'block';
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('login-error').style.display = 'block';
            }
        });
    }

    let allProducts = [];

    // Fetch and display products
    const fetchProducts = async () => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await fetch('http://localhost:8081/products/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                allProducts = await response.json();
                renderProducts(allProducts);
            } else {
                console.error('Error fetching products');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderProducts = (products) => {
        const productContainer = document.getElementById('producto-container');
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h2>${product.name_product}</h2>
                <p>${product.category_product}</p>
                <p>Precio: $${product.price_product}</p>
            `;
            productContainer.appendChild(productCard);
        });
    };

    // Handle filter form submission
    const filtroForm = document.getElementById('filtro-form');
    filtroForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const minPrice = parseFloat(document.getElementById('precio-min').value) || 0;
        const maxPrice = parseFloat(document.getElementById('precio-max').value) || Infinity;
        const filteredProducts = allProducts.filter(product =>
            product.price_product >= minPrice && product.price_product <= maxPrice
        );
        renderProducts(filteredProducts);
    });

    fetchProducts();
});

const app = () => new App();
app();