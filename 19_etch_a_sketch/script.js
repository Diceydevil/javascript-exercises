console.log("script loaded");

const container = document.querySelector("#container");
const resizeBtn = document.querySelector("#resize-btn");

resizeBtn.addEventListener("click", () => {
  let input = prompt("Enter squares per side (1-100):", "16");

  if (input === null) return;

  input = input.trim();

  if (input.length === 0) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  const n = Number(input);
  const isInteger = Number.isInteger(n);
  const inRange = n >= 1 && n <= 100;

  if (!isInteger || !inRange) {
    const retry = prompt(
      "Invalid. Please enter a whole number from 1 to 100:",
      "16"
    );
    if (retry === null) return;
    const m = Number(retry.trim());
    if (!Number.isInteger(m) || m < 1 || m > 100) {
      alert("Still invalid. Cancelling.");
      return;
    }
    createGrid(m);
    return;
  }
  createGrid(n);
});

function getContainerInnerWidth(el) {
  return Math.floor(el.getBoundingClientRect().width);
}

function createGrid(n) {
  // Basic validation to avoid zero/negative
  const perSide = Math.max(1, Math.floor(n));

  // Indicate busy state
  container.setAttribute("data-state", "building");

  // 1) Clear existing grid
  container.innerHTML = "";

  // 2) Compute square size considering gap between items
  // Read the gap from computed styles (in case it changes in CSS)
  const styles = window.getComputedStyle(container);
  const gapX = parseFloat(styles.columnGap || styles.gap || "0"); // horizontal gap between items

  const containerWidth = getContainerInnerWidth(container);
  const totalGapWidth = (perSide - 1) * gapX;
  const usableWidth = containerWidth - totalGapWidth;

  // Size per square (width and height) so perSide squares fit exactly in one row
  const squareSize = Math.floor(usableWidth / perSide);

  // 3) Create squares
  const totalSquares = perSide * perSide;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // Set fixed size. The boarder is included because of box-sizing: border-box.
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";

    // Hover effect: toggle a class on enter/leave
    square.addEventListener("mouseenter", () => {
      square.classList.add("hovered");
    });

    square.addEventListener("mouseleave", () => {
      // Leave it (drawn) or remove to only highlight while hovering.
      // For an Etch-a-Sketch trail, we keep it. Comment out the next line.
      // aqsquare.classList.remove("hovered");
    });

    fragment.appendChild(square);
  }
  container.appendChild(fragment);

  container.setAttribute("data-state", "idle");

  console.log(
    `Grid created with ${perSide}x${perSide}, squares size: ${squareSize}px`
  );
}

createGrid();
