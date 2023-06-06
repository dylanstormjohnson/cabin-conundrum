// const anime = require('animejs');
// const session = require('express-session');

const playerObj = {
  inventory: [],
  usedItems: [],
  activeItem: 'None',
  hardwoodDoor: 'Closed',
  trapdoor: 'Closed',
  drawer: 'Closed',
  safe: 'Closed',
  dirtMound: 'Normal',
  axe: 'Stuck',
};

let currentRoom = $('#gameSpace');
let gameSpace = $('.roomContainer');
let isMessage = false;
let messageTime;
let gameTime;
let gameRunning = false;

const message = (description) => {
  if (!isMessage) {
    isMessage = true;
    const messageHTML = `<p class='message'>${description}</p>`;
    gameSpace.append(messageHTML);

    messageTime = setTimeout(() => {
      clearMessage();
    }, 3000);
  } else {
    $('.message').remove();
    clearTimeout(messageTime);
    isMessage = true;
    const messageHTML = `<p class='message'>${description}</p>`;

    gameSpace.append(messageHTML);

    messageTime = setTimeout(() => {
      clearMessage();
    }, 3000);
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
    gameRunning = true;
    runGameTimer();
  }
});

const runGameTimer = () => {
  const timerHTML = `<p class='timer'>0</p>`;
  gameSpace.append(timerHTML);
  let elapsedTime = 0;
  let timer = setInterval(function () {
    if (gameRunning === true) {
      elapsedTime++;

      console.log('Elapsed time:', elapsedTime / 1000, 'seconds');

      // if (elapsedTime >= 600000) {
      //   clearInterval(timer);
      // }

      $('.timer').text(elapsedTime);
    } else {
      gameTime = elapsedTime;
      clearInterval(timer);
    }
  }, 1000);
};

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

const fillKitchen = () => {
  if (
    !playerObj.inventory.includes('Basement Key') &&
    !playerObj.usedItems.includes('Basement Key')
  ) {
    addBasementKey();
  }

  addArrowKToLR();

  if (playerObj.drawer !== 'Opened') {
    addClosedDrawer();
  } else {
    addOpenedDrawer();
    if (
      !playerObj.inventory.includes('Note With Passcode') &&
      !playerObj.usedItems.includes('Note With Passcode')
    ) {
      addNoteWithPasscode();
    }
  }
};

const fillBasement = () => {
  if (!playerObj.inventory.includes('Shovel')) {
    addShovel();
  }

  addArrowBToLR();

  if (playerObj.dirtMound !== 'Dug') {
    addUndugDirtMound();
  } else {
    addDugDirtMound();
    if (
      !playerObj.inventory.includes('Drawer Key') &&
      !playerObj.usedItems.includes('Drawer Key')
    ) {
      addDrawerKey();
    }
  }

  if (playerObj.safe !== 'Opened') {
    addClosedSafe();
  } else {
    addOpenedSafe();
    if (!playerObj.inventory.includes('Rope')) {
      addRope();
    }
  }
};

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
  hardwoodDoor.addClass('hardwood_door_closed');
  gameSpace.append(hardwoodDoor);
};

const addBrokenHardwoodDoor = () => {
  const hardwoodDoor = $('<img>');
  hardwoodDoor.attr(
    'src',
    '/images/Sprites/In_Living_Room/Hardwood_Door_Broken.png'
  );
  hardwoodDoor.attr('alt', 'Hardwood Door');
  hardwoodDoor.addClass('hardwood_door_broken');
  gameSpace.append(hardwoodDoor);
};

const addArrowLRToK = () => {
  const arrow = $('<img>');
  arrow.attr('src', '/images/Sprites/In_Living_Room/Arrow_To_Kitchen.png');
  arrow.attr('alt', 'Arrow from Living Room to Kitchen');
  arrow.addClass('arrowLRtoK');
  gameSpace.append(arrow);
};

const addBasementKey = () => {
  const basementKey = $('<img>');
  basementKey.attr('src', '/images/Sprites/In_Kitchen/Basement_Key.png');
  basementKey.attr('alt', 'Basement Key');
  basementKey.addClass('basement_key');
  gameSpace.append(basementKey);
};

const addArrowKToLR = () => {
  const arrow = $('<img>');
  arrow.attr('src', '/images/Sprites/In_Kitchen/Arrow_To_Living_Room.png');
  arrow.attr('alt', 'Arrow from Kitchen to Living Room');
  arrow.addClass('arrowKtoLR');
  gameSpace.append(arrow);
};

const addClosedDrawer = () => {
  const drawer = $('<img>');
  drawer.attr('src', '/images/Sprites/In_Kitchen/Drawer_Closed.png');
  drawer.attr('alt', 'Drawer');
  drawer.addClass('drawer_closed');
  gameSpace.append(drawer);
};

const addOpenedDrawer = () => {
  const drawer = $('<img>');
  drawer.attr('src', '/images/Sprites/In_Kitchen/Drawer_Opened.png');
  drawer.attr('alt', 'Drawer');
  drawer.addClass('drawer_opened');
  gameSpace.append(drawer);
};

const addNoteWithPasscode = () => {
  const noteWithPasscode = $('<img>');
  noteWithPasscode.attr(
    'src',
    '/images/Sprites/In_Kitchen/Note_With_Passcode.png'
  );
  noteWithPasscode.attr('alt', 'Note With Passcode');
  noteWithPasscode.addClass('note_with_passcode');
  gameSpace.append(noteWithPasscode);
};

const addArrowBToLR = () => {
  const arrow = $('<img>');
  arrow.attr('src', '/images/Sprites/In_Basement/Arrow_To_Living_Room.png');
  arrow.attr('alt', 'Arrow from Basement to Living Room');
  arrow.addClass('arrowBtoLR');
  gameSpace.append(arrow);
};

const addUndugDirtMound = () => {
  const dirtMound = $('<img>');
  dirtMound.attr('src', '/images/Sprites/In_Basement/Dirt_Mound.png');
  dirtMound.attr('alt', 'Dirt Mound');
  dirtMound.addClass('dirt_mound');
  gameSpace.append(dirtMound);
};

const addShovel = () => {
  const shovel = $('<img>');
  shovel.attr('src', '/images/Sprites/In_Basement/Shovel.png');
  shovel.attr('alt', 'Shovel');
  shovel.addClass('shovel');
  gameSpace.append(shovel);
};

const addClosedSafe = () => {
  const safe = $('<img>');
  safe.attr('src', '/images/Sprites/In_Basement/Safe_Closed.png');
  safe.attr('alt', 'Safe');
  safe.addClass('safe_closed');
  gameSpace.append(safe);
};

const addDrawerKey = () => {
  const drawerKey = $('<img>');
  drawerKey.attr('src', '/images/Sprites/In_Basement/Drawer_Key.png');
  drawerKey.attr('alt', 'Drawer Key');
  drawerKey.addClass('drawer_key');
  gameSpace.append(drawerKey);
};

const addRope = () => {
  const rope = $('<img>');
  rope.attr('src', '/images/Sprites/In_Basement/Rope.png');
  rope.attr('alt', 'Rope');
  rope.addClass('rope');
  gameSpace.append(rope);
};

const addOpenedSafe = () => {
  const safe = $('<img>');
  safe.attr('src', '/images/Sprites/In_Basement/Safe_Opened.png');
  safe.attr('alt', 'Safe');
  safe.addClass('safe_opened');
  gameSpace.append(safe);
};

const addDugDirtMound = () => {
  const dirtMound = $('<img>');
  dirtMound.attr('src', '/images/Sprites/In_Basement/Dirt_Mound_Dug.png');
  dirtMound.attr('alt', 'Dirt Mound');
  dirtMound.addClass('dirt_mound_dug');
  gameSpace.append(dirtMound);
};

$(document).on('click', '.hardwood_door_closed', () => {
  if (playerObj.activeItem === 'None') {
    message(`It's locked...`);
  } else if (playerObj.activeItem === 'Axe') {
    message(`You axed the door!`);

    playerObj.hardwoodDoor = 'Broken';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.hardwood_door_closed').remove();
    addBrokenHardwoodDoor();
    removeGlow();
    playerObj.activeItem = 'None';
    $('.basement_key').remove();
  } else {
    message(`That doesn't work.`);
    removeGlow();
    playerObj.activeItem = 'None';
  }
});

$(document).on('click', '.trapdoor_closed', () => {
  if (playerObj.activeItem === 'None') {
    message(`Locked... darn.`);
  } else if (playerObj.activeItem === 'Basement Key') {
    message(`Basement door unlocked!`);
    let index = playerObj.inventory.indexOf('Basement Key');

    playerObj.inventory.splice(index, 1);
    playerObj.usedItems.push('Basement Key');
    playerObj.trapdoor = 'Opened';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.trapdoor_closed').remove();
    addOpenedTrapdoor();
    removeGlow();
    playerObj.activeItem = 'None';
    $('.basement_key').remove();
  } else {
    message(`That doesn't work.`);
    removeGlow();
    playerObj.activeItem = 'None';
  }
});

$(document).on('mouseenter', '.arrowLRtoK', () => {
  shortMessage(`To Kitchen`);
});

$(document).on('mouseleave', '.arrowLRtoK', () => {
  clearMessage();
});

$(document).on('click', '.arrowLRtoK', () => {
  clearMessage();
  currentRoom.attr('alt', 'Kitchen');
  currentRoom.attr('src', '/images/Places/Kitchen.png');
  // currentRoom.attr('src', '/dev_notes/Placement_References/Kitchen_Reference_All_Closed.png');
  // currentRoom.attr('src', '/dev_notes/Placement_References/Kitchen_Reference_All_Opened.png');
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
    $('.hardwood_door_closed').remove();
  } else {
    $('.hardwood_door_broken').remove();
  }
  determineRoomItems();
});

$(document).on('mouseenter', '.arrowKtoLR', () => {
  shortMessage(`To Living Room`);
});

$(document).on('mouseleave', '.arrowKtoLR', () => {
  clearMessage();
});

$(document).on('click', '.arrowKtoLR', () => {
  clearMessage();
  currentRoom.attr('alt', 'Living Room');
  currentRoom.attr('src', '/images/Places/Living_Room.png');
  if (!playerObj.inventory.includes('Basement Key')) {
    $('.basement_key').remove();
  }

  $('.arrowKtoLR').remove();

  if (playerObj.drawer !== 'Opened') {
    $('.drawer_closed').remove();
  } else {
    $('.drawer_opened').remove();
    if (!playerObj.inventory.includes('Note With Passcode')) {
      $('.note_with_passcode').remove();
    }
  }

  determineRoomItems();
});

$(document).on('click', '.drawer_closed', () => {
  if (playerObj.activeItem === 'None') {
    message(`Locked! Why is everything locked?`);
  } else if (playerObj.activeItem === 'Drawer Key') {
    message(`Drawer opened!`);
    let index = playerObj.inventory.indexOf('Drawer Key');

    playerObj.inventory.splice(index, 1);
    playerObj.usedItems.push('Drawer Key');
    playerObj.drawer = 'Opened';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.drawer_closed').remove();
    addOpenedDrawer();
    addNoteWithPasscode();
    removeGlow();
    playerObj.activeItem = 'None';
    $('.drawer_key').remove();
  } else {
    message(`That doesn't work.`);
    removeGlow();
    playerObj.activeItem = 'None';
  }
});

$(document).on('mouseenter', '.trapdoor_opened', () => {
  shortMessage(`To Basement`);
});

$(document).on('mouseleave', '.trapdoor_opened', () => {
  clearMessage();
});

$(document).on('click', '.trapdoor_opened', () => {
  clearMessage();
  currentRoom.attr('alt', 'Basement');
  currentRoom.attr('src', '/images/Places/Basement.png');
  // currentRoom.attr('src', '/dev_notes/Placement_References/Basement_Reference_All_Closed.png');
  // currentRoom.attr('src', '/dev_notes/Placement_References/Basement_Reference_All_Opened.png');
  if (!playerObj.inventory.includes('Axe')) {
    $('.axe').remove();
  }

  $('.axe_cover').remove();
  $('.arrowLRtoK').remove();
  $('.trapdoor_opened').remove();

  if (playerObj.hardwoodDoor !== 'Broken') {
    $('.hardwood_door_closed').remove();
  } else {
    $('.hardwood_door_broken').remove();
  }
  determineRoomItems();
});

$(document).on('mouseenter', '.arrowBtoLR', () => {
  shortMessage(`To Living Room`);
});

$(document).on('mouseleave', '.arrowBtoLR', () => {
  clearMessage();
});

$(document).on('click', '.arrowBtoLR', () => {
  clearMessage();
  currentRoom.attr('alt', 'Living Room');
  currentRoom.attr('src', '/images/Places/Living_Room.png');

  if (!playerObj.inventory.includes('Shovel')) {
    $('.shovel').remove();
  }

  $('.arrowBtoLR').remove();

  if (playerObj.dirtMound !== 'Dug') {
    $('.dirt_mound').remove();
  } else {
    $('.dirt_mound_dug').remove();
    if (!playerObj.inventory.includes('Drawer Key')) {
      $('.drawer_key').remove();
    }
  }

  if (playerObj.safe !== 'Opened') {
    $('.safe_closed').remove();
  } else {
    $('.safe_opened').remove();
    if (!playerObj.inventory.includes('Rope')) {
      $('.rope').remove();
    }
  }

  determineRoomItems();
});

$(document).on('click', '.dirt_mound', () => {
  console.log(playerObj.activeItem);
  if (playerObj.activeItem === 'None') {
    message(`Looks fresh, I feel uneasy.`);
  } else if (playerObj.activeItem === 'Shovel') {
    message(`You dug something up!`);

    playerObj.dirtMound = 'Dug';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.dirt_mound').remove();
    addDugDirtMound();
    addDrawerKey();
    removeGlow();
    playerObj.activeItem = 'None';
  } else {
    message(`That doesn't work.`);
    removeGlow();
    playerObj.activeItem = 'None';
  }
});

$(document).on('click', '.safe_closed', () => {
  if (playerObj.activeItem === 'None') {
    message(`I don't know the combination.`);
  } else if (playerObj.activeItem === 'Note With Passcode') {
    message(`Safe unlocked!`);
    let index = playerObj.inventory.indexOf('Note With Passcode');

    playerObj.inventory.splice(index, 1);
    playerObj.usedItems.push('Note With Passcode');
    playerObj.safe = 'Opened';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.safe_closed').remove();
    addOpenedSafe();
    addRope();
    removeGlow();
    playerObj.activeItem = 'None';
    $('.note_with_passcode').remove();
  } else {
    message(`That doesn't work.`);
    removeGlow();
    playerObj.activeItem = 'None';
  }
});

$(document).on('click', '.hardwood_door_broken', () => {
  message(`You Win!!!!!!!!`);
  endGame();
});

$(document).on('click', '.axe', () => {
  if (playerObj.axe === 'Stuck') {
    if (playerObj.activeItem === 'None') {
      message(`I can't reach it!`);
    } else if (playerObj.activeItem === 'Rope') {
      message(`You knocked the axe down!`);

      anime({
        targets: '.axe',
        keyframes: [
          { rotateZ: 15, duration: 500 },
          {
            translateX: 100,
            translateY: 413,
            duration: 500,
          },
        ],
        easing: 'linear',
      });

      playerObj.axe = 'Unstuck';
      removeGlow();
      playerObj.activeItem = 'None';
    } else {
      message(`That doesn't work.`);
      removeGlow();
      playerObj.activeItem = 'None';
    }
  } else if (playerObj.inventory.includes('Axe')) {
    removeGlow();
    playerObj.activeItem = 'Axe';
    addGlow();
  } else {
    message(`Axe found!`);
    anime({
      targets: '.axe',
      translateX: 1000,
      translateY: 125,
      duration: 500,
      easing: 'easeInOutQuad',
    });
    playerObj.inventory.push('Axe');
    console.log(playerObj.inventory);
  }
  // console.log(playerObj.inventory)
  // console.log(playerObj.usedItems)

  // $('.axe').remove();
});

$(document).on('click', '.basement_key', () => {
  if (!playerObj.inventory.includes('Basement Key')) {
    message(`Basement Key found!`);
    anime({
      targets: '.basement_key',
      translateX: 1025,
      translateY: -50,
      duration: 500,
      easing: 'easeInOutQuad',
    });
    playerObj.inventory.push('Basement Key');
    console.log(playerObj.inventory);
  } else {
    removeGlow();
    playerObj.activeItem = 'Basement Key';
    addGlow();
  }
});

$(document).on('click', '.note_with_passcode', () => {
  if (!playerObj.inventory.includes('Note With Passcode')) {
    message(`Note with passcode found!`);
    anime({
      targets: '.note_with_passcode',
      translateX: 647,
      translateY: 38,
      duration: 500,
      easing: 'easeInOutQuad',
    });
    playerObj.inventory.push('Note With Passcode');
    console.log(playerObj.inventory);
  } else {
    removeGlow();
    playerObj.activeItem = 'Note With Passcode';
    addGlow();
  }
});

$(document).on('click', '.shovel', () => {
  if (!playerObj.inventory.includes('Shovel')) {
    message(`Shovel found!`);
    anime({
      targets: '.shovel',
      translateX: 430,
      translateY: -280,
      height: '25%',
      duration: 500,
      easing: 'easeInOutQuad',
    });
    playerObj.inventory.push('Shovel');
    console.log(playerObj.inventory);
  } else {
    removeGlow();
    playerObj.activeItem = 'Shovel';
    addGlow();
  }
});

$(document).on('click', '.drawer_key', () => {
  if (!playerObj.inventory.includes('Drawer Key')) {
    message(`Drawer Key found!`);
    anime({
      targets: '.drawer_key',
      translateX: 750,
      translateY: -300,
      duration: 500,
      easing: 'easeInOutQuad',
    });
    playerObj.inventory.push('Drawer Key');
    console.log(playerObj.inventory);
  } else {
    removeGlow();
    playerObj.activeItem = 'Drawer Key';
    addGlow();
  }
});

$(document).on('click', '.rope', () => {
  if (!playerObj.inventory.includes('Rope')) {
    message(`Rope found!`);
    anime({
      targets: '.rope',
      translateX: 615,
      translateY: 125,
      duration: 500,
      easing: 'easeInOutQuad',
    });
    playerObj.inventory.push('Rope');
    console.log(playerObj.inventory);
  } else {
    removeGlow();
    playerObj.activeItem = 'Rope';
    addGlow();
  }
});

addGlow = () => {
  switch (playerObj.activeItem) {
    case 'Axe':
      $('.axe').addClass('selectedGlow');
      break;
    case 'Basement Key':
      $('.basement_key').addClass('selectedGlow');
      break;
    case 'Note With Passcode':
      $('.note_with_passcode').addClass('selectedGlow');
      break;
    case 'Shovel':
      $('.shovel').addClass('selectedGlow');
      break;
    case 'Drawer Key':
      $('.drawer_key').addClass('selectedGlow');
      break;
    case 'Rope':
      $('.rope').addClass('selectedGlow');
      break;
  }
};

removeGlow = () => {
  switch (playerObj.activeItem) {
    case 'Axe':
      $('.axe').removeClass('selectedGlow');
      break;
    case 'Basement Key':
      console.log('hit');
      $('.basement_key').removeClass('selectedGlow');
      break;
    case 'Note With Passcode':
      $('.note_with_passcode').removeClass('selectedGlow');
      break;
    case 'Shovel':
      $('.shovel').removeClass('selectedGlow');
      break;
    case 'Drawer Key':
      $('.drawer_key').removeClass('selectedGlow');
      break;
    case 'Rope':
      $('.rope').removeClass('selectedGlow');
      break;
  }
};

const endGame = () => {
  playerObj.inventory = [];
  playerObj.usedItems = [];
  playerObj.activeItem = 'None';
  playerObj.hardwoodDoor = 'Closed';
  playerObj.trapdoor = 'Closed';
  playerObj.drawer = 'Closed';
  playerObj.safe = 'Closed';
  playerObj.dirtMound = 'Normal';
  playerObj.axe = 'Stuck';

  gameRunning = false;

  setTimeout(function () {
    removeEverything();
    currentRoom.attr('alt', 'Logo');
    currentRoom.attr('src', '/images/Logo/Cabin_Conundrum_Logo.png');
    $('.timer').remove();
  }, 3000);

  //console.log('Game Time:', gameTime);
  //console.log('Elapsed time:', elapsedTime / 1000, 'seconds');
  storeScore(elapsedTime / 1000);
};

async function storeScore(time) {
  try {
    const user_id = document
      .getElementById('gamespace')
      .getAttribute('user_id');
    const bodyObj = { user_id, time };

    return console.log(bodyObj);
    const response = await fetch('/api/scores', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.message;
      showError(loginFormEl, errorMsg);
      return;
    }

    window.location.href = '/';
  } catch (err) {
    console.log(err);
    showError(loginFormEl, 'A login error has ocurred.');
  }
}

const removeEverything = () => {
  if ($('.axe')) {
    $('.axe').remove();
  }
  if ($('.axe_cover')) {
    $('.axe_cover').remove();
  }
  if ($('.trapdoor_closed')) {
    $('.trapdoor_closed').remove();
  }
  if ($('.trapdoor_opened')) {
    $('.trapdoor_opened').remove();
  }
  if ($('.hardwood_door_closed')) {
    $('.hardwood_door_closed').remove();
  }
  if ($('.hardwood_door_broken')) {
    $('.hardwood_door_broken').remove();
  }
  if ($('.arrowLRtoK')) {
    $('.arrowLRtoK').remove();
  }
  if ($('.basement_key')) {
    $('.basement_key').remove();
  }
  if ($('.arrowKtoLR')) {
    $('.arrowKtoLR').remove();
  }
  if ($('.drawer_closed')) {
    $('.drawer_closed').remove();
  }
  if ($('.drawer_opened')) {
    $('.drawer_opened').remove();
  }
  if ($('.note_with_passcode')) {
    $('.note_with_passcode').remove();
  }
  if ($('.arrowBtoLR')) {
    $('.arrowBtoLR').remove();
  }
  if ($('.dirt_mound')) {
    $('.dirt_mound').remove();
  }
  if ($('.shovel')) {
    $('.shovel').remove();
  }
  if ($('.safe_closed')) {
    $('.safe_closed').remove();
  }
  if ($('.drawer_key')) {
    $('.drawer_key').remove();
  }
  if ($('.rope')) {
    $('.rope').remove();
  }
  if ($('.safe_opened')) {
    $('.safe_opened').remove();
  }
  if ($('.dirt_mound_dug')) {
    $('.dirt_mound_dug').remove();
  }
};
// anime({
//   targets: '.axe',
//   opacity: 0.5,
//   duration: 1000,
//   easing: 'easeInOutQuad',
// });
