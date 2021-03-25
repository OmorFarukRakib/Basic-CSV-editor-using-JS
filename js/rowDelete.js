
$("#csvRoot").on("click", ".deleteRow", function () {
  // $("#csvRoot").DataTable().destroy();
  // let table = $("#csvRoot").DataTable({
  //   scrollY: 400,
  //   scrollX: true,
  //   scrollCollapse: true,
  // });
  var checkstr = confirm("Are you sure you want to delete this row?");

  if (checkstr == true) {
    
    // do your code
    //table.row($(this).parents("tr")).remove().draw();
    $("#csvRoot").DataTable().row($(this).parents("tr")).remove().draw();
  } else {
    return false;
  }
});
