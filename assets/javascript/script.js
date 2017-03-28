// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAd_YQjUHZZpxhkZduaheKMWCzk-PnY_oU",
    authDomain: "train-b1da4.firebaseapp.com",
    databaseURL: "https://train-b1da4.firebaseio.com",
    storageBucket: "train-b1da4.appspot.com",
    messagingSenderId: "121541857855"
  };
  firebase.initializeApp(config);

  // create var to ref database
  var database = firebase.database();

// Default values 
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;

// On click event for form
$("#submit").on("click", function(event) {
	event.preventDefault();

	// capture value in form fields and trim white space and add to divs in table

	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrainTime = $("#firstTrainTime").val().trim();
	frequency = $("#frequency").val().trim();

	// First Time (pushed back 1 year to make sure it comes before current time)
	    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	    //console.log(firstTimeConverted);

	    // Current Time
	    var currentTime = moment();
	    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	    // Difference between the times
	    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    //console.log("DIFFERENCE IN TIME: " + diffTime);

	    // Time apart (remainder)
	    var tRemainder = diffTime % frequency;
	    //console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = frequency - tRemainder;
	    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    nextTrain = moment(nextTrain).format("hh:mm");
	    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

		//database push to divs

		var trainAdded = { 
			trainName: trainName,
			destination: destination,
			frequency: frequency,
			nextTrain: nextTrain,
			MinutesTillTrain: tMinutesTillTrain
		};

		console.log(trainAdded);

		database.ref().push(trainAdded);

});


		//listens for when input is submitted to database
		
		database.ref().on("child_added", function(snapshot) {
			console.log(snapshot.val());

			var name = snapshot.val().trainName;
			var place = snapshot.val().destination;
			var time = snapshot.val().firstTrainName;
			var freq = snapshot.val().frequency;
			var next = snapshot.val().nextTrain;
			var min = snapshot.val().MinutesTillTrain;

			// add input to table

			$("#trainList").append(
				"<tbody><tr><td>" + name + "</td>" +
				"<td>" + place + "</td>" +
				"<td>" + freq + "</td>" +
				"<td>" + next + "</td>" + 
				"<td>" + min + "</td></tr></tbody>");
			});
