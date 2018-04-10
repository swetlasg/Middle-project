function postController(){  
    $('#pointsUp').on('click', function(event){
        event.preventDefault();
        postStorage.pointsUp();
    }); 
    $('#pointsDown').on('click', function(event){
        event.preventDefault();
        postStorage.pointsDown();
    });
    

    
};