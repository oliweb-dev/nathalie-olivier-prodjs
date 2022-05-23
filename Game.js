class Game {
   constructor(cardsNb) {
      this.cardsNb = cardsNb;
   }

   init() {
      this.cardsArray = [];
      this.selectedCardsArray = [];
      this.cardLeft = this.cardsNb;
      this.attempts = 0;
      this.setPicturesArray();
   }

   getCard(idCard) {
      const index = this.cardsArray.findIndex((c) => c.id === idCard);
      if (index === -1) return false;
      return this.cardsArray.at(index);
   }

   checkSelectedCards(idCard) {
      this.setSelectedCardsArray(idCard);
      if (this.selectedCardsArray.length === 2) {
         this.attempts++;
         if (this.selectedCardsArray.at(0).card.picture.id !== this.selectedCardsArray.at(1).card.picture.id) {
            result = this.setResult("notFound", this.selectedCardsArray, this.attempts);
         } else {
            this.cardLeft -= 2;
            if (this.cardLeft === 0) result = this.setResult("win", this.selectedCardsArray, this.attempts);
            else result = this.setResult("found", this.selectedCardsArray, this.attempts);
         }
         this.selectedCardsArray = [];
         return result;
      }
   }

   setResult(state, selectedCards, attempts) {
      return {
         state,
         selectedCards,
         attempts,
      };
   }

   setSelectedCardsArray(idCard) {
      this.selectedCardsArray.push({
         card: this.getCard(idCard),
      });
   }

   shuffle() {
      this.picturesArray = this.picturesArray.sort(() => Math.random() - 0.5);
      console.log(this.picturesArray);
      let indexPic = 0;
      let cpt = 1;
      for (let i = 0; i < this.cardsNb; i++) {
         this.cardsArray.push({
            id: i,
            picture: this.picturesArray.at(indexPic),
         });
         if (cpt === 2) {
            indexPic++;
            cpt = 0;
         }
         cpt++;
      }
      this.cardsArray = this.cardsArray.sort(() => Math.random() - 0.5);
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
         {id: 20, img: "🍀"},
         {id: 21, img: "💦"},
         {id: 22, img: "❓"},
         {id: 23, img: "😎"},
         {id: 24, img: "⛳"},
         {id: 25, img: "🥇"},
         {id: 26, img: "⏰"},
         {id: 27, img: "📌"},
         {id: 28, img: "💡"},
         {id: 29, img: "🩹"},
         {id: 30, img: "📸"}
      );
   }

   getRandomInt(max) {
      return Math.floor(Math.random() * max);
   }
}
