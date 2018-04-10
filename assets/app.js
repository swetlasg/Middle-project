function router() {
    var page = location.hash.slice(1);
    switch (page) {
        case 'login':
            loginController();
            break;
        case 'signIn':
            signInController();
            break;
        case 'post':
            postController();
            break;
        default:
            loginFormController();
            break;
    }
}

$(function () {
    $(window).on('hashchange', router);
    router();
});


