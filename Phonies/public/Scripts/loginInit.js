document.addEventListener("DOMContentLoaded", async (event) => {
  event.preventDefault()
  const data = await fetch("/api/users");
  const users =await data.json();
  const datau = localStorage.getItem("user");
  const user = JSON.parse(datau);
  console.log(users);


  const getPage = (a) => a.split("/").reduce((a, v) => v);
  const yourPath = getPage(window.location.pathname);
  const mainPath = "login.html";
  const prevData = localStorage.getItem("prevPath");
  const prevPath = JSON.parse(prevData);
  console.log("current :" + yourPath);
  console.log("previous:" + prevPath);
  document.querySelectorAll("form").disabled=true;
  //let openedWindow;
  //
  //function openWindow() {
  //  openedWindow = window.open(prevPath,"_self");
  //}
  //
  //function closeWindow() {
  //  openedWindow.close();
  //}
  //function refresh(){
  //    location.reload();
  //}
  //function setPrevPath(){
  //    localStorage.setItem("prevPath",JSON.stringify(mainPath));
  //}

  function log() {
    const checkUser = (use, pass) =>
      users.filter((v) => v.password == pass && v.username == use);


    const mainLink = document.querySelector(".mainLink");
    mainLink.addEventListener("click", (event) => {
      //setPrevPath();
    });

    const loginButton = document.querySelector("#loginButton");

    loginButton.addEventListener("click", (event) => {
      const pass = document.querySelector("#password").value;
      const username = document.querySelector("#username").value;
      if (pass !== "" && username !== "") {
        console.log(username, pass);
        let tempUser = checkUser(username, pass);
        console.log(tempUser);
        // If tempUser is an empty array, no user was found
        if (tempUser.length > 0) {
          alert("Login successful");
          localStorage.setItem("user", JSON.stringify(tempUser[0]));
          localStorage.setItem("prevPath", JSON.stringify(mainPath));
          window.open("./main.html");

          //close() //apply on main.html part
        } else {
          // Alert the user if login is incorrect
          alert("Incorrect username or password. Please try again.");
        }
      } else {
        // Alert the user if login is incorrect
        alert("No username or password. Please try again.");
      }
    });
  }

  log();
});
