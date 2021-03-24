function listenForDoubleClick(element) {
    element.contentEditable = true;
    setTimeout(function() {
      if (document.activeElement !== element) {
        element.contentEditable = false;
      }
    }, 300);
  }


  