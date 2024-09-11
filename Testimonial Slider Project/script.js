const slider = document.getElementById("slider");
let isMouseOver = false;

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
  return container;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

fetch("./comments_name.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const testimonials = shuffleArray(Object.values(data));
    testimonials.forEach((person) => {
      const testimonial = sliderMaker(person.comment, person.name);
      slider.appendChild(testimonial);
    });

    // Duplicate testimonials for seamless loop
    testimonials.forEach((person) => {
      const testimonial = sliderMaker(person.comment, person.name);
      slider.appendChild(testimonial);
    });

    startSliderAnimation();
  })
  .catch((error) => console.error("Error loading JSON:", error));

function startSliderAnimation() {
  const speed = 1; // Pixels per frame
  const sliderWidth = slider.scrollWidth;
  let position = 0;

  function animate() {
    if (!isMouseOver) {
      position -= speed;
      if (Math.abs(position) >= sliderWidth / 2) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(animate);
  }

  animate();

  slider.addEventListener("mouseover", (e) => {
    if (e.target.closest(".container")) {
      isMouseOver = true;
    }
  });

  slider.addEventListener("mouseout", () => {
    isMouseOver = false;
  });
}

// Adjust slider width based on screen size
function adjustSliderWidth() {
  const containerWidth =
    document.querySelector(".slider-container").offsetWidth;
  const slideWidth = 330; // Width of each slide including margin
  const visibleSlides = Math.floor(containerWidth / slideWidth);
  slider.style.width = `${slider.children.length * slideWidth}px`;
}

window.addEventListener("resize", adjustSliderWidth);
adjustSliderWidth(); // Call on initial load
