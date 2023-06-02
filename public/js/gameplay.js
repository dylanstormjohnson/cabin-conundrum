// const anime = require('animejs');
// const session = require('express-session');

const playerObj = {
  inventory: [],
  hardwoodDoor: 'Closed',
  trapdoor: 'Closed',
  drawer: 'Closed',
  safe: 'Closed',
  dirtMound: 'Normal',
};

let currentRoom = $('#gameSpace');
let gameSpace = $('.roomContainer');
let isMessage = false;
let messageTime;

const message = (description) => {
  if (!isMessage) {
    isMessage = true;
    const messageHTML = `<p class='message'>${description}</p>`;
    gameSpace.append(messageHTML);

    messageTime = setTimeout(() => {
      clearMessage();
    }, 4000);
  }
};

const shortMessage = (whereTo) => {
  if (isMessage) {
    $('.message').remove();
    clearTimeout(messageTime);
    isMessage = true;
    const messageHTML = `<p class='message'>${whereTo}</p>`;

    gameSpace.append(messageHTML);
  } else {
    isMessage = true;
    const messageHTML = `<p class='message'>${whereTo}</p>`;

    gameSpace.append(messageHTML);
  }
};

const clearMessage = () => {
  isMessage = false;
  $('.message').remove();
};

currentRoom.on('click', function (event) {
  if (currentRoom.attr('alt') === 'Logo') {
    currentRoom.attr('alt', 'Living Room');
    currentRoom.attr('src', '/images/Places/Living_Room.png');
    // currentRoom.attr('src', '/dev_notes/Placement_References/Living_Room_Reference_All_Closed.png');
    // currentRoom.attr('src', '/dev_notes/Placement_References/Living_Room_Reference_All_Opened.png');
    determineRoomItems();
  }
});

const determineRoomItems = () => {
  switch (currentRoom.attr('alt')) {
    case 'Living Room':
      fillLivingRoom();
      break;
    case 'Kitchen':
      fillKitchen();
      break;
    case 'Basement':
      fillBasement();
      break;
  }
};

const fillLivingRoom = () => {
  if (!playerObj.inventory.includes('Axe')) {
    addAxe();
  }

  addAxeCover();
  addArrowLRToK();

  if (playerObj.trapdoor !== 'Opened') {
    addClosedTrapdoor();
  } else {
    addOpenedTrapdoor();
  }

  if (playerObj.hardwoodDoor !== 'Broken') {
    addClosedHardwoodDoor();
  } else {
    addBrokenHardwoodDoor();
  }
};

// const fillKitchen = () => {
//   if (!playerObj.inventory.includes('Basement_Key')) {
//     addBasementKey();
//   }

//   addAxeCover();

//   if (playerObj.trapdoor !== 'Opened') {
//     addClosedTrapdoor();
//   } else {
//     addOpenedTrapdoor();
//   }

//   if (playerObj.hardwoodDoor !== 'Broken') {
//     addClosedHardwoodDoor();
//   } else {
//     addBrokenHardwoodDoor();
//   }
// };

const addAxe = () => {
  const axe = $('<img>');
  axe.attr('src', '/images/Sprites/In_Living_Room/Axe.png');
  axe.attr('alt', 'Axe');
  axe.addClass('axe');
  gameSpace.append(axe);
};

const addAxeCover = () => {
  const axeCover = $('<img>');
  axeCover.attr('src', '/images/Sprites/In_Living_Room/Axe_Cover.png');
  axeCover.attr('alt', 'Axe Cover');
  axeCover.addClass('axe_cover');
  gameSpace.append(axeCover);
};

const addClosedTrapdoor = () => {
  console.log('open');
  const trapdoor = $('<img>');
  trapdoor.attr('src', '/images/Sprites/In_Living_Room/Trapdoor_Closed.png');
  trapdoor.attr('alt', 'Trapdoor');
  trapdoor.addClass('trapdoor_closed');
  gameSpace.append(trapdoor);
};

const addOpenedTrapdoor = () => {
  console.log('closed');
  const trapdoor = $('<img>');
  trapdoor.attr('src', '/images/Sprites/In_Living_Room/Trapdoor_Opened.png');
  trapdoor.attr('alt', 'Trapdoor');
  trapdoor.addClass('trapdoor_opened');
  gameSpace.append(trapdoor);
};

const addClosedHardwoodDoor = () => {
  const hardwoodDoor = $('<img>');
  hardwoodDoor.attr('src', '/images/Sprites/In_Living_Room/Hardwood_Door.png');
  hardwoodDoor.attr('alt', 'Hardwood Door');
  hardwoodDoor.addClass('hardwoodDoor_closed');
  gameSpace.append(hardwoodDoor);
};

const addBrokenHardwoodDoor = () => {
  const hardwoodDoor = $('<img>');
  hardwoodDoor.attr(
    'src',
    '/images/Sprites/In_Living_Room/Hardwood_Door_Broken.png'
  );
  hardwoodDoor.attr('alt', 'Hardwood Door');
  hardwoodDoor.addClass('hardwoodDoor_broken');
  gameSpace.append(hardwoodDoor);
};

const addArrowLRToK = () => {
  const arrow = $('<img>');
  arrow.attr('src', '/images/Sprites/In_Living_Room/Arrow_To_Kitchen.png');
  arrow.attr('alt', 'Hardwood Door');
  arrow.addClass('ArrowLRToK');
  gameSpace.append(arrow);
};

const addArrowKToLR = () => {
  const arrow = $('<img>');
  arrow.attr('src', '/images/Sprites/In_Living_Room/Arrow_To_Kitchen.png');
  arrow.attr('alt', 'Hardwood Door');
  arrow.addClass('ArrowLRToK');
  gameSpace.append(arrow);
};

$(document).on('click', '.axe', () => {
  message(`I can't reach it!`);
});

$(document).on('click', '.hardwoodDoor_closed', () => {
  message(`It's locked...`);
});

$(document).on('click', '.trapdoor_closed', () => {
  message(`Locked... darn.`);
});

$(document).on('mouseenter', '.ArrowLRToK', () => {
  shortMessage(`To Kitchen`);
});

$(document).on('mouseleave', '.ArrowLRToK', () => {
  clearMessage();
});

$(document).on('click', '.ArrowLRToK', () => {
  clearMessage();
  currentRoom.attr('alt', 'Kitchen');
  currentRoom.attr('src', '/images/Places/Kitchen.png');
  if (!playerObj.inventory.includes('Axe')) {
    $('.axe').remove();
  }

  $('.axe_cover').remove();
  $('.arrowLRtoK').remove();

  if (playerObj.trapdoor !== 'Opened') {
    $('.trapdoor_closed').remove();
  } else {
    $('.trapdoor_opened').remove();
  }

  if (playerObj.hardwoodDoor !== 'Broken') {
    $('.hardwoodDoor_closed').remove();
  } else {
    $('.hardwoodDoor_broken').remove();
  }
  determineRoomItems();
});

// anime({
//   targets: '.axe',
//   opacity: 0.5,
//   duration: 1000,
//   easing: 'easeInOutQuad',
// });
