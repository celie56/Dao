// Hello hello

var remote = require('remote');
var BrowserWindow = remote.require('browser-window'); 


document.getElementById("min-btn").addEventListener("click", function (e) {
   var window = remote.getCurrentWindow();
   window.minimize(); 
});

document.getElementById("max-btn").addEventListener("click", function (e) {
   var window = remote.getCurrentWindow();
   window.maximize(); 
});

document.getElementById("close-btn").addEventListener("click", function (e) {
   var window = BrowserWindow.getFocusedWindow();
   window.close();
}); 

// dynamically change board size
var resizeFunc = function(){
    var menuheight = 30;
    var newsize = $(window).width() < $(window).height() - menuheight ?
                    $(window).width() :
                    $(window).height() - menuheight;
    $('#board').height(newsize).width(newsize);
    $('.square').height(newsize/4).width(newsize/4);
}
$(window).resize(function(){
    resizeFunc();
});

resizeFunc();