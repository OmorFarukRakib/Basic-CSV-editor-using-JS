class TableCsv {
  /**
   * @param {HTMLTableElement} root The table element which will display the CSV data.
   */
  constructor(root) {
    this.root = root;
  }

  /**
   * Clears existing data in the table and replaces it with new data.
   *
   * @param {string[][]} data A 2D array of data to be used as the table body
   * @param {string[]} headerColumns List of headings to be used
   */
  update(data, headerColumns = []) {
    this.clear();
    this.setHeader(headerColumns);
    this.setBody(data);
  }

  /**
   * Clears all contents of the table (incl. the header).
   */
  clear() {
    this.root.innerHTML = "";
  }

  /**
   * Sets the table header.
   *
   * @param {string[]} headerColumns List of headings to be used
   */
  setHeader(headerColumns) {
    this.root.insertAdjacentHTML(
      "afterbegin",
      `
              <thead>
                  <tr>
                      ${headerColumns
                        .map((text) => `<th>${text}</th>`)
                        .join("")}
                        <th>Action</th>
                  </tr>
              </thead>
          `
    );
  }

  /**
   * Sets the table body.
   *
   * @param {string[][]} data A 2D array of data to be used as the table body
   */
  setBody(data) {
    const rowsHtml = data.map((row) => {
      return `
              <tr>
                  ${row
                    .map(
                      (text) => `
                              <td class="table-data" contenteditable="false" >${text}</td>                                    
                              `
                    )
                    .join("")}
                        <td >
                          <div class="actionOptions">
                            
                              <button class="editbtn btn btn-primary" data-toggle="modal" data-target="#editModal">Edit</button>
                            
                             
                              <button class="deleteRow btn btn-danger">Delete</button>
                           
                          </div>
                        </td>                   
                                       
                        </tr>              
              `;
    });

    this.root.insertAdjacentHTML(
      "beforeend",
      `
              <tbody>
                  ${rowsHtml.join("")}
              </tbody>
          `
    );
  }
}

//onclick="listenForDoubleClick(this);" onblur="this.contentEditable=false;"

const tableRoot = document.querySelector("#csvRoot");
const csvFileInput = document.querySelector("#csvFileInput");
const tableCsv = new TableCsv(tableRoot);
var flag = 0;
csvFileInput.addEventListener("change", (e) => {
  localStorage.setItem("UploadNewFile", "1");

  if (localStorage.getItem("UploadNewFile") === "1") {
    $("#ImportFileField").hide();
    $("#ImportAnotherFileField").show();
  }

  $("#csvRoot").html("");
  $("#csvRoot thead").html("");
  // $(".dataTables_scrollHead").html('');
  // $('#csvRoot').destroy();
  // $('#csvRoot').empty();

  //  if(flag>0){
  //   $('#csvRoot').destroy();
  //   $('#csvRoot').empty();
  //  }else{
  //    flag++;
  //  }
  //  console.log(flag);

  // For excel
  // get the file name, possibly with path (depends on browser)
  var filename = $("#csvFileInput").val();

  // Use a regular expression to trim everything before final dot
  var extension = filename.replace(/^.*\./, "");
  console.log(extension);
  if (extension == filename) {
    extension = "";
  } else {
    // if there is an extension, we convert to lower case
    // (N.B. this conversion will not effect the value of the extension
    // on the file upload.)
    extension = extension.toLowerCase();
  }

  if (extension === "csv") {
    Papa.parse(csvFileInput.files[0], {
      delimiter: ",",
      skipEmptyLines: true,
      complete: (results) => {
        console.log(results.data);
        tableCsv.update(results.data.slice(1), results.data[0]);

        $(document).ready(function () {
          $("#csvRoot").DataTable({
            searching: false,
            ordering: false,
            bPaginate: false,
            destroy: true,
            scrollY: 300,
            scrollX: true,
            scrollCollapse: true,
            autoWidth: true,
            responsive: true,
            scroller: true,
          });

          let totalData = $("#csvRoot").DataTable().data().count();
          let iColumns = $("#csvRoot thead th").length;
          let totalRow = totalData / iColumns;

          $("#TotalNumberOfTrackID").text(totalRow);
          $("#TotalNumberOfEmptyTrackID").text(totalRow);

          let totalEmptyRows = $("#csvRoot tr td:first-child:empty").length;
          $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
        });
      },
    });
  } else if (extension === "xlsx" || extension === "xls") {
    ExportToTable();
  } else {
    alert("WRONG FILE");
    $(".csv-export-btn-div").hide();
  }

  //for csv
});
