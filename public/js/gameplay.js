// const anime = require('animejs');
let currentRoom = $('#gameSpace');
let gameSpace = $('.roomContainer');

currentRoom.on('click', function (event) {
  if (currentRoom.attr('alt') === "Logo") {
    currentRoom.attr('alt', "Living Room");
    currentRoom.attr('src', "/images/Places/Living_Room.png");
    determineRoomItems();
  };
});



const determineRoomItems = () => {
  switch (currentRoom.attr('alt')) {
    case 'Living Room':
      fillLivingRoom();
      break;
  }
}

const fillLivingRoom = () => {
  const axe = $('<img>')
  axe.attr('src', '/images/Sprites/In_Living_Room/Axe.png');
  axe.attr('alt', 'Axe');
  axe.addClass('axe');
  // axe.css = 'auto';
  // axe.css = '1000px';
  gameSpace.append(axe);

}

$(document).on('click', ".axe", () => {
  console.log('axe clicked')
})

// anime({
//   targets: '.axe',
//   opacity: 0.5,
//   duration: 1000,
//   easing: 'easeInOutQuad',
// });