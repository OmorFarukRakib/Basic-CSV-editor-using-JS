$("#tableContainer").on("click", "#insert", function () {
 
  var str = $("#insertNo").val();
  console.log(str);

   $("#csvRoot tbody tr:last")
                .clone()
                .appendTo("#dummy tbody")
                .find(".table-data")
                .empty();
  var newRow = $("#dummy tbody tr:last").html();
  document.getElementById("dummy").deleteRow(0);
   
  
   //console.log( newRow);
   if(str!=''){
     let i;
     for(i=0; i<str ; i++){
        $("#csvRoot").DataTable().row.add($('<tr> ' + newRow + ' </tr>')).draw();
     }
   }else{
    $("#csvRoot").DataTable().row.add($('<tr> ' + newRow + ' </tr>')).draw();
   }
  
  // $("#csvRoot").DataTable().data.reload().draw();

});
