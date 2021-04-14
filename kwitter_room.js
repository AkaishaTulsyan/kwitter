var firebaseConfig = {
      apiKey: "AIzaSyDASRRoHb7UzEe_-PYMTEtQ2YEro_GPOgA",
      authDomain: "kwitter-2b2dd.firebaseapp.com",
      databaseURL: "https://kwitter-2b2dd-default-rtdb.firebaseio.com",
      projectId: "kwitter-2b2dd",
      storageBucket: "kwitter-2b2dd.appspot.com",
      messagingSenderId: "761959683009",
      appId: "1:761959683009:web:a86d60a129d5592df65540"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
username = localStorage.getItem("user_name")
document.getElementById("welcome").innerHTML = "Welcome " + username + "!";

function addRoom() {
      roomName = document.getElementById("RoomTextBox").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "addingRoom"
      });
      localStorage.setItem("Roomname", roomName);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML+=row;
                  //End code
            });
      });
}
getData();
function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("Roomname",name);
      window.location = "kwitter_page.html";
}
function logout(){
localStorage.removeItem("user_name");
localStorage.removeItem("Roomname");
window.location="index.html";
}