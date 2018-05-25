function gridView(msg){
    var itemArray = msg.split("\n");
    $("#gridViewBox").empty();
    if(itemArray == ''){
        return; // foreach 사용하지 않는 것이 좋다.
    }

    itemArray.forEach(item => {
	let len = item.split('/').length;

        if(item == '') return;
        $("#gridViewBox").append('<div class="gallery">' + '<a target="_blank" href="' + item + '">' +
        '<img class="w3-hover-opacity" ' + 'src="' + item +
        '" width="100%" height="100%"' + ' alt="test"> </a>' + 
	'<div class = "desc">' + (item.split("/")[len - 1]).split("_")[0] + '</div>' +
	'</div>'
        );
    });
};



