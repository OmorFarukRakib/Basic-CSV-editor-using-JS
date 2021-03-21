jQuery(document).ready(function () {
  let clicked = true;
  $("#csv-export-btn").on("click", function (e) {
    $(".tableexport-caption").show();
    e.preventDefault();
    if (clicked) {
      ResultsToTable();

      clicked = false;
    }
  });

  function ResultsToTable() {
    var lastIndex = $("#csvRoot tr:nth-child(1) td:last").index(); // This will get the last column index num so that action column is not downloaded

    $("#csvRoot").tableExport({
      headers: true, // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true, // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ["xlsx", "csv", "txt"], // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: "Table Data", // (id, String), filename for the downloaded file, (default: 'id')
      // bootstrap: false,                   // (Boolean), style buttons using bootstrap, (default: true)
      //exportButtons: true,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: "top", // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: [lastIndex], // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true, // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
      RTL: false, // (Boolean), set direction of the worksheet to right-to-left (default: false)
      sheetname: "Table Data", // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    });

    tableExport().reset();
  }
});

$(document).mouseup(function (e) {
  var container = $(".tableexport-caption");

  // if the target of the click isn't the container nor a descendant of the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.remove();
    container.hide();
  }
});

// Showing the download button when file uploaded
$("#csvFileInput").on("input", function () {
  $(".csv-export-btn-div").show();
});
