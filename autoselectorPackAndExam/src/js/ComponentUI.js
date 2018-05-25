// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    //document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    //document.getElementById("myOverlay").style.display = "none";
}

function croppedPageSelectList() {
    var patternName = ["Dots", "RedFlower", "GreenFlower",
                       "WhiteFlower", "Branch", "Bubble"];

    patternName.forEach(pattern => {
        /*
          {name : "", Done : "false or true"}
        */
        var tag = '<option>' + pattern + '</option>'
        $("#imgSelect").append(tag);

    });
}

function loadCroppedImages() {
    const url = "/php/readCroppedFile.php";
    var isSelection = document.getElementById("imgSelect");
    var opt = isSelection.value;

    if (opt != '') {
        // POST send
        $.ajax({
            data: 'data=' + opt,
            url: url,
            method: 'GET',
            success: function (msg) {
                $(gridView(msg));
            }

        });
      }
}


