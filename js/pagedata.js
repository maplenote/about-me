/* Maple 2015.2.9  https://github.com/maplenote */
var pageList = [];
var nowPageFlag = 0;
var $docs = $(document);
$(function(){
  $(".page").each(function(){
    var temp ={};
    temp.id = $(this).attr('id');
    temp.top = $(this).offset().top;
    pageList.push(temp);
  });
 
//   setTimeout(function(){
//     console.log(pageList);
//   },1000);
  //alert($("#page3").offset().top);
  //$(document).scrollTop($("#page3").offset().top);
  //document.getElementById("page3").scrollIntoView();
 
});

function nextPage(e)
{
  if(nowPageFlag === pageList.length-1)
    {
      return ;
    }
  else
    {
      ++nowPageFlag;
      $docs.scrollTop(pageList[nowPageFlag].top);
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
      $docs.scrollTop(pageList[nowPageFlag].top);
    }
}