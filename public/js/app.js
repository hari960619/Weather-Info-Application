let weatherForm = document.querySelector("form");
let search = document.querySelector("input");

let messageOne = document.querySelector("#messageOne");
let messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = search.value;

    messageOne.textContent = `Loading..`;
    messageTwo.textContent = ``;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
          if (data.error) {
              messageOne.textContent = data.error;
          messageTwo.textContent = ``;
          search.value = "";
        } else {
          messageOne.textContent = data.ForeCast;
          messageTwo.textContent = data.Place_Name;
          search.value = "";
        }
      });
    }
  );
});
