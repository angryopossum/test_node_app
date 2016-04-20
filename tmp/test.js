function someFunc (req, res){
    
    setTimeout(function (){
          console.log(" и пока");
    }, 8000);       
        
    res(req, 20);
}


someFunc("Вася", function(argument, arg2) {
    console.log(argument+arg2);
    });
    


/*
  setTimeout(function (){
          console.log(" и пока");
        }, 8000);       
        */
        