$("#csvRoot").on("click", ".deleteRow", function () {
    var checkstr = confirm("Are you sure you want to delete this row?");

    if (checkstr == true) {
      // do your code
      $(this).closest("tr").remove();
    } else {
      return false;
    }
  
});





