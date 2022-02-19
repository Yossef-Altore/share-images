const email = document.querySelector("#email");
const psw = document.querySelector("#psw");
const adminEnterBtn = document.querySelector("#adminEnterBtn");

//admin login
adminEnterBtn.addEventListener("click", () => {
  try {
    fetch("/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: psw.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.msg = "validadmin")) {
          window.location = data.redirect;
        }
      });
  } catch (e) {
    console.log(e);
  }
});
