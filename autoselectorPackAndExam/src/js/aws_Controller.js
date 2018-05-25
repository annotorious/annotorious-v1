var imageLocation;
var nameList = [];
var isDone = [];
var WorkerId;

function accessClient(){
	var isSelection = document.getElementById("setClient");
	var opt = isSelection.value;
	if(opt != "") {
		WorkerId = opt.split('_')[1]
	}
	setTimeout(bodyOnLoaded(),300);
}

function clickDone(){
	const src = $("#preview")[0].src;
	let str = String(src).split("\/");
	var img = String(str[str.length - 1])
	console.log(WorkerId);

	var dynamodb = new AWS.DynamoDB();
	var parm = {
		Key: {
			"WorkerId":{
				S:"1"
			}
		},
		ExpressionAttributeNames:{
			"#img":img.split(".")[0],
		},
		ExpressionAttributeValues: {
			":img": {
				M: {
					"done": {
						S: "true"
					},
					"path": {
						S: "Images/example_folder/" + img
					}
				}
			}
		},
		UpdateExpression:"SET #img = :img",
		TableName : "simpleImgInfoTable_kookmin",
		ReturnValues : "UPDATED_OLD"
	};

	dynamodb.updateItem(parm, function(err, data){
		if(err) console.log("DynamoUpdate Error \n", err);
		else console.log("Done!");
	})
}

function loadThumbnail(){ $(getItemFromDDB()) }

function getItemFromDDB(){

	var dynamodb = new AWS.DynamoDB();

	var parm = {
		Key:{
			'WorkerId':{
				S:'1'
			}
		},
		TableName: 'simpleImgInfoTable_kookmin',
		//AttributesToGet:['image']
	};

	dynamodb.getItem(parm, function (err, data) {
		if (err) console.log("dynamoget Err", err);
		else {
			//console.log("getItems: \n", data);
			$(itemArray(data)).promise().done(setTimeout(function(){
				try {
					thumbnamePut();
				} catch(e) {
					// 예외처리를 이용--> case 구문으로 바꾸길 권장
					croppedPageSelectList();
				};
			},500));
		}
	});
}

function itemArray(data){
	$.each(data.Item, function(key, value){
		if(key != "WorkerId") {
			//console.log(value.M.path.S);
			nameList.push([value.M.path.S, value.M.done.S]);

		}
	});
	
}
