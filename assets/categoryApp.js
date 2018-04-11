$(function(){

var name = 'anime';

    var categoryPost = []; 
    function showCategory(){
        var oneCategoryPosts = '';
        categoryPost.forEach(p => {
            oneCategoryPosts += `<div> 
            </div>
            <h1 id="caption">${p.title}</h1>
            <img src="${p.image}" alt=""/>
            <h3 id="category-text">${p.category}</h3>
            <p>${p.points}points  &middot;  39 comments</p>
            <div id="${++nextId}" class="coments">
                <img src="assets/images/arrows/arrow up.png" alt="">
                <img src="assets/images/arrows/arrow down.png" alt="">
                <a href=""><img src="assets/images/arrows/comment.png" alt=""></a>
            </div>`;
        });
        console.log(oneCategoryPosts);
        $('#post-div').html(oneCategoryPosts);
    }


$('#animals').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'animal';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});


$('#animeManga').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'anime';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});

$('#awesome').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'awesome';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});

$('#car').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'car';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});

$('#comics').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'comic';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});

$('#country').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'country';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});

$('#clasic').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'clasicalArt';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});

$('#food').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'food';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});

$('#gaming').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'gaming';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});
$('#girly').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'girly';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});
$('#historycal').on('click',function(event){
    event.originalEvent.preventDefault();
    name = 'historycal';
    categoryPost = [];
    $.get('postsJSONs/'+ name + '.json').then(function(p){
        categoryPost = categoryPost.concat(p);
        showCategory(categoryPost);
    });
});

})
