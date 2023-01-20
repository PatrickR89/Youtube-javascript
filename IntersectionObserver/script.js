let cards = document.querySelectorAll(".card");
let cardContainer = document.querySelector(".card-container");

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // remove from abserver list when appears on screen -> good for lazy loading
      // if (entry.isIntersecting) {
      //   observer.unobserve(entry.target);
      // }
    });
  },
  {
    // how much of the element must be on screen for observer to make effect 0-offscreen 1-fullyOnScreen
    treshold: 1
    // whithin what margin from screen frame does element appear (<0 -> within screen view, >0 -> outside screen view)
    // rootMargin: "-50px"
    // set any scrolling container as root container for its children to be observed
    // root: ""
  }
);

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  {
    rootMargin: "100px"
  }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach((card) => {
  observer.observe(card);
});

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
