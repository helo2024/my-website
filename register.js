document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // ����û��Ƿ��Ѵ���
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var userExists = users.some(function(user) {
        return user.username === username;
    });

    if (userExists) {
        alert('Username already exists!');
    } else {
        // �����û���Ϣ��localStorage
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href = 'login.html'; // ע��ɹ�����ת����¼ҳ��
    }
});