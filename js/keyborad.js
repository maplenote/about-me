/* Maple 2015.2.9  https://github.com/maplenote */
var scrollMSec = 300;
var scrollTime = 0;
$(function(){
  $(document).disableSelection()
  .on("keydown", function(e){
    switch(e.keyCode){
      case 33: //pageup
      case 37: //left
      case 38: //up
        backPage(e);
        break;
      case 34: //pagedown
      case 39: //right
      case 40: //down
        nextPage(e);
        break;
    }
    //console.log(e.keyCode);
  })
  .on("click",nextPage)
  .on("contextmenu",function(e){
    //e.stopPropagation()
    //e.stopImmediatePropagation();
    //以上兩個方式都失敗，只好用return false
    backPage(e);
    return false;
  	});
 //  .on('mousewheel', function(e) {
 //    var tempTime = new Date().getTime();
 //    if (e.originalEvent.wheelDelta >= 0) {
 //      //Scroll up
 //      if(scrollTime+scrollMSec<tempTime){
 //        backPage(e);
 //        scrollTime=tempTime;
 //      }
 //    }
 //    else {
 //      //Scroll down
 //      if(scrollTime+scrollMSec<tempTime){
 //        nextPage(e);
 //        scrollTime=tempTime;
 //      }
 //    }
	// });
});
