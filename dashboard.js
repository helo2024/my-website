document.addEventListener('DOMContentLoaded', async function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
    }

    const isAdmin = loggedInUser === 'admin';
    if (isAdmin) {
        document.getElementById('view-users').style.display = 'inline';
        loadUserList();
    }

    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    document.getElementById('sign-in').addEventListener('click', async function () {
        const response = await fetch('http://localhost:3000/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: loggedInUser })
        });

        if (response.ok) {
            alert('Signed in successfully!');
        } else {
            alert('Sign in failed.');
        }
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
        const date = document.getElementById('content-date').value;
        const text = document.getElementById('content-text').value;
        const imageFile = document.getElementById('content-image').files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            const imageData = reader.result;
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
        const key = 'content_' + username + '_' + date;
        const content = { text: text, image: imageData };
        localStorage.setItem(key, JSON.stringify(content));
    }

    function loadContentList(username) {
        const contentList = document.getElementById('content-list');
        contentList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('content_' + username)) {
                const date = key.split('_')[2];
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.innerText = date;
                link.addEventListener('click', function (event) {
                    const date = event.target.innerText;
                    viewContent(username, date);
                });
                listItem.appendChild(link);
                contentList.appendChild(listItem);
            }
        }
    }

    function viewContent(username, date) {
        const key = 'content_' + username + '_' + date;
        const content = JSON.parse(localStorage.getItem(key));
        if (content) {
            const contentSection = document.getElementById('content');
            contentSection.innerHTML = '';
            const heading = document.createElement('h2');
            heading.innerText = 'Content for ' + date;
            contentSection.appendChild(heading);
            const paragraph = document.createElement('p');
            paragraph.innerText = content.text;
            contentSection.appendChild(paragraph);
            if (content.image) {
                const image = document.createElement('img');
                image.src = content.image;
                image.style.maxWidth = '400px';
                contentSection.appendChild(image);
            }
        }
    }

    async function loadUserList() {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        users.forEach(function (user) {
            const username = user.username;
            const userItem = document.createElement('li');
            const userInfo = document.createElement('span');
            const signInDates = user.signInDates.length > 0 ? user.signInDates.join(', ') : 'Not signed in';
            userInfo.innerText = `${username} - Signed in: ${signInDates}`;
            userItem.appendChild(userInfo);

            user.signInDates.forEach(date => {
                const dateLink = document.createElement('a');
                dateLink.href = '#';
                dateLink.innerText = date;
                dateLink.style.marginLeft = '10px';
                dateLink.addEventListener('click', function (event) {
                    const date = event.target.innerText;
                    viewOtherUserContent(username, date);
                });
                userItem.appendChild(dateLink);
            });

            userList.appendChild(userItem);
        });
    }

    function viewOtherUserContent(username, date) {
        const key = 'content_' + username + '_' + date;
        const content = JSON.parse(localStorage.getItem(key));
        if (content) {
            const contentSection = document.getElementById('content');
            contentSection.innerHTML = '';
            const heading = document.createElement('h2');
            heading.innerText = `Content for ${date} by ${username}`;
            contentSection.appendChild(heading);
            const paragraph = document.createElement('p');
            paragraph.innerText = content.text;
            contentSection.appendChild(paragraph);
            if (content.image) {
                const image = document.createElement('img');
                image.src = content.image;
                image.style.maxWidth = '400px';
                contentSection.appendChild(image);
            }
        }
    }
});
