/* Maple 2015.2.9  https://github.com/maplenote */
var pageList = [];
var nowPageFlag = 0;

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
	$(".page").each(function(){
    var temp ={};
    temp.id = $(this).attr('id');
    temp.top = $(this).offset().top;
    var tempAnim = {"nowAnim":0,"list":[]};
	  $(this).children("[data-step]").each(function(){
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
  });
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
function nextPage(e)
{
  if(nowPageFlag === pageList.length-1)
    {
      return ;
    }
  else
    {
      ++nowPageFlag;
      $('body').animate({
				scrollTop: pageList[nowPageFlag].top
			}, 200, 'swing',nextCallBack());
      //$docs.scrollTop(pageList[nowPageFlag].top);
    }
}
function backPage(e)
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
			}, 300, 'swing',backCallBack());
      //$docs.scrollTop(pageList[nowPageFlag].top);
    }
}

function nextCallBack()
{

}
function backCallBack()
{

}