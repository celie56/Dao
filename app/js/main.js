// dynamically change board size
var resizeFunc = function(){
    var newsize = $('.box').width() / 4 - 3.5;
//    $('#board').height(newsize).width(newsize);
    $('.square').height(newsize).width(newsize);
    $('.square').css({'font-size': newsize*.9});
}
$(window).resize(function(){
    resizeFunc();
});
$(document).ready(function(){
    resizeFunc();
});