var postStorage = (function () {
    function Post(title, image) {
        this.title = title;
        this.image = image;
        this.description = "";
        this.points = 0;
        this.comments = 0;
        this.category = "";
        this.hashTags = [];
        this.owner = null;
    }

    function PostStorage() {
        if (localStorage.getItem('posts') != null) {
            this.posts = JSON.parse(localStorage.getItem('posts'));
        } else {
            this.posts = [];
        }
    }

    PostStorage.prototype.addPost = function (title, image) {
        if (!(this.posts.find((post) => post.title == title))) {
            var newPost = new Post(title, image);
            this.posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(this.posts));
            return newPost;
        }
    }

    PostStorage.prototype.removePost = function () {
        var index = this.posts.findIndex((post) => post.title == title);

        if (index < 0) {
            throw new Error('No such object with title ' + title);
        } else {
            this.posts.splice(index, 1);
            localStorage.setItem('posts', JSON.stringify(this.posts));
            return this.posts[index].title;
        }
    }

    return new PostStorage();
})();
