

$( document ).ready(function() {
  $("#note").hide();
});


function toggle(checked){
  $("#note").toggle();
  if( !checked ) {
    jsEditor.clearSelection();
  }
}


//$("#mycheck").attr("checked") ? console.info("Checked") : console.info("Unchecked");

//jsEditor.getSession().selection.on('changeSelection', function(e)
// {
  //alert("sumanth"); 
 //}
//);

//Emitted when the cursor selection changes.