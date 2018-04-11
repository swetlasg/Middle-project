$(function(){

    $('#logout').on('click', function(event){
        event.originalEvent.preventDefault();
        // $('#login-form').show();
        // $('#signUp-form').show();
        $('#upload').hide();
        $('#topMenu').show();
        $('#topMenu-logged').hide();
        $('#personal_form').hide();
        $('#profile-div').hide();
        $('#settings-div').hide();
        $("#post-div").show();

        sessionStorage.setItem('loggedUser', null);
    });

});