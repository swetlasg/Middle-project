var userStorage = (function () {

    User.nextId = 0;
    
    function User(username, password) {
        this.id = ++User.nextId;
        this.username = username;
        this.password = password;
        this.postList = [];
    }

    // if (localStorage.getItem('users')) {
    //     var currentUsers = JSON.parse(localStorage.getItem('users'));
    //     User.nextId = currentUsers[currentUsers.length - 1].id;
    // } else {
    //     User.nextId = 0;
    // }

    function UserStorage() {
        if (localStorage.getItem('users') != null) {
            this.users = JSON.parse(localStorage.getItem('users'));
        } else {
            this.users = [];
        }
    }
    UserStorage.prototype.getUserById = function (id) {
        return this.users.find(u => u.id == id);
    }

    UserStorage.prototype.singUp = function (username, password) {
        if (!(this.users.find((user) => user.username == username))) {
            this.users.push(new User(username, password));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    UserStorage.prototype.logIn = function (username, password) {
        var user = this.users.find(function (user) {
            return user.username === username && user.password === password;
        });
        if (user) {
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            return user;
        } else {
            sessionStorage.setItem('loggedUser', null);
            return null;
        }
    }
    UserStorage.prototype.getLoggedUser = function () {
		var loggedUser = sessionStorage.getItem('loggedUser');
		if (loggedUser) {
			return JSON.parse(loggedUser);
		} else {
			return null;
		}
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

    UserStorage.prototype.addNewPost = function (userId, title, image) {
        var user = this.getUserById(userId)
        var newPost = postStorage.addPost(title, image);
        user.postList.push(newPost);
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // UserStorage.prototype.PostComments = function(userId,coment){
    //     var user = this.getUserById(userId);
    //     var c = user.coment.find(com => com.title == coment);
    //     return c.comments;
    // }

    User.prototype.removePost = function () {
        var index = this.postList.findIndex((post) => post.title == title);
        var oldPost = postStorage.removePost();
        if (this.postList[index].title == oldPost) {
            this.postList.splice(index, 1);
        }
    }

    return new UserStorage();
})();