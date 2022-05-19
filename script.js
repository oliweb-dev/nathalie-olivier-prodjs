const gameHtml = document.getElementById("game");
const infoHtml = document.getElementById("info");
const scoreHtml = document.getElementById("score");
const btnHtml = document.getElementById("btn");
let cards = [];
const cardsPics = [];
let cardsSelected = [];
let cardsNb = 12;
let cardLeft;
let score = 0;
btnHtml.addEventListener("click", () => start());
let startTime;

cardsPics.push(
  { id: 0, img: "🥝" },
  { id: 1, img: "🍍" },
  { id: 2, img: "🍇" },
  { id: 3, img: "🍉" },
  { id: 4, img: "🍏" },
  { id: 5, img: "🍙" },
  { id: 6, img: "🍧" },
  { id: 7, img: "🌺" },
  { id: 8, img: "🌮" },
  { id: 9, img: "🌈" },
  { id: 10, img: "🌟" },
  { id: 11, img: "🍟" },
  { id: 12, img: "🍭" },
  { id: 13, img: "🌴" },
  { id: 14, img: "🍕" },
  { id: 15, img: "🍱" },
  { id: 16, img: "🍂" },
  { id: 17, img: "☕" },
  { id: 18, img: "🍰" },
  { id: 19, img: "🥐" },
  { id: 20, img: "🍀" }
);

const getRandomInt = (max) => Math.floor(Math.random() * max);

let selected = false;

const handleClick = (event) => {
  const idHtml = event.currentTarget.id;

  const id = parseInt(idHtml.split("-")[1]);
  const index = cards.findIndex((c) => c.id === id);
  if (index !== -1) {
    if (cardsSelected.length < 2) {
      cardsSelected.push({ card: cards[index], index: index });
      displayValueCard(cards[index]);
      removeEventCard(cards[index]);
    }

    if (cardsSelected.length === 2 && !selected) {
      selected = true;

      if (cardsSelected[0].card.value === cardsSelected[1].card.value) {
        // gagné
        setTimeout(
          function (arraySelected) {
            cardsSelected = [];
            selected = false;
          },
          100,
          cardsSelected
        );
        score++;
        cardLeft -= 2;
        if (cardLeft === 0) {
          displayResults(Math.floor((Date.now() - startTime) / 1000));
        }
      } else {
        // perdu
        for (c of cardsSelected) {
          redCard(c.card);
        }
        setTimeout(
          function (arraySelected) {
            for (c of arraySelected) {
              hideValueCard(c.card);
              addEventCard(c.card);
            }
            cardsSelected = [];
            selected = false;
          },
          2000,
          cardsSelected
        );
        score++;
      }
    }
  }
};

const displayResults = (s) => {
  infoHtml.innerText = `Bravo, vous avez gagné  !`;
  scoreHtml.innerHTML = `Stats: ${score} coups et ${s} secondes`;
};

const redCard = (card) => {
  const cardHtml = document.getElementById(`c-${card.id}`);
  cardHtml.classList.replace("color2", "color3");
};

const removeEventCard = (card) => {
  const cardHtml = document.getElementById(`c-${card.id}`);
  cardHtml.removeEventListener("click", handleClick);
  cardHtml.style.cursor = "auto";
};

const addEventCard = (card) => {
  const cardHtml = document.getElementById(`c-${card.id}`);
  cardHtml.addEventListener("click", handleClick);
  cardHtml.style.cursor = "pointer";
};

const hideValueCard = (card) => {
  const cardHtml = document.getElementById(`c-${card.id}`);
  //cardHtml.innerHTML = card.value;
  cardHtml.innerHTML = "";
  cardHtml.classList.remove("color2");
  cardHtml.classList.remove("color3");
  cardHtml.classList.add("color1");
};

const displayValueCard = (card) => {
  const cardHtml = document.getElementById(`c-${card.id}`);
  const index = cardsPics.findIndex((i) => i.id === card.value);
  if (index !== -1) {
    cardHtml.innerHTML = cardsPics[index].img;
    cardHtml.classList.replace("color1", "color2");
  }
};

const start = () => {
  btnHtml.innerText = "Recommencer";
  infoHtml.innerText = "";
  scoreHtml.innerText = "";
  score = 0;
  cardLeft = cardsNb;
  cards = [];
  for (let i = 0; i < cardsNb; i++) {
    cards.push({
      id: i,
      value: -1,
    });
  }

  let cardsNbBuffer = cardsNb / 2;
  while (cardsNbBuffer >= 1) {
    // Tirer une image au hasard
    let randomPic = getRandomInt(cardsPics.length - 1);
    // Image déjà utilisée ?
    let index = cards.findIndex((c) => c.value === randomPic);

    if (index === -1) {
      let index2 = cardsPics.findIndex((i) => i.id === randomPic);
      let picsId = cardsPics[index2].id;

      // Ajout carte 1
      // Trouver un emplacement libre
      let isAdded = false;
      while (!isAdded) {
        let randomCard = getRandomInt(cardsNb);
        let index2 = cards.findIndex(
          (c) => c.id === randomCard && c.value === -1
        );
        if (index2 !== -1) {
          cards[index2].value = picsId;
          isAdded = true;
        }
      }
      // Ajout carte 2
      // Trouver un emplacement libre
      isAdded = false;
      while (!isAdded) {
        let randomCard = getRandomInt(cardsNb);
        let index4 = cards.findIndex(
          (c) => c.id === randomCard && c.value === -1
        );
        if (index4 !== -1) {
          cards[index4].value = picsId;
          isAdded = true;
          cardsNbBuffer--;
        }
      }
    }
  }

  gameHtml.innerHTML = "";

  for (c of cards) {
    const div = document.createElement("div");
    //div.innerText = c.value;
    div.setAttribute("id", `c-${c.id}`);
    div.classList.add("color1");
    div.addEventListener("click", handleClick);
    gameHtml.append(div);
  }

  startTime = Date.now();
};
