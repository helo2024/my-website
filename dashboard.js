document.addEventListener('DOMContentLoaded', function () {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
    }

    var isAdmin = loggedInUser === 'admin';
    if (isAdmin) {
        document.getElementById('view-users').style.display = 'inline';
    }

    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    document.getElementById('sign-in').addEventListener('click', function () {
        var signInKey = 'signIn_' + loggedInUser;
        var today = new Date().toISOString().split('T')[0];
        localStorage.setItem(signInKey, today);
        alert('Signed in successfully!');
    });

    document.getElementById('create-content').addEventListener('click', function () {
        document.getElementById('create-content-section').style.display = 'block';
        document.getElementById('view-content-section').style.display = 'none';
        document.getElementById('view-users-section').style.display = 'none';
    });

    document.getElementById('view-content').addEventListener('click', function () {
        document.getElementById('create-content-section').style.display = 'none';
        document.getElementById('view-content-section').style.display = 'block';
        document.getElementById('view-users-section').style.display = 'none';
        loadContentList(loggedInUser);
    });

    document.getElementById('view-users').addEventListener('click', function () {
        document.getElementById('create-content-section').style.display = 'none';
        document.getElementById('view-content-section').style.display = 'none';
        document.getElementById('view-users-section').style.display = 'block';
        loadUserList();
    });

    document.getElementById('create-content-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var date = document.getElementById('content-date').value;
        var text = document.getElementById('content-text').value;
        var imageFile = document.getElementById('content-image').files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            var imageData = reader.result;
            saveContent(loggedInUser, date, text, imageData);
            alert('Content saved successfully!');
        };
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            saveContent(loggedInUser, date, text, null);
            alert('Content saved successfully!');
        }
    });

    function saveContent(username, date, text, imageData) {
        var key = 'content_' + username + '_' + date;
        var content = { text: text, image: imageData };
        localStorage.setItem(key, JSON.stringify(content));
    }

    function loadContentList(username) {
        var contentList = document.getElementById('content-list');
        contentList.innerHTML = '';
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith('content_' + username)) {
                var date = key.split('_')[2];
                var listItem = document.createElement('li');
                var link = document.createElement('a');
                link.href = '#';
                link.innerText = date;
                link.addEventListener('click', function (event) {
                    var date = event.target.innerText;
                    viewContent(username, date);
                });
                listItem.appendChild(link);
                contentList.appendChild(listItem);
            }
        }
    }

    function viewContent(username, date) {
        var key = 'content_' + username + '_' + date;
        var content = JSON.parse(localStorage.getItem(key));
        if (content) {
            var contentSection = document.getElementById('content');
            contentSection.innerHTML = '';
            var heading = document.createElement('h2');
            heading.innerText = 'Content for ' + date;
            contentSection.appendChild(heading);
            var paragraph = document.createElement('p');
            paragraph.innerText = content.text;
            contentSection.appendChild(paragraph);
            if (content.image) {
                var image = document.createElement('img');
                image.src = content.image;
                image.style.maxWidth = '400px';
                contentSection.appendChild(image);
            }
        }
    }

    function loadUserList() {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var userList = document.getElementById('user-list');
        userList.innerHTML = '';
        users.forEach(function (user) {
            var username = user.username;
            var userItem = document.createElement('li');
            var userInfo = document.createElement('span');
            var signInKey = 'signIn_' + username;
            var signInDate = localStorage.getItem(signInKey) || 'Not signed in';
            userInfo.innerText = username + ' - Signed in: ' + signInDate;
            userItem.appendChild(userInfo);

            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.startsWith('content_' + username)) {
                    var date = key.split('_')[2];
                    var dateLink = document.createElement('a');
                    dateLink.href = '#';
                    dateLink.innerText = date;
                    dateLink.style.marginLeft = '10px';
                    dateLink.addEventListener('click', function (event) {
                        var date = event.target.innerText;
                        viewOtherUserContent(username, date);
                    });
                    userItem.appendChild(dateLink);
                }
            }

            userList.appendChild(userItem);
        });
    }

    function viewOtherUserContent(username, date) {
        var key = 'content_' + username + '_' + date;
        var content = JSON.parse(localStorage.getItem(key));
        if (content) {
            var contentSection = document.getElementById('content');
            contentSection.innerHTML = '';
            var heading = document.createElement('h2');
            heading.innerText = 'Content for ' + date + ' by ' + username;
            contentSection.appendChild(heading);
            var paragraph = document.createElement('p');
            paragraph.innerText = content.text;
            contentSection.appendChild(paragraph);
            if (content.image) {
                var image = document.createElement('img');
                image.src = content.image;
                image.style.maxWidth = '400px';
                contentSection.appendChild(image);
            }
        }
    }
});