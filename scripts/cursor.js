/* Controls the custom cursor: a dot that follows the mouse
   and an outline that trails slightly behind it. */
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // show the cursor once the mouse has moved
    cursorDot.classList.add("visible");
    cursorOutline.classList.add("visible");

    // the dot sticks to the mouse
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // the outline glides to the same spot
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});
