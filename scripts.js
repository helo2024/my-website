//document.addEventListener('DOMContentLoaded', function () {
//    var loginContainer = document.getElementById('login-container');
//    var registerContainer = document.getElementById('register-container');
//    var showRegister = document.getElementById('show-register');
//    var showLogin = document.getElementById('show-login');

//    showRegister.addEventListener('click', function (event) {
//        event.preventDefault();
//        loginContainer.style.display = 'none';
//        registerContainer.style.display = 'block';
//    });

//    showLogin.addEventListener('click', function (event) {
//        event.preventDefault();
//        loginContainer.style.display = 'block';
//        registerContainer.style.display = 'none';
//    });

//    document.getElementById('login-form').addEventListener('submit', function (event) {
//        event.preventDefault(); // 阻止表单默认提交行为

//        var username = document.getElementById('login-username').value;
//        var password = document.getElementById('login-password').value;

//        // 检查用户信息
//        var users = JSON.parse(localStorage.getItem('users')) || [];
//        var user = users.find(function (user) {
//            return user.username === username && user.password === password;
//        });

//        if (username === 'admin' && password === 'admin123') {
//            alert('Admin login successful!');
//            // 显示所有注册用户信息
//            var userList = 'Registered Users:\n\n';
//            users.forEach(function (user) {
//                userList += 'Username: ' + user.username + '\n';
//            });
//            alert(userList);
//        } else if (user) {
//            alert('Login successful!');
//        } else {
//            alert('Invalid username or password.');
//        }
//    });

//    document.getElementById('register-form').addEventListener('submit', function (event) {
//        event.preventDefault(); // 阻止表单默认提交行为

//        var username = document.getElementById('register-username').value;
//        var password = document.getElementById('register-password').value;

//        // 检查用户是否已存在
//        var users = JSON.parse(localStorage.getItem('users')) || [];
//        var userExists = users.some(function (user) {
//            return user.username === username;
//        });

//        if (userExists) {
//            alert('Username already exists!');
//        } else {
//            // 保存用户信息到localStorage
//            users.push({ username: username, password: password });
//            localStorage.setItem('users', JSON.stringify(users));
//            alert('Registration successful!');
//            // 注册成功后显示登录表单
//            loginContainer.style.display = 'block';
//            registerContainer.style.display = 'none';
//        }
//    });
//});

document.addEventListener('DOMContentLoaded', function () {
    var loginContainer = document.getElementById('login-container');
    var registerContainer = document.getElementById('register-container');
    var showRegister = document.getElementById('show-register');
    var showLogin = document.getElementById('show-login');

    // 检查是否有用户已登录，已登录的话直接跳转到dashboard
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href = 'dashboard.html';
    }

    showRegister.addEventListener('click', function (event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLogin.addEventListener('click', function (event) {
        event.preventDefault();
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    });

    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault(); // 阻止表单默认提交行为

        var username = document.getElementById('login-username').value;
        var password = document.getElementById('login-password').value;

        // 检查用户信息
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var user = users.find(function (user) {
            return user.username === username && user.password === password;
        });

        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('loggedInUser', 'admin'); // 保存登录用户信息
            alert('Admin login successful!');
            // 显示所有注册用户信息
            var userList = 'Registered Users:\n\n';
            users.forEach(function (user) {
                userList += 'Username: ' + user.username + '\n';
            });
            alert(userList);
            window.location.href = 'dashboard.html';
        } else if (user) {
            localStorage.setItem('loggedInUser', username); // 保存登录用户信息
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password.');
        }
    });

    document.getElementById('register-form').addEventListener('submit', function (event) {
        event.preventDefault(); // 阻止表单默认提交行为

        var username = document.getElementById('register-username').value;
        var password = document.getElementById('register-password').value;

        // 检查用户是否已存在
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var userExists = users.some(function (user) {
            return user.username === username;
        });

        if (userExists) {
            alert('Username already exists!');
        } else {
            // 保存用户信息到localStorage
            users.push({ username: username, password: password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
            // 注册成功后显示登录表单
            loginContainer.style.display = 'block';
            registerContainer.style.display = 'none';
        }
    });
});