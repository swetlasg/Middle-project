$(function () {
    var isSearching = false;
    var post = [];
    var user;
    var id = 1;
    var nextId = 0;
    $('#topMenu-logged').hide();
    $('#upload').hide();
    $('#settings-div').hide();

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
        $('#upload').show(800);
        $('#login-form').hide();
        $('#signUp-form').hide();
    });


    $('#upload-button').on('click', function (event) {
        event.originalEvent.preventDefault();
        $('#singlePost-div').hide();
        var img = $('#img_url').val();
        var title = $('#title').val();
        var categor = $('#category').val();
        var userId = JSON.parse(sessionStorage.getItem('loggedUserId'));
        userStorage.addNewPost(id, title, img);
        postStorage.addPost(title, img)
        var points = 0;
        // var currPost = postStorage.findPost(title);

        var postEl = `<div> 
        </div>
        <h1 id="caption">${title}</h1>
        <img src="${img}" alt=""/>
        <h3 id="category-text">${categor}/h3>
        <p>${points}points  &middot;  39 comments</p>
        <div id="${++nextId}" class="coments">
            <img src="assets/images/arrows/arrow up.png" alt="">
            <img src="assets/images/arrows/arrow down.png" alt="">
            <a href=""><img src="assets/images/arrows/comment.png" alt=""></a>
        </div>`;
        // <p>&middot;</p>
        // <p>39 comments</p>



        post.unshift(postEl);
        var html = post.join();
        $('#post-div').html(html);
        $('#post-div').show();
        $('#upload').hide();
        $('.coments > a > img').on('click', function (event) {
            event.originalEvent.preventDefault();
            $('#post-div').hide();
            $('#singlePost-div').show();
        });

    });
    // });
    // var hashtag= '';
    // var name = 'golem';
    // for(var i = 0;i<20;i++){
    //     hashtag += <div><p>${name}</p></div>;
    // }
    // $('#hashtags').html(hashtag);

    var categories = [];

    function showCategoriesList(){
        var allCategories = '';
        categories.forEach(c => {
            allCategories += `<option value='${c.name}'></option>`;
        });
        //allCategories +='</datalist>';\
        console.log(allCategories);
        $('#categoryC').html(allCategories);
    };

    showCategoriesList(categories);

    $.get('assets/categories.json').then(function(c){
        categories = categories.concat(c);
        showCategoriesList(categories);
    })
    $('#settings').on('click',function(event){
        event.originalEvent.preventDefault();
        $('#settings-div').show();
        $('#post-div').hide();
    });
    $('#save-changes').on('click',function(event){
        event.originalEvent.preventDefault();
        $('#personal_form').hide();
        var profilePic = $('#profile-picture').val();
        if(profilePic.trim().length == 0){
            return
        }
        $('#userPhoto > a > img').attr('src', profilePic);
        $('#settings-div').hide();
        $('#post-div').show();
    })

    /*function showCountryList(categories) {
        var templateText = $('#search_datalist').text();
        var template = Handlebars.compile(templateText);

        //$('#homePage datalist').remove();
        $('#body').append($(template({ categories: categories })));
    }*/



});