export default class App {
    constructor() {
        this.allProducts = [];
        console.log('App inicializada');
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener("submit", this.#getuser);
        }

        const filtroForm = document.getElementById('filtro-form');
        if (filtroForm) {
            filtroForm.addEventListener('submit', this.#applyFilters);
        }
        this.#fetchProducts();
    }

    #getuser = async (ev) => {
        ev.preventDefault();
        const email_user = document.getElementById('email').value;
        const password_user = document.getElementById('password').value;
        try {
            const response = await fetch('http://localhost:8081/users/login', {
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
    }

    #fetchProducts = async () => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await fetch('http://localhost:8081/products/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                this.allProducts = await response.json();
                this.#renderProducts(this.allProducts);
            } else {
                console.error('Error fetching products');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    #renderProducts = (products) => {
        console.log(products);
        const productContainer = document.getElementById('productsList');
        productContainer.innerHTML = '';
        try { 
            products.forEach(product => {
                const productCard = document.createElement('li');
                productCard.className = 'producto-container';

                const name_product = document.createElement('h2');
                name_product.textContent = product.name_product;

                const price_product = document.createElement('p');
                price_product.textContent = `Precio: $${product.price_product}`;

                const deleteProduct = document.createElement('button');
                deleteProduct.textContent = 'Eliminar';

                productCard.appendChild(name_product);
                productCard.appendChild(document.createElement('br'));
                productCard.appendChild(price_product);
                productCard.appendChild(deleteProduct);

                productContainer.appendChild(productCard);
            });
        } catch (error) {
            alert('Error obteniendo los productos:', error);
            console.error('Error obteniendo los productos:', error);
        }       
    };

    #applyFilters = (event) => {
        event.preventDefault();
        const minPrice = parseFloat(document.getElementById('precio-min').value) || 0;
        const maxPrice = parseFloat(document.getElementById('precio-max').value) || Infinity;
        const filteredProducts = this.allProducts.filter(product =>
            product.price_product >= minPrice && product.price_product <= maxPrice
        );
        this.#renderProducts(filteredProducts);
    };
}