function makeCard(
  src,
  title,
  index,
  callback = (index) => {
    console.log(index);
  }
) {
  // <div>
  //   <img src="https://via.placeholder.com/150/d32776" alt="title" />
  //   <div>Title</div>
  // </div>;

  const card = document.createElement("div");
  const img = document.createElement("img");
  const titleDiv = document.createElement("div");

  card.appendChild(img);
  card.appendChild(titleDiv);

  img.src = src;
  img.alt = title;
  titleDiv.innerText = title;

  titleDiv.addEventListener("click", () => callback(index));
  return card;
}
