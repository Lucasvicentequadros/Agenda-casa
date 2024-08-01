const adminUser = {
    username: 'LucasVicente',
    password: 'Polarr309#',
    email: 'admin@example.com' // Placeholder email for the admin
};

const users = [adminUser];
const services = [];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById('login-message').textContent = 'Login successful!';
        document.getElementById('login-container').style.display = 'none';

        if (user.username === adminUser.username) {
            document.getElementById('admin-container').style.display = 'block';
        } else {
            document.getElementById('scheduler-container').style.display = 'block';
            document.getElementById('calendar-container').style.display = 'block';
        }
    } else {
        document.getElementById('login-message').textContent = 'Invalid username or password';
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const newEmail = document.getElementById('new-email').value;

    const newUser = { username: newUsername, password: newPassword, email: newEmail };
    users.push(newUser);

    document.getElementById('register-message').textContent = 'User created successfully!';
});

document.getElementById('serviceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceDate = document.getElementById('service-date').value;
    const serviceDescription = document.getElementById('service-description').value;

    const newService = { date: serviceDate, description: serviceDescription, user: 'LucasVicente' }; // Placeholder user
    services.push(newService);

    document.getElementById('service-message').textContent = 'Service added successfully!';
    renderServices();
});

document.addEventListener('DOMContentLoaded', function() {
    $('#calendar').fullCalendar({
        events: services.map(service => ({
            title: service.description,
            start: service.date
        }))
    });
});

function renderServices() {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '';

    services.forEach((service, index) => {
        const serviceItem = document.createElement('div');
        serviceItem.textContent = `Date: ${service.date}, Description: ${service.description}, User: ${service.user}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            services.splice(index, 1);
            renderServices();
        });
        
        serviceItem.appendChild(removeButton);
        servicesList.appendChild(serviceItem);
    });

    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', services.map(service => ({
        title: service.description,
        start: service.date
    })));
}