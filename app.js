const plusTab = document.querySelector(".plus-tab");
const formDiv = document.querySelector("#formDiv");
let nameInput = document.getElementById("name");
let number = document.getElementById("number");
let day = document.getElementById("day");
let code = document.getElementById("code");
let month = document.getElementById("month");
let year = document.getElementById("year");
let image = document.querySelector(".imageInput");
let messageIcon = document.querySelector(".messageIcon");
const form = document.querySelector("#formTag");
const instructionDiv = document.querySelector(".instruction");
const presentBirthDayBtn = document.querySelector(".presntBdayBtn");
const wishIcon = document.querySelector(".wishesMsgIcon");
const welcome = document.querySelector(".welcome");
const notify = document.querySelector(".notify span");
const displayContainer = document.querySelector(".display-images");
const sliderCont = document.querySelector(".sliderCont");
const sliderPage = document.querySelector(".sliderPage");
let slidePosition = 0;
let imageUrl;
const randomNum = Math.floor(Math.random() * 100);
let currentYear = new Date().getFullYear();
const presentDate = new Date().getDate();
const presentMonth = new Date().getMonth() + 1;
const idNum = `${nameInput.value}${randomNum}`;
let birthday = JSON.parse(localStorage.getItem("birthDays")) || [];
let timeDisplay = document.querySelector(".time")
timeDisplay.textContent = `${presentDate}/${presentMonth}/${currentYear}`
console.log(code.value);
function instruct() {
  displayContainer.innerHTML = "";
  instructionDiv.classList.toggle("clenn")
  welcome.innerHTML = "";
  sliderPage.classList.remove("sliderClose")
  formDiv.classList.remove("formIn");
}
function showForm() {

  instructionDiv.classList.add("clenn")
  welcome.innerHTML = "";
  displayContainer.innerHTML = "";
  formDiv.classList.toggle("formIn");
  sliderPage.classList.remove("sliderClose")
}
function closeForm() {
  sliderPage.classList.remove("sliderClose")
  instructionDiv.classList.add("clenn")
  formDiv.classList.remove("formIn");
}

function showUrl() {
  image.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      imageUrl = reader.result;
    });
    reader.readAsDataURL(e.target.files[0]);
  });
}
showUrl();

form.addEventListener("submit", (e) => {
  const age = `Turns ${currentYear - year.value} Years Today`;
  e.preventDefault();
  const eachBirthDay = {
    name: nameInput.value,
    number: number.value,
    day: day.value,
    month: month.value,
    year: year.value,
    id: idNum,
    image: imageUrl,
    ageValue: age,
    codeVal: code.value,
  };
  birthday.push(eachBirthDay);
  localStorage.setItem("birthDays", JSON.stringify(birthday));
  e.target.reset();
  closeForm();
  welcome.innerHTML = "";
  notice();
});

const showItems = (bd, ageValue) => {
  instructionDiv.classList.add("clenn")
  sliderCont.innerHTML = "";
  const containerInner = document.createElement("div");
  const ImageDiv = document.createElement("p");
  const displayImg = document.createElement("img");
  const nameP = document.createElement("p");
  const ageP = document.createElement("p");
  callMsg = document.createElement("div");

  containerInner.classList.add("display-imageDiv");
  displayImg.classList.add("image-profile");
  ImageDiv.classList.add("image-profileDiv");

  displayContainer.appendChild(containerInner);
  containerInner.appendChild(ImageDiv);
  containerInner.appendChild(nameP);
  containerInner.appendChild(ageP);
  containerInner.appendChild(callMsg);
  ImageDiv.appendChild(displayImg);
  nameP.innerHTML = ` Name: ${bd.name}`;
  ageP.innerHTML = ageValue;
  displayImg.src = bd.image;
  container = containerInner;
};

function card() {
  formDiv.classList.remove("formIn");
  sliderPage.classList.remove("sliderClose")
  welcome.innerHTML = "List of Saved Bithday Celebrants";
  displayContainer.classList.remove("flex");
  displayContainer.innerHTML = "";
  //    if nothing is in the localStorage
  !localStorage.getItem("birthDays")
    ? console.log("null")
    : (birthday = JSON.parse(localStorage.getItem("birthDays")));
  birthday.forEach((bd) => {
    dateOfBirth = `BirthDay:${bd.day}/ ${bd.month}`;
    showItems(bd, dateOfBirth);
  });
}
messageIcon.addEventListener("click", card);

presentBirthDayBtn.addEventListener("click", () => {
let filt;
  sliderPage.classList.remove("sliderClose")
  formDiv.classList.remove("formIn");
  welcome.innerHTML = "list of Birthday Celebrant(s) Today";
  displayContainer.innerHTML = "";
  //    if nothing is in the localStorage
  !localStorage.getItem("birthDays")
    ? console.log("null")
    : (filt = JSON.parse(localStorage.getItem("birthDays")));
  const filterBirthday = filt.filter((h) => {
    if (h.month == presentMonth && h.day == presentDate) {
      displayContainer.innerHTML = "";
      return h;
    }else{
      displayContainer.innerHTML = " no birthday Today"
    }
  });
  filterBirthday.forEach((bd) => {
    ageValue = bd.ageValue;
    // callMsg = document.createElement("div");
    const callCont = document.createElement("p");
    const msgCont = document.createElement("p");
    const whatsCont = document.createElement("p");
    const aCall = document.createElement("a");
    const aMsg = document.createElement("a");
    const aWhats = document.createElement("a");
    const btnCall = document.createElement("button");
    const btnMsg = document.createElement("button");
    const btnWhats = document.createElement("button");
    const btnWhatsI = document.createElement("i");

    showItems(bd, ageValue);
    callMsg.appendChild(callCont);
    callMsg.appendChild(msgCont);
    callMsg.appendChild(whatsCont);
    callCont.appendChild(aCall);
    msgCont.appendChild(aMsg);
    whatsCont.appendChild(aWhats)
    aCall.appendChild(btnCall);
    aMsg.appendChild(btnMsg);
    aWhats.appendChild(btnWhats);
    btnWhats.appendChild(btnWhatsI)
    btnCall.innerHTML = "&#128222";
    btnMsg.innerHTML = "&#x2709;";
    btnWhatsI.classList.add("fa-whatsapp")
    callMsg.classList.add("callmsg");
    displayContainer.classList.add("flex");
    container.classList.add("clean");
    aCall.href = `Tel: ${bd.number}`;
    aMsg.href = `sms:${bd.codeVal}${bd.number}`;
    aWhats.href = `https://wa.me/${bd.codeVal}${bd.number}`;
    console.log(bd.codeVal);
  
  });
});

function msg() {
  formDiv.classList.remove("formIn");
  instructionDiv.classList.add("clenn")
  welcome.innerHTML = "Select and copy a wish/Msg to Clipboard";
  sliderPage.classList.add("sliderClose")
  displayContainer.innerHTML = "";
  const wishDisplay = birthdayWishes.map((msg) => {
    const {
      message,
      emoji1,
      emoji6YellowT,
      emoji2,
      emoji3,
      emoji4,
      cakeEmoji1,
      emoji5,
    } = msg;
    return `
      
      <div class="wishMsgDiv">
      <div class="myWish">
      <p id="wishInput">${cakeEmoji1}${message}</p>
      <p id="emoji">${emoji2}  ${emoji4} ${emoji5}${emoji6YellowT}</p>
      </div>  
     <div class="copyIconDiv"><p class= "copied"> </P> <button class="copyIcon">Copy</button></div>
  </div>
  </div>
  `;
  });
  sliderCont.innerHTML = wishDisplay.join("");
  // copy text
 let myWish = document.querySelector(".myWish");
  const copy = document.querySelectorAll(".copyIcon");
  copy.forEach((c) => {
    c.addEventListener("click", (e) => {
      myWish = myWish.textContent;
      navigator.clipboard.writeText(myWish);
    });
    
  });
  let slide = document.querySelectorAll(".wishMsgDiv");

  function slideActivator() {
    for (let i = 0; i < slide.length; i++) {
      slide[i].style.display = "none";
    }
    slidePosition++;
    if (slidePosition > slide.length) {
      slidePosition = 1;
    }
    slide[slidePosition - 1].style.display = "block";
  }
  slideActivator();
  setInterval(() => {
    slideActivator();
  }, 6000);

  let right = document.querySelector(".right");
  right.addEventListener("click", function () {
    slidePosition = slidePosition + 1;
    for (let index = 0; index < slide.length; index++) {
      slide[index].style.display = "none";
    }
    if (slidePosition > slide.length) {
      slidePosition = 1;
    }
    slide[slidePosition - 1].style.display = "block";
  });
  let left = document.querySelector(".left");
  left.addEventListener("click", function () {
    slidePosition = slidePosition - 1;
    for (let index = 0; index < slide.length; index++) {
      slide[index].style.display = "none";
    }
    if (slidePosition < 1) {
      slidePosition = slide.length;
    }
    slide[slidePosition - 1].style.display = "block";
  });
}

wishIcon.addEventListener("click", msg);

function notice() {
  !localStorage.getItem("birthDays")
    ? console.log("null")
    : (birthday = JSON.parse(localStorage.getItem("birthDays")));
  const filterBirthday = birthday.filter((h) => {
    if (h.month == presentMonth && h.day == presentDate) {
      return h;
    }
  });
  if (filterBirthday) {
    notify.innerHTML = filterBirthday.length;
  }
}
notice();
