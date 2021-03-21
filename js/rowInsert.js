$("#insert").click(function () {
  console.log("clickedddddd");
  $("#csvRoot tbody tr:last")
    .clone()
    .appendTo("#csvRoot tbody")
    .find(".table-data")
    .empty();
});
