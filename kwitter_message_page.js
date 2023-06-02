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

function loadMsgPg() {
  roomName = localStorage.getItem("roomName");
  document.getElementById("rm_name").innerHTML = roomName;
}

function addMsg() {
  roomName = localStorage.getItem("roomName");
  message = document.getElementById("message").value;
  firebase.database().ref("/").child(roomName).child("chats").update({
    message,
  });
  message = "";
  document.getElementById("message").innerHTML = "";
  getMsg();
}

function getMsg() {
  row = "";
  roomname = localStorage.getItem("roomName");
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("chats").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.key == roomName) {
          childSnapshot.forEach(function (innerSnapshot) {
            if (innerSnapshot.key == "chats") {
              innerSnapshot.forEach(function (innerinnerSnapshot) {
                row += innerinnerSnapshot.val();
              });
            }
          });
        }
      });
    });

  document.getElementById("chats").innerHTML = row;
}
