var firebaseConfig = {
      apiKey: "AIzaSyDASRRoHb7UzEe_-PYMTEtQ2YEro_GPOgA",
      authDomain: "kwitter-2b2dd.firebaseapp.com",
      databaseURL: "https://kwitter-2b2dd-default-rtdb.firebaseio.com",
      projectId: "kwitter-2b2dd",
      storageBucket: "kwitter-2b2dd.appspot.com",
      messagingSenderId: "761959683009",
      appId: "1:761959683009:web:a86d60a129d5592df65540"
};

firebase.initializeApp(firebaseConfig);
User = localStorage.getItem("user_name");
Room = localStorage.getItem("Roomname");




function send() {
      msg = document.getElementById("send-box").value;
      firebase.database().ref(Room).push({
            name: User,
            message: msg,
            like: 0
      });
      document.getElementById("send-box").innerHTML = "";
}























function getData() {
      firebase.database().ref("/" + Room).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;

                        //Start code
console.log(firebase_message_id);
console.log(message_data);
name1=message_data["name"];
message=message_data["message"];
like=message_data["like"];
name_with_tag="<h4>"+name1+"<img class='user_tick' src='tick.png'>"+"</h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
like_with_tag="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+"onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like: "+ like+ "</span> </button> <hr>";
row=name_with_tag+message_with_tag+like_with_tag+span_with_tag;
document.getElementById("output").innerHTML+=row;



                   //End code
                  }
                  
            });
      });
}

function updateLike(message_id){
console.log(message_id);
likes=document.getElementById(message_id).value;
updated_likes=Number(likes)+1;
console.log(updated_likes);
firebase.database().ref(Room).child(message_id).update({
      like:updated_likes
});
}


function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("Roomname");
      window.location="index.html";
}
getData();