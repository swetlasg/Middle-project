$(function(){

    $('#logout').on('click', function(event){
        event.originalEvent.preventDefault();
        // $('#login-form').show();
        // $('#signUp-form').show();
        $('#upload').hide();
        $('#topMenu').show();
        $('#topMenu-logged').hide();
        sessionStorage.setItem('loggedUser', null);
    });

});