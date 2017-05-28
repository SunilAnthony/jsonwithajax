var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btnFetch");

btn.addEventListener("click", function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
	ourRequest.onload = function(){
		if(ourRequest.status >= 200 && ourRequest.status < 400){
			var ourData = JSON.parse(ourRequest.responseText);
			renderHTML(ourData);
		}
		else{
			console.log("We connected to the server but ran into an error!");
		}

	};
	ourRequest.onerror = function(){
		console.log("Connection Error");
	}
	ourRequest.send(); //Sends the request to the server (used for GET)
	pageCounter++;
	if (pageCounter > 3){
		btn.classList.add("hide-me");
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
	animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
