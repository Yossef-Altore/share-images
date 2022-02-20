const inputFile = document.querySelector("#uploadImage");
const myImagesBtn = document.querySelector("#myImagesBtn");
const imagesHandler = document.querySelector("#imagesHandler");
const divForBigImage = document.querySelector("#divForBigImage");
const bigImage = document.querySelector("#bigImage");
const header = document.querySelector("header");
const main = document.querySelector("main");
const closeBigImage = document.querySelector("#closeBigImage");
const allImagesBtn = document.querySelector("#allImagesBtn");
const uploadingGif = document.querySelector("#uploadingGif");

///--- resize the image , show original image in big div

const imagesResize = () => {
  let userImage = document.querySelectorAll(".userImage");
  userImage.forEach((elem) => {
    elem.addEventListener("click", () => {
      let newSrc = elem.src.split("resized/").pop();
      divForBigImage.style.visibility = "visible";
      bigImage.src = `usersImages/original/${newSrc}`;
      main.style.opacity = "0.3";
      header.style.opacity = "0.3";
    });
  });
};

//----------- close big image div and fix the opacity for main and for header
closeBigImage.addEventListener("click", () => {
  divForBigImage.style.visibility = "hidden";
  main.style.opacity = "1";
  header.style.opacity = "1";
  bigImage.src = "";
});

// -------------------------adding an image
const data = new FormData();
inputFile.addEventListener(
  "change",
  async () => {
    uploadingGif.style.display = "block";
    data.append("file", inputFile.files[0]);
    try {
      fetch("/addImage", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          uploadingGif.style.display = "none";
          return res.json();
        })
        .then((res) => {
          alert(res.msg);
          data.delete("file");
        });
    } catch (e) {
      console.log(e);
      data.delete("file");
    }
  },
  false
);

//---------------------------------------- getting private images
myImagesBtn.addEventListener("click", async () => {
  try {
    fetch("/userpage/myimages")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          return alert("You don't have images yet! Start uploading ");
        }
        const paths = data.map((data) => data.src);
        imagesHandler.innerHTML = "";
        for (let i = 0; i < paths.length; i++) {
          imagesHandler.innerHTML += `
          <img src="usersImages/resized/${paths[i]}" alt="" class="userImage""/>
          `;
        }
        imagesResize();
      });
  } catch (e) {
    console.log(e);
  }
});

//---------------------------------------- getting all images
allImagesBtn.addEventListener("click", async () => {
  try {
    fetch("/userpage/allimages")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          return alert("No images yet! Be the first to upload");
        }
        const paths = data.map((data) => data.src);
        imagesHandler.innerHTML = "";
        for (let i = 0; i < paths.length; i++) {
          imagesHandler.innerHTML += `
          <img src="usersImages/resized/${paths[i]}" alt="" class="userImage""/>
          `;
        }
        imagesResize();
      });
  } catch (e) {
    console.log(e);
  }
});
