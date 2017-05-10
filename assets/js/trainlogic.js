var config = {
    apiKey: "AIzaSyCa_K9VqM4u0z2LFJr9c6FHFjTNf1vR_lA",
    authDomain: "traintime-ff102.firebaseapp.com",
    databaseURL: "https://traintime-ff102.firebaseio.com",
    projectId: "traintime-ff102",
    storageBucket: "traintime-ff102.appspot.com",
    messagingSenderId: "165556101699"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //Form grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-time-input").val().trim(), "HH:mm").format("h:mm A");    
  var trainFrequency = parseInt($("#frequency-input").val().trim());
  var nextTrain = parseInt($("#first-train-time-input").val().trim()) + parseInt($("#frequency-input").val().trim());
  var nextTrainAA = moment($(nextTrain, "HH:mm")).format("h:mm A");

//  alert("train name " + trainName);

	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		firstTrain: firstTrain,
		frequency: trainFrequency,
        nextTrain: nextTrain
	};
 
    database.ref().push(newTrain);

//clear input boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");  

//adding trains to FB
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
        
//store train info into variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;
        
//calculate Next Arrival and Minutes Away
    var diffInTimes = moment().diff(moment.firstTrain, "minutes");
	var timeRemainder = moment().diff(moment.firstTrain, "minutes") % trainFrequency ;
	var timeMin = trainFrequency - timeRemainder;
    console.log(timeMin);
        
//calculate Time of Arrival     
    var timeOfArrival = moment().add(timeMin, "m").format("hh:mm A"); 
    console.log(timeOfArrival);
        
//add train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + timeOfArrival + "</td><td>" + timeMin + "</td><td>");
    })
});


    







 
    
    