$(function () {
    var isSearching = false;
    var post = [];
    var pushed = false;
    var user;
    // var id = 1;
    var nextId = 0;
    var name;
    var profileName;
    var postEl = '';

    $('#profile-div').hide();
    $('#topMenu-logged').hide();
    $('#upload').hide();
    $('#settings-div').hide();

    if (userStorage.getLoggedUser()) {
        user = userStorage.getLoggedUser();
        $('#topMenu').hide();
        $('#topMenu-logged').show();
    }

    $('#login').on('click', function (event) {

        event.originalEvent.preventDefault();
        $('#signUp-form').hide(500);
        $('#login-form').show(1000);
        $('#login-btn').on('click', function (event) {
            event.originalEvent.preventDefault();
            var username = $('#username').val();
            var password = $('#password').val();
            if (userStorage.logIn(username, password)) {
                $('#login-form').hide();
                $('#topMenu').hide();
                $('#topMenu-logged').show();
                profileName = userStorage.getLoggedUser().username;
            }
            user = userStorage.logIn(username, password);
            // id = user.id;
        })
    });



    $('.search-btn').on('click', function (event) {
        event.originalEvent.preventDefault();
        isSearching = !isSearching;
        if (isSearching) {
            $('#search-form').show(1000);
        } else {
            $('#search-form').hide(1000);
        }
    });

    //////////////

    var isPersonal = false;

    $('#userPhoto').on('click', function (event) {
        event.originalEvent.preventDefault();
        isPersonal = !isPersonal;
        if (isPersonal) {
            $('#personal_form').show();
        } else {
            $('#personal_form').hide();
        }
    });


    /////////////////


    $('#signUp').on('click', function (event) {
        event.originalEvent.preventDefault();
        $('#login-form').hide(500);
        $('#signUp-form').show(1000);
        $('#sign-button').on('click', function (event) {
            event.originalEvent.preventDefault();
            var username = $('#sign-username').val();
            var password = $('#sign-password').val();
            userStorage.singUp(username, password);
            $('#signUp-form').hide();
            // $('#topMenu-logged').show();
            // $('#topMenu').hide();
            $('#login-form').show(500);
        });
    });


    $('#post-button').on('click', function (event) {
        event.originalEvent.preventDefault();
        if (pushed) {
            $('#upload').hide(800);
        } else {
            $('#upload').show(800);
        }
        pushed = !pushed;
        $('#login-form').hide();
        $('#signUp-form').hide();
    });



    // });
    // var hashtag= '';
    // var name = 'golem';
    // for(var i = 0;i<20;i++){
    //     hashtag += <div><p>${name}</p></div>;
    // }
    // $('#hashtags').html(hashtag);

    // var postovebrat = [];
    $('#upload-button').on('click', function (event) {
        event.originalEvent.preventDefault();
        $('#singlePost-div').hide();
        var img = $('#img_url').val();
        var title = $('#title').val();
        var categor = $('#category').val();
        var currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));
        var userId = userStorage.getLoggedUser().id;
        userStorage.addNewPost(userId, title, img);
        // userStorage.addNewPost(id, title, img);
        postStorage.addPost(title, img)
        var points = 0;
        var comments = 0;
        // var currPost = postStorage.findPost(title);

        postEl = `<div> 
        </div>
        <h1 id="caption">${title}</h1>
        <img src="${img}" alt=""/>
        <h3 id="category-text">${categor}</h3>
        <p>${points} points  &middot;  ${comments} comments</p>
        <div id="${++nextId}" class="coments">
            <img class='up' src="assets/images/arrows/arrow up.png" alt="">
            <img class='down' src="assets/images/arrows/arrow down.png" alt="">
            <a href=""><img src="assets/images/arrows/comment.png" alt=""></a>
        </div>`;
        // <p>&middot;</p>
        // <p>39 comments</p>



        // post.unshift(postEl);
        // var html = post.join();
        $('#post-div').prepend(postEl);
        $('#post-div').show();
        $('#upload').hide();
        $('.coments > a > img').on('click', function (event) {
            event.originalEvent.preventDefault();
            $('#post-div').hide();
            $('#singlePost-div').show();
        });

    });

    function showAllPosts() {
        var allpostove = '';
        post.forEach(po => {
            allpostove += `<div> 
            </div>
            <h1 id="caption">${po.title}</h1>
            <img src="${po.image}" alt=""/>
            <h3 id="category-text">${po.category}</h3>
            <p>${po.points} points  &middot; ${po.comments} comments</p>
            <div id="${++nextId}" class="coments">
                <img src="assets/images/arrows/arrow up.png" alt="">
                <img src="assets/images/arrows/arrow down.png" alt="">
                <a href=""><img src="assets/images/arrows/comment.png" alt=""></a>
            </div>`;
        });
        $('#post-div').html(allpostove);
    };

    showAllPosts(post);

    $.get('../biggestJSON/all.json').then(function (po) {
        post = post.concat(po);
        showAllPosts(post);
    });


    showAllPosts(post);

    var categories = [];


    function showCategoriesList() {
        var allCategories = '';
        categories.forEach(c => {
            allCategories += `<option value='${c.name}'></option>`;
        });
        //allCategories +='</datalist>';\
        // console.log(allCategories);
        $('#categoryC').html(allCategories);
    };

    showCategoriesList(categories);

    $.get('assets/categories.json').then(function (c) {
        categories = categories.concat(c);
        showCategoriesList(categories);
    });

    /*$('#search-form').on('input', function(){
        var cat = $(this).val();

        $("#categoryC").find("option").each(function() {
            if ($(this).val() == cat) {
              showCategory(cat);
            }
          })

    });*/

    // name = 'anime';

    var categoryPost = [];
    function showCategory() {
        var oneCategoryPosts = '';
        categoryPost.forEach(p => {
            oneCategoryPosts += `<div> 
            </div>
            <h1 id="caption">${p.title}</h1>
            <img src="${p.image}" alt=""/>
            <h3 id="category-text">${p.category}</h3>
            <p>${p.points} points  &middot; ${p.comments} comments</p>
            <div id="${++nextId}" class="coments">
                <img src="assets/images/arrows/arrow up.png" alt="">
                <img src="assets/images/arrows/arrow down.png" alt="">
                <a href=""><img src="assets/images/arrows/comment.png" alt=""></a>
            </div>`;
        });
        // console.log(oneCategoryPosts);
        $('#post-div').html(oneCategoryPosts);
    }

    $("#search-form").on('input', function (event) {
        event.originalEvent.preventDefault();
        var val = this.value;
        categoryPost = [];

        if ($('#categoryC').find('option').filter(function () {
            return this.value.toUpperCase() === val.toUpperCase();
        }).length) {
            $.get('postsJSONs/' + val + '.json').then(function (o) {
                categoryPost = categoryPost.concat(o);
                showCategory(categoryPost);

            });
        }
    });

    // json controllera 


    $('#animals').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'animal';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });


    $('#animeManga').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'anime';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#awesome').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'awesome';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#car').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'car';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#comics').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'comic';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#country').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'country';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#clasic').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'clasicalArt';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#food').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'food';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#gaming').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'gaming';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#girly').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'girly';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#historycal').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'historycal';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#horror').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'horror';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#movies').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'movies';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#music').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'music';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#politics').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'politics';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#school').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'school';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#sci-fi').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'sci-fi';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#sports').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'sport';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });

    $('#wtf').on('click', function (event) {
        event.originalEvent.preventDefault();
        name = 'wtf';
        categoryPost = [];
        $.get('postsJSONs/' + name + '.json').then(function (p) {
            categoryPost = categoryPost.concat(p);
            showCategory(categoryPost);
        });
    });
    // krai na json controllera


    // showCategory(categoryPost);
    // // var name = 'anime';
    // $.get('postsJSONs/'+ name + '.json').then(function(p){
    //     categoryPost = categoryPost.concat(p);
    //     showCategory(categoryPost);
    // });



    $('#myProfile').on('click', function (event) {
        event.originalEvent.preventDefault();
        $('#profile-div').show();
        $('#settings-div').hide();
        $('#post-div').hide();
        $('#personal_form').hide();
        isPersonal = !isPersonal;
    });


    $('#settings').on('click', function (event) {
        event.originalEvent.preventDefault();
        $('#settings-div').show();
        $('#profile-div').hide();
        $('#post-div').hide();
        $('#personal_form').hide();
        isPersonal = !isPersonal;
    });

    $('#save-changes').on('click', function (event) {
        event.originalEvent.preventDefault();
        $('#personal_form').hide();
        var profilePic = $('#profile-picture').val();
        // if(profilePic.trim().length == 0){
        //     return
        // }
        $('#userPhoto > a > img').attr('src', profilePic);
        // var nameUser = $('#username').val();
        // if(nameUser.trim().length == 0){
        //     return
        // }
        $('#pc-username').text(profileName);
        $('#pc-show').attr('src', profilePic);
        $('#settings-div').hide();
        $('#post-div').show();
    });
    $('.icon').on('click', function () {
        showAllPosts(post);
    });



    /*function showCountryList(categories) {
        var templateText = $('#search_datalist').text();
        var template = Handlebars.compile(templateText);

        //$('#homePage datalist').remove();
        $('#body').append($(template({ categories: categories })));
    }*/



});