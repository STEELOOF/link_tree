/* Custom cursor: a small dot sits right on the mouse and a ring
   glides after it. The ring grows over buttons and squeezes on click. */
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorRing = document.querySelector("[data-cursor-ring]");

// where the mouse is, and where the ring currently is
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;
let hasMoved = false;

// how quickly the ring catches up (0 = never, 1 = instantly)
const FOLLOW_SPEED = 0.2;

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // first move: put the ring on the mouse straight away and show the cursor
    if (!hasMoved) {
        ringX = mouseX;
        ringY = mouseY;
        hasMoved = true;
        cursorDot.classList.add("visible");
        cursorRing.classList.add("visible");
    }

    // the dot sticks to the mouse
    cursorDot.style.translate = `${mouseX}px ${mouseY}px`;
});

// every frame, move the ring a bit closer to the mouse
function followMouse() {
    ringX += (mouseX - ringX) * FOLLOW_SPEED;
    ringY += (mouseY - ringY) * FOLLOW_SPEED;
    cursorRing.style.translate = `${ringX}px ${ringY}px`;

    requestAnimationFrame(followMouse);
}
followMouse();

// grow the ring over links and buttons
document.querySelectorAll("a, button").forEach(function (el) {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// squeeze the ring while the mouse button is held down
window.addEventListener("mousedown", () => document.body.classList.add("cursor-click"));
window.addEventListener("mouseup", () => document.body.classList.remove("cursor-click"));

// hide the cursor when the mouse leaves the window, show it when it comes back
document.addEventListener("mouseleave", function () {
    cursorDot.classList.remove("visible");
    cursorRing.classList.remove("visible");
});

document.addEventListener("mouseenter", function () {
    if (hasMoved) {
        cursorDot.classList.add("visible");
        cursorRing.classList.add("visible");
    }
});
