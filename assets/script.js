$(function(){
    $('#login').on('click',function(event){
        event.originalEvent.preventDefault();
        $('#signUp-form').hide(500);
        $('#login-form').show(1000);
    });
    $('#search').on('click',function(event){
        event.originalEvent.preventDefault();
        $('#search-form').show(1000);
      
    });
    $('#signUp').on('click',function(event){
        event.originalEvent.preventDefault();
        $('#login-form').hide(500);
        $('#signUp-form').show(1000);
       
    });
});