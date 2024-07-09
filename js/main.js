let data = null;
const url = "https://jsonplaceholder.typicode.com/photos";
let currentIndex = 0;
let currentPage = 1;
let buttonPage = 1;
let activeButton = null;

async function fetchingData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const responseData = await response.json();

    data = responseData;
    loaded();
    renderPage(1);
    updatePageButtons();
  } catch (err) {
    console.log(err);
  }
}

function loaded() {
  loaderDiv.style.display = "none";
  headerDiv.style.display = "block";
  mainDiv.style.display = "flex";
  paginationDiv.style.display = "flex";
}

function renderPage(page = 1) {
  const start = (page - 1) * 10;
  const end = page * 10;
  const cards = [];
  for (let i = start; i < end; i++) {
    const item = data[i];
    cards.push(
      makeCard(item.thumbnailUrl, item.title, i, function (i) {
        updateCurrentIndex(i);
        showSlider();
      })
    );
  }

  mainDiv.innerHTML = "";

  for (const card of cards) {
    mainDiv.appendChild(card);
  }
}

function updateCurrentIndex(i) {
  currentIndex = i;
  const src = data[currentIndex].url;
  console.log(src);
  sliderImg.src = data[currentIndex].url;
  sliderDiv.alt = data[currentIndex].title;
}

function showSlider() {
  sliderDiv.style.transform = "scale(1)";
}

// add event listener
closeButton.addEventListener("click", () => {
  sliderDiv.style.transform = "scale(0)";
});

sliderNextButton.addEventListener("click", () => {
  let index = currentIndex;
  index += 1;
  index %= data.length;
  updateCurrentIndex(index);
});

sliderPrevButton.addEventListener("click", () => {
  let index = currentIndex;
  index--;
  if (index < 0) {
    index = data.length - 1;
  }
  updateCurrentIndex(index);
});

// fetch data
fetchingData();

function makePageButton(number) {
  // <button>2</button>
  const button = document.createElement("button");

  if (number === currentPage) {
    button.disabled = true;
    if (activeButton) {
      activeButton.disabled = false;
    }
    activeButton = button;
  }
  button.innerText = number;

  button.addEventListener("click", () => {
    renderPage(number);
    if (activeButton) {
      activeButton.disabled = false;
    }
    button.disabled = true;
    activeButton = button;
  });
  return button;
}

function updatePageButtons() {
  activeButton = null;
  let end = buttonPage * 10;
  let start = end - 9;
  const buttons = [];

  for (let i = start; i <= end; i++) {
    buttons.push(makePageButton(i));
  }

  pageButtonDiv.innerHTML = "";

  for (const button of buttons) {
    pageButtonDiv.appendChild(button);
  }

  if (buttonPage === 1) {
    firstButton.disabled = true;
    prevButton.disabled = true;
  } else {
    firstButton.disabled = false;
    prevButton.disabled = false;
  }

  if (buttonPage >= 50) {
    lastButton.disabled = true;
    nextButton.disabled = true;
  } else {
    lastButton.disabled = false;
    nextButton.disabled = false;
  }
}

firstButton.addEventListener("click", () => {
  buttonPage = 1;
  updatePageButtons();
});

lastButton.addEventListener("click", () => {
  buttonPage = 50;
  updatePageButtons();
});

nextButton.addEventListener("click", () => {
  let nextPage = buttonPage + 1;

  if (nextPage > 500) {
    nextPage = 500;
  }

  buttonPage = nextPage;
  updatePageButtons();
});

prevButton.addEventListener("click", () => {
  let prevButton = buttonPage - 1;

  if (prevButton < 1) {
    prevButton = 1;
  }

  buttonPage = prevButton;
  updatePageButtons();
});
