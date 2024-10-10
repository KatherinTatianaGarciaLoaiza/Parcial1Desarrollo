export default class User {
    constructor(firstName, lastName, email, photo, phone, jobTitle, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.photo = photo;
        this.phone = phone;
        this.jobTitle = jobTitle;
    }

    static async postUser(user) {
        const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            if (response.status === 422) {
                const errorData = await response.json();
                throw new Error(`Error ${errorData.code}: ${errorData.message}`);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } else {
            const data = await response.json();
            return data;
        }
    }

    static async putUser(user, id) {
        const response = await fetch(`http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });        
        if (!response.ok) {
            if (response.status === 422) {
                const errorData = await response.json();
                throw new Error(`Error ${errorData.code}: ${errorData.message}`);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } else {
            const data = await response.json();
            return data;
        }
    }

    static async getUsers() {
            const response = await fetch(`http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                return data;
            }
        }
}