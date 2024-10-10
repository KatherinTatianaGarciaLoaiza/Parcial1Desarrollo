import User from "./users.js";

export default class App {
    constructor() {
        this.id = null;

        let buttonPost = document.getElementById("buttonPost");
        buttonPost.addEventListener("click", this.#putOrpost);

        let buttonGet = document.getElementById("buttonGet");
        buttonGet.addEventListener("click", this.#getusersList);
    }

    #putOrpost = async (ev) => {
        ev.preventDefault();
        if (this.id) {
            await this.#putUser(ev);
            this.id = null;
        } else {
            await this.#postUser(ev);
        }
    }

    #putUser = async (ev) => {
        try {
            ev.preventDefault();

            const firstName = document.getElementById("inNombre").value;
            const lastName = document.getElementById("inApellido").value;
            const email = document.getElementById("inCorreo").value;
            const phone = document.getElementById("inCelular").value;
            const jobTitle = document.getElementById("inProfesion").value;
            const photo = document.getElementById("inImage").value;
            const id = this.id;

            const user = new User(firstName, lastName, email, photo, phone, jobTitle);

            const result = await User.putUser(user, id);

            alert('Usuario actualizado con éxito');
            console.log("Usuario actualizado:", result);
        } catch (error) {
            alert('Error al actualizar el usuario');
            console.error("Error al actualizar el usuario:", error);
        }
    }

    #postUser = async (ev) => {
        try {
            ev.preventDefault();

            const firstName = document.getElementById("inNombre").value;
            const lastName = document.getElementById("inApellido").value;
            const email = document.getElementById("inCorreo").value;
            const phone = document.getElementById("inCelular").value;
            const jobTitle = document.getElementById("inProfesion").value;
            const photo = document.getElementById("inImage").value;

            const user = new User(firstName, lastName, email, photo, phone, jobTitle);

            const result = await User.postUser(user);

            alert('Usuario creado con éxito');
            console.log("Usuario creado:", result);
        } catch (error) {
            alert('Error al crear el usuario');
            console.error("Error al crear el usuario:", error);
        }
    }

    #getusersList = async (ev) => {
        console.log('Obteniendo usuarios...');
        ev.preventDefault(); 
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        try {
            const item = document.getElementById("list");
            item.className = 'containerInfo';

            const users = await User.getUsers();
            users.forEach(user => {
                const userItem = document.createElement('li');
                userItem.className = 'userItem-card';

                const userName = document.createElement('p');
                userName.textContent = user.firstName + ' ' + user.lastName;

                const userMail = document.createElement('p');
                userMail.textContent = user.email;

                const userPhone = document.createElement('p');
                userPhone.textContent = user.phone;

                const userJobTitle= document.createElement('p');
                userJobTitle.textContent = user.jobTitle;                

                const userPhoto = document.createElement('img');
                userPhoto.src = user.photo;
                userPhoto.alt = user.firstName + ' ' + user.lastName;

                const putUser = document.createElement('button');
                putUser.textContent = 'Actualizar usuario';
                putUser.addEventListener('click', () => this.#putForm(user));

                userItem.appendChild(userPhoto);
                userItem.appendChild(userName);
                userItem.appendChild(userMail);
                userItem.appendChild(userPhone);
                userItem.appendChild(userJobTitle);     
                userItem.appendChild(putUser);            

                usersList.appendChild(userItem);
            });
        } catch (error) {
            alert('Error obteniendo los usuarios:', error);
            console.error('Error obteniendo los usuarios:', error);
        }
    }

    #putForm(user) {
        document.getElementById('inNombre').value = user.firstName;
        document.getElementById('inApellido').value = user.lastName;
        document.getElementById('inCorreo').value = user.email;
        document.getElementById('inCelular').value = user.phone;
        document.getElementById('inProfesion').value = user.jobTitle;
        document.getElementById('inImage').value = user.photo;
        this.id = user.id;
    }
}
