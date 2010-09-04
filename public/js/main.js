$(function(){
    $('#archives a.switcher').click(function(){
        $(this).toggleClass('open').next().toggle();
        return false;
    });
});