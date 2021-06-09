const CARDS = [
  "tree",
  "ambulance",
  "atom",
  "bell",
  "bug",
  "cloud",
  "football-ball",
  "frog",
  "futbol",
  "gem",
  "heart",
  "lightbulb"
];

const MEMORY = document.querySelector(".memory-game");
const MODAL = document.getElementById("modal");
const MOVES = document.querySelector(".score__moves");

let fragment = document.createDocumentFragment();

// let mode = "easy";
let coupleMatch = [];
let matches = 0;
let countMoves = 0;

// SELECT 3 MODE PLAY
const selectMode = (mode = "easy") => {
  switch (mode) {
    case "easy":
      return 6;
    case "normal":
      return 9;
    case "hard":
      return 12;
  }
};

// OPEN MODAL
function openModal() {
  MODAL.setAttribute("open", true);
}

// CLOSE MODAL & RESET GAME
function closeModal() {
  MODAL.removeAttribute("open");
  resetGame();
}

// RESET GAME
const resetGame = () => {
  MEMORY.childNodes.forEach((el) => {
    el.classList.contains("hasMatch") && el.classList.remove("hasMatch");
    el.classList.contains("flipshow") && el.classList.remove("flipshow");
  });
  coupleMatch = [];
  countMoves = 0;
  matches = 0;
  MOVES.innerHTML = "";
  console.log("reset moves", countMoves, "reset matches", matches);
  init(); // reiniciar
};

// PRINT ONE CARD
const printCell = (item) => {
  // crea un elemento dom html
  let domparser = new DOMParser();
  // creazione della cella
  let elementInnerHTML = `
      <li class="card animate__animated" onclick="showCard(this)" name="${item}"><i class="fas fa-${item} fa-2x"></i></li>
  `;
  // parsing della string in DOMnode html
  let doc = domparser.parseFromString(elementInnerHTML, "text/html");
  return doc.body.firstChild;
};

//COMPLETE GAME
const completeGame = () => {
  // alert("Ganastes!!!");
  let textMoves = MODAL.querySelector("p");
  textMoves.innerHTML = `Completed in ${countMoves} moves`;
  openModal();
};

// MATCH CARDS
const matchCards = () => {
  countMoves++;
  MOVES.innerHTML = "Hai fatto " + countMoves + " mosse";
  let itemMatch = [...MEMORY.childNodes].filter((card) =>
    card.classList.contains("flipshow")
  );

  if (
    itemMatch[0].attributes.name.value === itemMatch[1].attributes.name.value
  ) {
    itemMatch[0].classList.add("hasMatch");
    itemMatch[1].classList.add("hasMatch");
    itemMatch[0].classList.remove("flipshow");
    itemMatch[1].classList.remove("flipshow");
    itemMatch[0].classList.remove("animate__flipOutY");
    itemMatch[1].classList.remove("animate__flipOutY");
    matches++;
    console.log("matches", matches);
    if (matches === selectMode()) {
      completeGame();
    }
  } else {
    itemMatch[0].classList.remove("flipshow");
    itemMatch[1].classList.remove("flipshow");
    // itemMatch[0].classList.remove("animate__flipOutY");
    // itemMatch[1].classList.remove("animate__flipOutY");
  }
  coupleMatch = [];
  console.log("cuants movidas", countMoves);
};

// FLIP CARD TO SHOW
const showCard = (item) => {
  // evita il click su card mated o flipped
  console.log("elemento", item);
  // item.classList.add("animate__flipOutY");
  if (
    item.classList.contains("hasMatch") ||
    item.classList.contains("flipshow")
  ) {
    return;
  }

  item.classList.add("flipshow");
  coupleMatch.push(item.firstChild);
  setTimeout(() => {
    if (coupleMatch.length === 2) {
      matchCards();
    }
  }, 1000);
};

// SHUFFLE METHOD FOR ARRAY
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// INIT SET GAME
const init = () => {
  MEMORY.innerHTML = "";
  let tempMode = selectMode();
  let temp = [...CARDS.slice(0, tempMode), ...CARDS.slice(0, tempMode)];
  shuffle(temp); // sort ramdon array

  for (let i = 0; i < temp.length; i++) {
    fragment.appendChild(printCell(temp[i]));
  }
  MEMORY.appendChild(fragment);
};

init();
