document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // 检查用户是否已存在
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var userExists = users.some(function(user) {
        return user.username === username;
    });

    if (userExists) {
        alert('Username already exists!');
    } else {
        // 保存用户信息到localStorage
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href = 'login.html'; // 注册成功后跳转到登录页面
    }
});