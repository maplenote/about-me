/* Maple 2015.2.9  https://github.com/maplenote */
$(function(){
  $(".skillTree").each(function(){
    var maxLevel=getMaxLevel(this,"UL",0);
    $(this).data("maxlevel",maxLevel);
    //alert("maxLevel:"+maxLevel);
  });
  // .on('click',function(e){
  //   var showLevel = $(this).data("showlevel");
  //   var maxLevel = $(this).data("maxlevel");
  //   if(maxLevel>showLevel)
  //   {
  //     $(this).data("showlevel",showLevel+1);
  //     showLevelNode(this,'UL',showLevel+1);
  //   }
  //   else
  //   {
  //     for(var i = maxLevel; i > 1; i--){
  //       showLevelNode(this,'UL',i); 
  //     }
  //     $(this).data("showlevel",i);
  //   }
  // });
});
function getMaxLevel(node,tag,level)
{
  if(node.children.length===0)
  {
    return level;
  }
  var max;
  for (var i = 0; i < node.children.length; i++) {
    var returnMax;
    if(node.children[i].tagName==tag){
      returnMax= getMaxLevel(node.children[i],tag,level+1);
      if(max===undefined||returnMax>max)
      {
        max = returnMax;
      }
    }
    else{
       returnMax=getMaxLevel(node.children[i],tag,level);
      if(max===undefined||returnMax>max)
      {
        max = returnMax;
      }
    }
  }
  return max;
}
function showLevelNode(node,tag,level)
{
  if(level===0 && node.tagName==tag)
  {
    $(node).toggle("fast");
    return ;
  }
  if(node.children.length===0)
  {
    return ;
  }
  for (var i = 0; i < node.children.length; i++) {

    if(node.children[i].tagName==tag){
       showLevelNode(node.children[i],tag,level-1);
     
    }
    else{
       showLevelNode(node.children[i],tag,level);
     
    }
  }
} 
