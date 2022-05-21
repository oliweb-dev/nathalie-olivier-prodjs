class Game {
   constructor(cardsNb) {
      this.cardsNb = cardsNb;
      this.cardsArray = [];
      this.selectedCardsArray = [];
      this.attempts = 0;
   }

   init() {
      this.cardLeft = this.cardsNb;
      this.attempts = 0;
      this.setPicturesArray();
   }

   getCard(idCarte) {
      const index = this.cardsArray.findIndex((c) => c.id === idCarte);
      if (index === -1) return false;
      return this.cardsArray[index];
   }

   checkSelectedCards(idCarte) {
      this.setSelectedCardsArray(idCarte);
      if (this.selectedCardsArray.length === 2) {
         this.attempts += 1;
         if (this.selectedCardsArray[0].card.picture.id === this.selectedCardsArray[1].card.picture.id) {
            this.cardLeft -= 2;
            result = this.setResult("found", this.selectedCardsArray, this.attempts);
         } else {
            result = this.setResult("notFound", this.selectedCardsArray, this.attempts);
         }
         this.selectedCardsArray = [];
         if (this.cardLeft === 0) {
            result = this.setResult("win", this.selectedCardsArray, this.attempts);
         }
         return result;
      }
   }

   setResult(label, selectedCards, attempts) {
      return {
         state: label,
         selectedCards: selectedCards,
         attempts: attempts,
      };
   }

   setSelectedCardsArray(idCarte) {
      this.selectedCardsArray.push({
         card: this.getCard(idCarte),
      });
   }

   shuffle() {
      this.picturesArray = this.picturesArray.sort(() => this.getRandomInt(this.picturesArray.length));
      this.cardsArray = [];
      let indexPic = 0;
      let cpt = 1;
      for (let i = 0; i < this.cardsNb; i++) {
         this.cardsArray.push({
            id: i,
            picture: this.picturesArray[indexPic],
         });
         if (cpt === 2) {
            indexPic++;
            cpt = 0;
         }
         cpt++;
      }
      this.cardsArray = this.cardsArray.sort(() => this.getRandomInt(5));
      return this.cardsArray;
   }

   setPicturesArray() {
      this.picturesArray = [];
      this.picturesArray.push(
         {id: 0, img: "🥝"},
         {id: 1, img: "🍍"},
         {id: 2, img: "🍇"},
         {id: 3, img: "🍉"},
         {id: 4, img: "🍏"},
         {id: 5, img: "🍙"},
         {id: 6, img: "🍧"},
         {id: 7, img: "🌺"},
         {id: 8, img: "🌮"},
         {id: 9, img: "🌈"},
         {id: 10, img: "🌟"},
         {id: 11, img: "🏵"},
         {id: 12, img: "🍭"},
         {id: 13, img: "🌴"},
         {id: 14, img: "🍕"},
         {id: 15, img: "🍱"},
         {id: 16, img: "🍂"},
         {id: 17, img: "☕"},
         {id: 18, img: "🍰"},
         {id: 19, img: "🥐"},
         {id: 20, img: "🍀"}
      );
   }

   getRandomInt(max) {
      return Math.floor(Math.random() * max);
   }
}
