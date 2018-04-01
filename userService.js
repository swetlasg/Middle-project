var userStorage = (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
        this.postList = [];
    }

    function UserStorage() {
        if (localStorage.getItem('users') != null) {
            this.users = JSON.parse(localStorage.getItem('users'));
        } else {
            this.users = [];
        }
    }

    UserStorage.prototype.singUp = function (username, password) {
        if (!(this.users.find((user) => user.username == username))) {
            this.users.push(new User(username, password));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    UserStorage.prototype.logIn = function (username, password) {
        return this.users.find(function (user) {
            return user.username === username && user.password === password;
        }) != null;
    }

    UserStorage.prototype.deleteAccount = function () {
        var index = this.users.findIndex((user) => user.username === username && user.password === password);

        if (index < 0) {
            throw new Error('No such user with username ' + username);
        } else {
            this.users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    User.prototype.addNewPost = function (title, image) {
        var newPost = postStorage.addPost(title, image);
        this.postList.push(newPost);
    }

    User.prototype.removePost = function () {
        var index = this.postList.findIndex((post) => post.title == title);
        var oldPost = postStorage.removePost();
        if (this.postList[index].title == oldPost) {
            this.postList.splice(index, 1);
        }
    }

    return new UserStorage();
})();
