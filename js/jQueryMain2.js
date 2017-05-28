var pageCounter = 1;
var animalContainer = $("#animal-info");


$("#btnFetch").click(function(e){
	//e.preventDefault();
	var request = $.ajax({
		url:'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json',
		method: 'GET', //use type for jquery less than 1.9.0
		dataType: 'json'
	});
	request.done(function (response){ //success was replace by done
		renderHTMLwithjQuery(response);
	});
	request.fail(function(jqXHR, textStatus){ //error was replace by fail
		console.log("Request Failed with a status of: " + jqXHR.status + "|| Error Message: " + textStatus); //jqXHR properties: readyState, status, statusText, responseXML
	});
	//This is just an example of the always function with can be use instead of done and fail
	request.always(function (data, textStatus, jqXHR){
		console.log(data);
		console.log(textStatus);
		console.log(jqXHR.status);

	});
	//The jqXHR.success(), jqXHR.error(), and jqXHR.complete() callbacks will be deprecated in jQuery 1.8. 
	//To prepare your code for their eventual removal, use jqXHR.done(), jqXHR.fail(), and jqXHR.always() instead.	
	pageCounter++;
	if (pageCounter > 3){
		$("#btnFetch").addClass("hide-me");
	}
});

function renderHTML(data){

	var htmlString = "";
	for(i = 0; i < data.length; i++){
		htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

		for (k = 0; k < data[i].foods.likes.length; k++){
			if(k == 0){
				htmlString += data[i].foods.likes[k];
			}
			else{
				htmlString += " and " + data[i].foods.likes[k];
			}
		} 
		htmlString += " and dislikes ";

		for (k = 0; k < data[i].foods.dislikes.length; k++){
			if(k == 0){
				htmlString += data[i].foods.dislikes[k];
			}
			else{
				htmlString += " and " + data[i].foods.dislikes[k];
			}
		} 

		htmlString += ".</p>";
	}
	$("#animal-info").append(htmlString);
}
function renderHTMLwithjQuery(data){

	var htmlString = "";

	$.each(data, function(index, value){
		htmlString += "<p>" + data[index].name + " is a " + data[index].species + " that likes to eat ";

		$.each(data[index].foods.likes, function(key, value){
			if(key == 0){
				htmlString += data[index].foods.likes[key];
			}
			else{
				htmlString += " and " + data[index].foods.likes[key];
			}

		});
		
		htmlString += " and dislikes ";

		$.each(data[index].foods.dislikes, function(key, value){
			if(key == 0){
				htmlString += data[index].foods.dislikes[key];
			}
			else{
				htmlString += " and " + data[index].foods.dislikes[key];
			}

		});

	});
	$("#animal-info").append(htmlString);
}