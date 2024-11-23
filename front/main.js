import App from './resources/modules/app.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    console.log("Hola");
    if (loginForm) {
        console.log("Hola2");
        loginForm.addEventListener('submit', async (event) => {
            console.log("Hola3");
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log(email);
            console.log(password);
            try {
                const response = await fetch('http://localhost:8081/users/login ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
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
});

const app = () => new App();
app();