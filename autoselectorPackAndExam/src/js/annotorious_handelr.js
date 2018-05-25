// create by hjKim. KOOKMIN UNIV.
// Annotorious Coustom version.
// + auto_selector.js <-- applied prototype annotorious.

/* Annotorious Initialize */
function init(){

	anno.makeAnnotatable(document.getElementById('preview'));
	
	anno.addHandler('onAnnotationCreated', function(annotation){
		//console.log(annotation.text);
		getData(annotation);
	});
	anno.addHandler('onAnnotationUpdated', function(annotation){
		deleteData(annotation);
		getData(annotation);
	});
	
	adding_customModule();	
	
};

function adding_customModule(){
	
	annotorious_changeToTagList();
	anno.addPlugin('autoSelector', { activate: true });
	//anno.addPlugin('PolygonSelector', { activate: true });

};

/* delet annotation data */
function deleteData(annotation){

        text = annotation.text
        sourceImage = annotation.src;
        geometry = annotation.shapes[0].geometry;
	var name = sourceImage.split("/");
	var url = window.location.href + "jsondata/" +
		name[name.length-1].split(".")[0] + ".json";
	
	$.getJSON({
		method:"POST",
		url: url,
		contentType: "text/plain ; charset=utf-8", 
		dataType: 'text',
		success: function(jsonData){
			// cuuren not json data
			// please change to json.
			console.log(jsonData);
			},
		error: function(jsonData,error,status){
			console.log(error + "  " + status);
			//console.log(jsonData.responseText);
		}
	});	
}

/* get annotation data */
function getData(annotation){

	text = $("#selectTagName option:checked").text();
	
	annotation.text = text;
	sourceImage = annotation.src;
	geometry = annotation.shapes[0].geometry; // annotation shanpes is array form. 
	// and you want to get the geometry, must be toget previous row.
	changeJson(text, sourceImage, geometry);
};

/* file create function */
function changeJson(text, sourceImage, geometry){
	var annotationInfo = new Object();
	annotationInfo.tag = text;
	annotationInfo.timeStamp = new Date().getTime();
	annotationInfo.anno = geometry;
	annotationInfo.imageLocation = sourceImage;
	
	var name = sourceImage.split("/");
	console.log(name[name.length-1].split(".")[0]);
	
	var toJson = JSON.stringify(annotationInfo);
	console.log("test 1 : " + toJson);

	//if(sourceImage != 
	var addJson  = addJsonData(toJson, name[name.length-1].split(".")[0]);

}


function addJsonData(toJson, name){
	var req = new XMLHttpRequest();
	var url = window.location.href + "/php/formToJson.php";

	// why don't use XMLHttpRequests????
	//
	//	req.open("POST", url, true);
	//	req.onreadystatechange = function(){
	//		if(this.status == 200){
	//			console.log("test");
	//		}
	//	
	//	};
	//	sort = "data=".concat(toJson);
	//	console.log(sort);
	//	req.send("data=stringdata");

	// POST send
	$.ajax({
		data: 'data=' + toJson + "&name=" + name,
		url: url,
		method: 'POST',
		success: function(msg){
			console.log("test 2 : " + msg);
		}

	});
}


/*	 autocomplete example */
/* 
   var completedText;
   if (opt == 1){
   completedText = [
   "apple",
   "green",
   "red"
   ];
   };

   };

   $( "#annoTag" ).autocomplete({
source: completedText
});
};
 */

