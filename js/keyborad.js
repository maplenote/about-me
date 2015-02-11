/* Maple 2015.2.9  https://github.com/maplenote */
var scrollMSec = 300;
//var scrollTime = 0;
var touchTime = 0;
var touchstartY=0;
var mobileClickFlag = false;
var touchUpRange = 10;//往回翻頁手勢會有誤碰
$(function(){
  $(document).disableSelection();
  $(window).on("keydown", function(e){
    switch(e.keyCode){
      case 33: //pageup
      case 37: //left
      case 38: //up
        backAnimation(e);
        break;
      case 34: //pagedown
      case 39: //right
      case 40: //down
        nextAnimation(e);
        break;
    }
    //console.log(e.keyCode);
  })
  .on("click",nextAnimation)
  .on("contextmenu",function(e){
    //e.stopPropagation()
    //e.stopImmediatePropagation();
    //以上兩個方式都失敗，只好用return false
    backAnimation(e);
    return false;
  })
  .on("touchstart",function(e){
  	touchstartY=e.originalEvent.touches[0].pageY;
  	mobileClickFlag = true;
  	//TODO click動作會只有觸發touchstart
  	setTimeout(function(){
  			if(mobileClickFlag){
  				nextAnimation(e);
    		}
    	},scrollMSec*2);
  	//setTimeout(function(){alert("S:"+e.originalEvent.touches[0].pageY);},300);
  })
  // .on("touchend",function(e){
  //   var tempTime = new Date().getTime();
  //   var nowSTop=$(document).scrollTop();
  //   var nowTouchY=e.originalEvent.touches[0].pageY;
  //   //setTimeout(function(){alert("E:"+e.originalEvent.touches[0].pageY);},300);
  //   if(touchTime+scrollMSec<tempTime){
  //   	if(touchstartY<=nowTouchY)
  //   	{
  //     	nextAnimation(e);
  //   	}
  //   	else if(touchstartY>nowTouchY+touchUpRange)
  //   	{
		// 		backAnimation(e);
  //   	}
  //   	touchTime=tempTime;
  //   }
  // })
  .on("touchmove",function(e){
  	var tempTime = new Date().getTime();
    var nowTouchY=e.originalEvent.touches[0].pageY;
    mobileClickFlag = false;
    if(touchTime+scrollMSec<tempTime){
    	if(touchstartY>nowTouchY)
    	{
      	nextAnimation(e);
    	}
    	else if(touchstartY<=nowTouchY+touchUpRange)
    	{
				backAnimation(e);
    	}
    	//setTimeout(function(){alert("E:"+e.originalEvent.touches[0].pageY);},300);
    	touchTime=tempTime;
    }
  	e.preventDefault();  //不會觸發touchend
  });
 //  .on('mousewheel', function(e) {
 //    var tempTime = new Date().getTime();
 //    if (e.originalEvent.wheelDelta >= 0) {
 //      //Scroll up
 //      if(scrollTime+scrollMSec<tempTime){
 //        backAnimation(e);
 //        scrollTime=tempTime;
 //      }
 //    }
 //    else {
 //      //Scroll down
 //      if(scrollTime+scrollMSec<tempTime){
 //        nextAnimation(e);
 //        scrollTime=tempTime;
 //      }
 //    }
	// });
});

