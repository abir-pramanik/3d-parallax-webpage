const parallax_els = document.querySelectorAll(".parallax"); //we use the qselector to check all of the node list files
const main  = document.querySelector("main");

let xValue = 0,
  yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
  parallax_els.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    // `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px))

    el.style.transform = `perspective(2300px) translateZ(${
      zValue * speedz
    }px) rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${
      -xValue * speedx
    }px)) translateY(calc(-50% + ${yValue * speedy}px))`;
  });
}

update(0);

// this event lister will follow the mouse movement and change the axis values bu calling the parameter

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2; //we did make the js to detect the center axis of the web

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);

  // we made the all the node files have seperate speed and now we did the elements move accordin to the mouse movement
});

if(window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;

} else{
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;

}

//GSAP ANIMATION

let timeline = gsap.timeline();

Array.from(parallax_els)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        y: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        duration: 3.5,
        ease: "power3.out",
      },
      "1"
    );
  });

timeline
  .from(
    ".text h1",
    {
      y: 100,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    },
    "2.5"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    },
    "2.5"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "2.5"
  );
