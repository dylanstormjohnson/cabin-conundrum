// const anime = require('animejs');
let currentRoom = document.querySelector('#gameSpace');

currentRoom.addEventListener('click', function (event) {
  if (currentRoom.getAttribute('alt') === "Logo") {
    currentRoom.setAttribute('alt', "Living Room");
    currentRoom.setAttribute('src', "/images/Places/Living_Room.png");
    determineRoomItems();
  };
});



const determineRoomItems = () => {
  switch (currentRoom.getAttribute('alt')) {
    case 'Living Room':
      fillLivingRoom();
      break;
  }
}

const fillLivingRoom = () => {
  const axe = document.createElement('img')
  axe.setAttribute('src', '/images/Sprites/In_Living_Room/Axe.png');
  axe.setAttribute('alt', 'Axe');
  axe.setAttribute('class', 'axe ');
  currentRoom.appendChild(axe);

}

// anime({
//   targets: '.my-element',
//   opacity: 0.5,
//   duration: 1000,
//   easing: 'easeInOutQuad',
// });