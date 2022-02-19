const registerBtn = document.querySelector("#registerBtn");
const userEmail = document.querySelector("#userEmail");
const userName = document.querySelector("#userName");
const userPassword = document.querySelector("#userPassword");
const flexCheckChecked = document.querySelector("#flexCheckChecked");
const resHandler = document.querySelector("#resHandler");

//- -- - - - - - - - - - - - - - - - - - - register

registerBtn.addEventListener("click", async () => {
  if (
    userEmail.value == "" ||
    userName.value == "" ||
    userPassword.value == ""
  ) {
    resHandler.innerHTML =
      '<h6 style="color:red">All fields are required!</h6>';
    return;
  }
  if (userPassword.value.length < 6) {
    resHandler.innerHTML =
      '<h6 style="color:red">Password must be at least 6 characters</h6>';
    return;
  }
  if (!flexCheckChecked.checked) {
    resHandler.innerHTML =
      '<h6 style="color:red">Please check the statement box</h6>';
    return;
  }
  resHandler.innerHTML = "";
  await fetch("/registerNewUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.msg === "user registered") {
        window.location = data.redirect;
      }
      if (data.msg === "email is not valid") {
        resHandler.innerHTML = '<h6 style="color:red">Email is not valid</h6>';
      }
      if (data.msg === "email already exists") {
        resHandler.innerHTML =
          '<h6 style="color:red">Email already exists</h6>';
      }
    })
    .catch((e) => {
      alert(e);
    });
});
