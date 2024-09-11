const slider = document.getElementById("slider");

const sliderMaker = (comment, name) => {
  const container = document.createElement("div");
  container.classList.add("container");

  const circled_area = document.createElement("div");
  circled_area.classList.add("circled_area");
  const img = document.createElement("img");
  img.src = `https://picsum.photos/200?random=${Math.floor(
    Math.random() * 1000
  )}`;
  circled_area.appendChild(img);

  const reactangle_area = document.createElement("div");
  reactangle_area.classList.add("reactangle_area");
  const commentElem = document.createElement("p");
  commentElem.classList.add("comment");
  commentElem.textContent = comment;
  reactangle_area.appendChild(commentElem);

  const name_area = document.createElement("p");
  name_area.classList.add("name_area");
  name_area.textContent = name;
  reactangle_area.appendChild(name_area);

  container.appendChild(circled_area);
  container.appendChild(reactangle_area);
  slider.appendChild(container);
};

fetch("./comments_name.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    Object.values(data).forEach((person) => {
      sliderMaker(person.comment, person.name);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
