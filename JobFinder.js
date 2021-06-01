#!usr/bin/env/ node

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

const fetch = require('node-fetch');

function askAddy(){
	readline.question("Enter a 5 digit zipcode to search for a job: ", zipCode => FindViaZip(zipCode));
}

function tryAgain(){
	readline.question("That's not valid input. Input a zip code that is 5 digits and has job listings: ", zipCode => FindViaZip(zipCode));
}

function FindViaZip(zipCode){
	let longitude;
	let latitude;
	//let myType = parseInt(zipCode).toString();
	if(zipCode.length != 5 || parseInt(zipCode).toString().includes('NaN' )) {
		tryAgain();
	}
	else{
		fetch("https://api.zippopotam.us/us/" + zipCode)
			.then(response => response.json())
			.then(data => {
			longitude = (data.places[0].longitude);
			latitude = (data.places[0].latitude);
			JobFetch(zipCode, longitude, latitude);
		});
	}
		
}

function JobFetch(zipCode, longitude, latitude){
	fetch("https://jobs.github.com/positions.json?lat=" + latitude + "8&long=" + longitude)
		.then(response => response.json())
		.then(data => {
			if(data == ""){
				tryAgain();
			}
			else{
				console.log("\nThe zip code used for the job search: " + zipCode + "\n" + data[0].location);
				console.log("==============================\n" );
				console.log("Company: " + data[0].company);
				console.log("Job Type: " + data[0].type);
				console.log("Title: " + data[0].title);
				console.log("\nDescription: \n" + data[0].description);
				console.log("\n=============================");
				readline.close();
			}
		});
}


askAddy();
