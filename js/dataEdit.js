// function listenForDoubleClick(element) {
//     element.contentEditable = true;
//     setTimeout(function() {
//       if (document.activeElement !== element) {
//         element.contentEditable = false;
//       }
//     }, 300);
//   }


//   $('#csvRoot').SetEditable({ $addButton: $('#addNewRow')});


$(document).ready(function () {
  $("#csvRoot").on("click", ".editbtn",function () {
      var currentTD = $(this).parents('tr').find('td');
      console.log(currentTD);
      if ($(this).html() == 'Edit') {
          currentTD = $(this).parents('tr').find('td');
          $.each(currentTD, function () {
              $(this).prop('contenteditable', true);
              $(this).prop("className", "contentEditableStyle");
              $('.editbtn').prop('contenteditable', false);
              $('.deleteRow').prop('contenteditable', false);
              $('.editbtn').closest( "td" ).removeClass('contentEditableStyle');
              
             
              
          });
      } else {
         $.each(currentTD, function () {
              $(this).prop('contenteditable', false);
              $(this).removeClass('contentEditableStyle');
              
          });
      }

      $(this).html($(this).html() == 'Edit' ? 'Save' : 'Edit')

  });

});
