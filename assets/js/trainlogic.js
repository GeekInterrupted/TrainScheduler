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
    
//Adding trains to FB
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
        
//store train info into variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
        
//TODO calculate Next Arrival and Minutes Away
        

        
//add train's data into the table
         
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" );
        
        
        
        
        
    })
    
    
    
console.log(nextTrain); 
console.log(nextTrainAA);
    
});