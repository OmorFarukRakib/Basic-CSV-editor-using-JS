// Implementing pop up model's data for editing
$(document).ready(function () {
  $("#csvRoot").on("click", ".editbtn", function () {
    row_index = $(this).closest("tr").index();
    console.log(`ata akhn click kora button er index: ${row_index}`);
    console.log("Press Hoise EDIT");
    var $tr = $(this).closest("tr");
    console.log($tr.html());
    var data = $tr
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    console.log(data);

    $("#TrackIDEdit").val(data[0]);
    $("#DeviceIDEdit").val(data[1]);
    $("#DeviceVendorEdit").val(data[2]);
    $("#deviceModelEdit").val(data[3]);
    $("#DeviceSerialEdit").val(data[4]);
    $("#MemoEdit").val(data[5]);

    /// replace with existing row when submitted
    $("#EditForm").submit(function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      console.log("SUBMIT HOISE MAMAA");
      // var idEdit = $("input[name=IDEdit]").val();
      var TrackIDEdit = $("input[name=TrackIDEdit]").val();
      var DeviceIDEdit = $("input[name=DeviceIDEdit]").val();
      var DeviceVendorEdit = $("input[name=DeviceVendorEdit]").val();
      var deviceModelEdit = $("input[name=deviceModelEdit]").val();
      var DeviceSerialEdit = $("input[name=DeviceSerialEdit]").val();
      var MemoEdit = $("input[name=MemoEdit]").val();

      //console.log(deviceRatingEdit);

      var temp = $("#csvRoot").DataTable().row(row_index).data();
      console.log("ata data before edit-> " + temp + " -> ");
      temp[0] = TrackIDEdit;
      temp[1] = DeviceIDEdit;
      temp[2] = DeviceVendorEdit;
      temp[3] = deviceModelEdit;
      temp[4] = DeviceSerialEdit;
      temp[5] = MemoEdit;
      console.log("ata data after edit-> " + temp + " -> ");
      var tableRow = row_index; // GET TABLE ROW NUMBER
      // Updating existed row data with new data and row number
      $("#csvRoot").dataTable().fnUpdate(temp[0], [tableRow], 0, true);
      $("#csvRoot").dataTable().fnUpdate(temp[1], [tableRow], 1, true);
      $("#csvRoot").dataTable().fnUpdate(temp[2], [tableRow], 2, true);
      $("#csvRoot").dataTable().fnUpdate(temp[3], [tableRow], 3, true);
      $("#csvRoot").dataTable().fnUpdate(temp[4], [tableRow], 4, true);
      $("#csvRoot").dataTable().fnUpdate(temp[5], [tableRow], 5, true);

      $("#editModalClose").click();

      $("input[name=TrackIDEdit]").val("");
      $("input[name=DeviceIDEdit]").val("");
      $("input[name=DeviceVendorEdit]").val("");
      $("input[name=deviceModelEdit]").val("");
      $("input[name=DeviceSerialEdit]").val("");
      $("input[name=MemoEdit]").val("");
    });
  });
});

// For Inserting New Row
$(document).ready(function () {
  $("#InsertForm").submit(function (event) {
    // alert("Handler for .submit() called.");
    event.preventDefault();
    // let time = new Date($.now());
    // let id =
    //   time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    let TrackID = $("input[name=TrackID]").val();
    let DeviceID = $("input[name=DeviceID]").val();
    let DeviceVendor = $("input[name=DeviceVendor]").val();
    let DeviceModel = $("input[name=DeviceModel]").val();

    let DeviceSerial = $("input[name=DeviceSerial]").val();
    let Memo = $("input[name=Memo]").val();

    var NewROW = `<td class="table-data sorting_1" contenteditable="false">${TrackID}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceID}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceVendor}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceModel}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceSerial}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${Memo}</td>                                    
                              
                        <td>
                          <div class="actionOptions">
                            
                              <button class="editbtn btn btn-primary" data-toggle="modal" data-target="#editModal">Edit</button>
                            
                             
                              <button class="deleteRow btn btn-danger">Delete</button>
                           
                          </div>
                        </td>    `;

    $("#csvRoot")
      .DataTable()
      .row.add($("<tr> " + NewROW + " </tr>"))
      .draw();

    $("#closeInsertModal").click();

    $("input[name=TrackID]").val("");
    $("input[name=DeviceID]").val("");
    $("input[name=DeviceVendor]").val("");
    $("input[name=deviceModel]").val("");
    $("input[name=DeviceSerial]").val("");
    $("input[name=Memo]").val("");

    // scrolling to the bottom for every new row entry starts
    var $scrollBody = $($("#csvRoot").DataTable().table().node()).parent();
    $scrollBody.scrollTop($scrollBody.get(0).scrollHeight);
    // scrolling to the bottom for every new row entry ends

    // Needs to re calculate the rows number and empty rows number Starts
    let totalData = $("#csvRoot").DataTable().data().count();
    let iColumns = $("#csvRoot thead th").length;
    let totalRow = totalData / iColumns;

    $("#TotalNumberOfTrackID").text(totalRow);
    $("#TotalNumberOfEmptyTrackID").text(totalRow);

    let totalEmptyRows = $("#csvRoot tr td:first-child:empty").length;
    $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
    // Needs to re calculate the rows number and empty rows number Ends
  });
});

// Adding new File
$(document).ready(function () {
  $("#ImportAnotherFileButton").click(function () {
    localStorage.setItem("newFile", "1");
    location.reload();
  });

  if (localStorage.getItem("newFile") === "1") {
    $("#startTrackingByFileButton").click();
    localStorage.setItem("newFile", "0");
    localStorage.setItem("UploadNewFile", "0");
  }
});
