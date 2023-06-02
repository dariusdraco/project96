// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClN_NaNyxiJ2EM6TiEUx4NgbTJSkGa5ak",
  authDomain: "letschat-e89d7.firebaseapp.com",
  databaseURL: "https://letschat-e89d7-default-rtdb.firebaseio.com",
  projectId: "letschat-e89d7",
  storageBucket: "letschat-e89d7.appspot.com",
  messagingSenderId: "346455126255",
  appId: "1:346455126255:web:5341bd80f510e7e5fceb1a",
};

firebase.initializeApp(firebaseConfig);

function userIdLoad() {
  var userName = localStorage.getItem("username");
  document.getElementById("userId").innerHTML = "Welcome " + userName + " !!!!";
}

function addRoom() {
  var roomname = document.getElementById("room_name").value;
  purpose = document.getElementById("purpose").value;
  firebase.database().ref("/").child(roomname).update({
    purpose: purpose,
  });
  console.log("Added to firebase : " + roomname);
  roomname = "";
  document.getElementById("room_name").innerHTML = "";
  getData();
}

function logOut() {
  window.location = "index.html";
}

function getData() {
  row = "";
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        //Start code
        row +=
          "<div class='room_name' id=" +
          Room_names +
          " onclick='redirectToRoomName(this.id)'>#" +
          Room_names +
          "</div><br>";
        document.getElementById("output").innerHTML = row;
        //End code
      });
    });
}

function redirectToRoomName(roomId) {
  console.log("room name clicked " + roomId);
  localStorage.setItem("roomName", roomId);
  window.location = "kwitter_message_page.html";
}
