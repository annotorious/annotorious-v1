
//select_box options for selection tag name. hjkim
function annotorious_changeToTagList() {
	$('.annotorious-editor-text.goog-textarea')
		.replaceWith("<select id='selectTagName'>" + 
		$(this).text() + "</select>");


	var tagNames = ["Button", "White", "RedFlower",
		"GreenFlower", "WhiteFlower", "Branch", "Bubble"];

	tagNames.forEach(tag => {
		var typeOption = document.createElement('option');
		var tagOption = document.createTextNode(tag);
		typeOption.appendChild(tagOption);
		document.getElementById("selectTagName").appendChild(typeOption);
	});
}
