var pageCounter = 1;
var animalContainer = $("#animal-info");


$("#btnFetch").click(function(e){
	//e.preventDefault();
	var request = $.ajax({
		url:'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json',
		type: 'GET',
		dataType: 'json',
		
		error: function (response){
			console.log("Bad connection or data, timeout, invalid url error!" + response.status);
		},
		success: function (response){
			renderHTMLwithjQuery(response);
		}

	});

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
	//$("#animal-info").html(htmlString); //This will overide the result and show only one at a time
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