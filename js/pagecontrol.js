/* Maple 2015.2.11  https://github.com/maplenote */
var pageList = [];
var nowPageFlag = 0;
var defaultDuration = 400;
var $docs = $(document);
$(function(){
	$(window).on('resize',function(){
		refreshPosition();
		setPosition(nowPageFlag);
	});
  initPageList();
 	setPosition(nowPageFlag);
 
});
function initPageList()
{
	pageList=[];
	var initAnimFlag = false;
	var count = 0;
	$(".page").each(function(){
		if(count==nowPageFlag){ //初設起始頁
			initAnimFlag = true;
		}
    var temp ={};
    temp.id = $(this).attr('id');
    temp.top = $(this).offset().top;
    var tempAnim = {"nowStep":(initAnimFlag)?0:-1,"list":[]};//step:0代表切換到本頁時
	  $(this).find("[data-step]").each(function(){
	    var step = $(this).data('step');
	    if(tempAnim.list[step]!==undefined && tempAnim.list[step] instanceof Array)
	    {
	 			tempAnim.list[step].push(this);
	    }
	    else
	    {
	      tempAnim.list[step] = [];
	      tempAnim.list[step].push(this);
	    }
	  });
	  temp.Animation = tempAnim;
    pageList.push(temp);
    doAnimation(tempAnim.list[tempAnim.nowStep]);
    count++;
  });
  initPageShow();
}
function initPageShow()
{
	for(var temp=pageList.length-1;temp>=0;temp--)
	{
		var tempAnimList = pageList[temp].Animation;
		if(temp<nowPageFlag)
		{
			tempAnimList.nowStep=tempAnimList.list.length-1;
		}
		else
		{
			for(var temp2=tempAnimList.list.length-1;temp2>=tempAnimList.nowStep+1;temp2--)
			{
				undoAnimation(tempAnimList.list[temp2],0);
			}
		}
	}
}
function refreshPosition()
{
	var count = 0;
	var initflag = false; //防止異常狀態
	$(".page").each(function(){
		if(initflag){
			return;
		}
    var temp ={};
    temp.id = $(this).attr('id');
    temp.top = $(this).offset().top;
    if(pageList[count].id==temp.id)
    {
    	pageList[count].top = temp.top;
    }
    else
    {
    	initPageList();
    	initflag = true;
    }
  });
}
function setPosition(index)
{
	setTimeout(function(){
			$docs.scrollTop(pageList[index].top);
		},100);
}
function checkAndScrollNowPage()
{
	var winHeight = $(window).height();
	var $nowPage = $("#"+pageList[nowPageFlag].id);
	var nowPageHeight = $nowPage[0].scrollHeight;
	var nowtop = $nowPage.scrollTop();
	if(winHeight+nowtop>=nowPageHeight)
	{
		return true;
	}
	else
	{
		//移動一頁的距離
		$nowPage.animate({
			scrollTop: winHeight+nowtop
		}, 300, 'swing');
		//$nowPage.scrollTop(winHeight+nowtop);
		return false;
	}
}
function nextAnimation(e)
{
	var nowPageAnimData = pageList[nowPageFlag].Animation;
	if(nowPageAnimData.nowStep>=nowPageAnimData.list.length-1) //本頁的指定動作都執行完畢
	{
		if(!checkAndScrollNowPage())
		{
			//移動卷軸
			return;
		}
		if(nowPageFlag === pageList.length-1)
	  {
	    return ; //已經到頁尾
	  }
	  //換下一頁
	  ++nowPageFlag;
	  ++nowPageAnimData.nowStep;
	  $('body').animate({
			scrollTop: pageList[nowPageFlag].top
		}, 200, 'swing',function(){
			if(nowPageAnimData.list.length>0)
			{
				doAnimation(nowPageAnimData.list[nowPageAnimData.nowStep]);
			}
		});
	  
	}
	else
	{
		++nowPageAnimData.nowStep;
		doAnimation(nowPageAnimData.list[nowPageAnimData.nowStep]);
	}
}
function doAnimation(domObject,msec)
{
	if(domObject==undefined){return}
	var $obj = $(domObject)
  var action = $obj.data('action');
  var addclass = $obj.data('add-class');
  if(msec==undefined)
  {
  	msec = defaultDuration;
  }
  if(addclass!==undefined && addclass!=='')
  {
    $obj.addClass(addclass,msec);
    return;
  }
  if(action===undefined || action==='')
  {
    $obj.toggle(msec);
    return;
  }
  if(action=='show')
  {
  	$obj.removeClass('opacity0',msec); 
    return;
  }
  if(action=='hide')
  {
    $obj.addClass('opacity0',msec);
    return;  
  }
}
function undoAnimation(domObject,msec)
{
	if(domObject===undefined){
		
		return;
	}
	var $obj = $(domObject)
  var action = $obj.data('action');
  var addclass = $obj.data('add-class');
  if(msec==undefined)
  {
  	msec = defaultDuration;
  }
  if(addclass!==undefined && addclass!=='')
  {
    $obj.removeClass(addclass,msec);
    return;
  }
  if(action===undefined || action==='')
  {
    $obj.toggle(msec);
    return;
  }
  if(action=='show')
  {
  	$obj.addClass('opacity0',msec); 
    return;
  }
  if(action=='hide')
  {
  	$obj.removeClass('opacity0',msec); 
    return;  
  }
  
}
function backAnimation(e)
{
  if(nowPageFlag === 0)
  {
    return ;
  }
  else
  {
    --nowPageFlag;
    $('body').animate({
			scrollTop: pageList[nowPageFlag].top
		}, 300, 'swing');
    //$docs.scrollTop(pageList[nowPageFlag].top);
  }
}

