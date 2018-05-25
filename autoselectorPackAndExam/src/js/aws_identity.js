

function bodyOnLoaded(){
    var poolId = 'ap-northeast-2:2c838b20-2942-4a44-b7a2-c3d50438db93';
    //var poolId = 'ap-northeast-2:854534fd-1f1a-4d53-93ff-355277d4cb69';
    var mycred = new AWS.CognitoIdentityCredentials({
		region: 'ap-northeast-2',
		IdentityPoolId:poolId,
		RoleArn: 'arn:aws:iam::741926482963:role/hjkim_dynamodbAccess',
	});
	
	AWS.config.credentials = mycred;
	AWS.config.region = "ap-northeast-2";
	AWS.config.version = "latest";
	//getIdentity();
	$("#thumbnail_area").empty().promise()	
	.done(loadThumbnail());
}

function getIdentity(){
	/* 임시자격증명 ID 얻기 */
	AWS.config.credentials.get(function () {
		AWS.config.credentials.data.SubjectFromWebIdentityToken;
	});
}

