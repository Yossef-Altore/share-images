const email = document.querySelector("#loginEmail");
const password = document.querySelector("#loginPassword");
const checkBox = document.querySelector("#flexCheckChecked");
const loginBtn = document.querySelector("#loginBtn");
const handleMsg = document.querySelector("#handleMsg");

loginBtn.addEventListener("click", async () => {
  try {
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Email or Password are not correct") {
          handleMsg.innerHTML =
            '<h6 style="color:red">Email or Password are not correct</h6>';
          return;
        }
        if (data.msg === "validUser") {
          window.location = data.redirect;
        }
      });
  } catch (e) {
    console.log(e);
  }
});
