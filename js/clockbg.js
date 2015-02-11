/* Maple 2015.2.9  https://github.com/maplenote */
var openTime = new Date().getTime();
function refreshClock()
{
  var newTime = new Date().getTime();
  var deg = parseInt((newTime-openTime)/1000/10,10); //分針度數
  //console.log(deg);
  $("#clock").animate({borderSpacing: deg },{
    step: function(now,fx) {
      $(this).css('-webkit-transform','rotate('+now+'deg)');
      $(this).css('-moz-transform','rotate('+now+'deg)');
      $(this).css('transform','rotate('+now+'deg)');
    },
    duration:'fast'
  },'linear');
}
$(function(){
  $("#btn").on('click',refreshClock);
  setInterval(refreshClock,10000);
});