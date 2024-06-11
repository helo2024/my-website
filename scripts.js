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
//        event.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

//        var username = document.getElementById('login-username').value;
//        var password = document.getElementById('login-password').value;

//        // ����û���Ϣ
//        var users = JSON.parse(localStorage.getItem('users')) || [];
//        var user = users.find(function (user) {
//            return user.username === username && user.password === password;
//        });

//        if (username === 'admin' && password === 'admin123') {
//            alert('Admin login successful!');
//            // ��ʾ����ע���û���Ϣ
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
//        event.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

//        var username = document.getElementById('register-username').value;
//        var password = document.getElementById('register-password').value;

//        // ����û��Ƿ��Ѵ���
//        var users = JSON.parse(localStorage.getItem('users')) || [];
//        var userExists = users.some(function (user) {
//            return user.username === username;
//        });

//        if (userExists) {
//            alert('Username already exists!');
//        } else {
//            // �����û���Ϣ��localStorage
//            users.push({ username: username, password: password });
//            localStorage.setItem('users', JSON.stringify(users));
//            alert('Registration successful!');
//            // ע��ɹ�����ʾ��¼��
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

    // ����Ƿ����û��ѵ�¼���ѵ�¼�Ļ�ֱ����ת��dashboard
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
        event.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

        var username = document.getElementById('login-username').value;
        var password = document.getElementById('login-password').value;

        // ����û���Ϣ
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var user = users.find(function (user) {
            return user.username === username && user.password === password;
        });

        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('loggedInUser', 'admin'); // �����¼�û���Ϣ
            alert('Admin login successful!');
            // ��ʾ����ע���û���Ϣ
            var userList = 'Registered Users:\n\n';
            users.forEach(function (user) {
                userList += 'Username: ' + user.username + '\n';
            });
            alert(userList);
            window.location.href = 'dashboard.html';
        } else if (user) {
            localStorage.setItem('loggedInUser', username); // �����¼�û���Ϣ
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password.');
        }
    });

    document.getElementById('register-form').addEventListener('submit', function (event) {
        event.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

        var username = document.getElementById('register-username').value;
        var password = document.getElementById('register-password').value;

        // ����û��Ƿ��Ѵ���
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var userExists = users.some(function (user) {
            return user.username === username;
        });

        if (userExists) {
            alert('Username already exists!');
        } else {
            // �����û���Ϣ��localStorage
            users.push({ username: username, password: password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
            // ע��ɹ�����ʾ��¼��
            loginContainer.style.display = 'block';
            registerContainer.style.display = 'none';
        }
    });
});