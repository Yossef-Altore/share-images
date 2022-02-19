const getAllUsers = document.getElementById("AllUsers");
const getAllImages = document.getElementById("AllImages");
const deleteAllUsers = document.getElementById("deleteAllUsers");
const deleteAllImages = document.getElementById("deleteAllImages");

// delete all users
deleteAllUsers.addEventListener("click", () => {
  try {
    fetch("/admin/control/deleteusers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("deleted " + data.msg + " " + "users");
      });
  } catch (e) {
    console.log(e);
  }
});

// delete all images

deleteAllImages.addEventListener("click", () => {
  try {
    fetch("/admin/control/deleteimages")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("deleted " + data.msg + " " + "images");
      });
  } catch (e) {
    console.log(e);
  }
});
