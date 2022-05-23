const gameHtml = document.getElementById("game");
const infoHtml = document.getElementById("info");
const scoreHtml = document.getElementById("score");
const btnStartHtml = document.getElementById("btnStart");
let startTime = 0;
let isSelected = false;
let result = undefined;
const game = new Game(6);

const setCardToRed = (id) => {
   const cardHtml = document.getElementById(`card-${id}`);
   cardHtml.classList.replace("cardGreen", "cardRed");
};

const removeEventCard = (id) => {
   const cardHtml = document.getElementById(`card-${id}`);
   cardHtml.removeEventListener("click", handleClick);
   cardHtml.style.cursor = "auto";
};

const addEventCard = (id) => {
   const cardHtml = document.getElementById(`card-${id}`);
   cardHtml.addEventListener("click", handleClick);
   cardHtml.style.cursor = "pointer";
};

const hideValueCard = (id) => {
   const card = game.getCard(id);
   const cardHtml = document.getElementById(`card-${card.id}`);
   cardHtml.innerHTML = ""; //card.picture.img;
   cardHtml.classList.remove("cardGreen", "cardRed");
   cardHtml.classList.add("cardBack");
};

const displayValueCard = (id) => {
   const card = game.getCard(id);
   const cardHtml = document.getElementById(`card-${card.id}`);
   cardHtml.innerHTML = card.picture.img;
   cardHtml.classList.replace("cardBack", "cardGreen");
};

const displayResults = (attempts) => {
   let endTime = Date.now();
   let timeInSeconds = Math.floor((endTime - startTime) / 1000);
   infoHtml.innerText = `Bravo, vous avez gagné  !`;
   scoreHtml.innerHTML = `Stats: ${attempts} coups et ${timeInSeconds} secondes`;
};

const notFound = (result) => {
   for (let c of result.selectedCards) {
      setCardToRed(c.card.id);
   }
   setTimeout(() => {
      for (let c of result.selectedCards) {
         hideValueCard(c.card.id);
         addEventCard(c.card.id);
         isSelected = false;
      }
   }, 2000);
};

const win = (result) => {
   displayResults(result.attempts);
   isSelected = false;
};

const handleClick = (event) => {
   const idHtml = event.currentTarget.id;
   const id = parseInt(idHtml.split("-").at(1));
   if (!isSelected) {
      displayValueCard(id);
      removeEventCard(id);
      result = game.checkSelectedCards(id);
   }
   if (typeof result !== "undefined" && !isSelected) {
      isSelected = true;
      switch (result.state) {
         case "found":
            isSelected = false;
            break;
         case "notFound":
            notFound(result);
            break;
         case "win":
            win(result);
            break;
      }
   }
};

const displayGame = (cards) => {
   for (let c of cards) {
      const div = document.createElement("div");
      //div.innerText = c.picture.img;
      div.setAttribute("id", `card-${c.id}`);
      div.classList.add("cardBack");
      div.addEventListener("click", handleClick);
      gameHtml.append(div);
   }
};

const init = () => {
   btnStartHtml.innerText = "Recommencer";
   infoHtml.innerText = "";
   scoreHtml.innerText = "";
   gameHtml.innerHTML = "";
   startTime = Date.now();
};

const start = () => {
   init();
   game.init();
   const cards = game.shuffle();
   displayGame(cards);
};

btnStartHtml.addEventListener("click", start);
