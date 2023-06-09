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
let creepyAnimationWaitTime;
let creepyAnimationTime;

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

const getRandomInt = () => {
  min = Math.ceil(1);
  max = Math.floor(101);
  return Math.floor(Math.random() * (max - min)) + min;
};

const creepyFaceAnimationWait = () => {
  creepyAnimationWaitTime = setTimeout(() => {
    creepyFaceAnimation();
  }, 15000);
};

const creepyFaceAnimation = () => {
  let randomInt;
  creepyAnimationTime = setInterval(() => {
    randomInt = getRandomInt();
    console.log(randomInt);
    if (randomInt <= 5) {
      clearInterval(creepyAnimationTime);
      addCreepyFaceEyesOpen();
      creepyAnimationWaitTime = setTimeout(() => {
        $('.creepy_face_eyes_open').remove();
        creepyFaceAnimationWait();
      }, 2000);
    }
  }, 1000);
};

const endCreepyFaceAnimation = () => {
  clearInterval(creepyAnimationWaitTime);
  clearInterval(creepyAnimationTime);
  if ($('.creepy_face_eyes_open')) {
    $('.creepy_face_eyes_open').remove();
  }
  if ($('.creepy_face_eyes_closed')) {
    $('.creepy_face_eyes_closed').remove();
  }
};

currentRoom.on('click', function (event) {
  if (currentRoom.attr('alt') === 'Logo') {
    currentRoom.attr('alt', 'Living Room');
    currentRoom.attr('src', '/images/Places/Living_Room.png');

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

      //console.log('Elapsed time:', elapsedTime / 1000, 'seconds');
      localStorage.setItem('elapsedTime', elapsedTime);

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
  addEasterEggs();

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
  addEasterEggs();

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
  addEasterEggs();
  creepyFaceAnimationWait();

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

const addEasterEggs = () => {
  switch (currentRoom.attr('alt')) {
    case 'Living Room':
      addBees();
      break;
    case 'Kitchen':
      addUmbrella();
      break;
    case 'Basement':
      addCreepyFaceEyesClosed();
      break;
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

const addUmbrella = () => {
  const umbrella = $('<img>');
  umbrella.attr('src', '/images/Sprites/Easter_Eggs/In_Kitchen/Umbrella.png');
  umbrella.attr('alt', 'Umbrella Easter Egg');
  umbrella.addClass('umbrella');
  gameSpace.append(umbrella);
};

const addBees = () => {
  const bee1 = $('<img>');
  bee1.attr('src', '/images/Sprites/Easter_Eggs/In_Living_Room/Bee_Right.png');
  bee1.attr('alt', 'Bee 1 Easter Egg');
  bee1.addClass('bee_right bees');
  gameSpace.append(bee1);
  const bee2 = $('<img>');
  bee2.attr('src', '/images/Sprites/Easter_Eggs/In_Living_Room/Bee_Left.png');
  bee2.attr('alt', 'Bee 2 Easter Egg');
  bee2.addClass('bee_left bees');
  gameSpace.append(bee2);
};

const addCreepyFaceEyesClosed = () => {
  const creepyFaceEyesClosed = $('<img>');
  creepyFaceEyesClosed.attr(
    'src',
    '/images/Sprites/Easter_Eggs/In_Basement/Creepy_Face_Eyes_Closed.png'
  );
  creepyFaceEyesClosed.attr('alt', 'Creepy Face With Closed Eyes Easter Egg');
  creepyFaceEyesClosed.addClass('creepy_face_eyes_closed');
  gameSpace.append(creepyFaceEyesClosed);
};

const addCreepyFaceEyesOpen = () => {
  const creepyFaceEyesOpen = $('<img>');
  creepyFaceEyesOpen.attr(
    'src',
    '/images/Sprites/Easter_Eggs/In_Basement/Creepy_Face_Eyes_Open.png'
  );
  creepyFaceEyesOpen.attr('alt', 'Creepy Face With Open Eyes Easter Egg');
  creepyFaceEyesOpen.addClass('creepy_face_eyes_open');
  gameSpace.append(creepyFaceEyesOpen);
};

$(document).on('click', '.hardwood_door_closed', () => {
  if (playerObj.activeItem === 'None') {
    message(`It's locked...`);
  } else if (playerObj.activeItem === 'Axe') {
    message(`You axed the door!`);

    playerObj.hardwoodDoor = 'Broken';

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

  if (!playerObj.inventory.includes('Axe')) {
    $('.axe').remove();
  }

  $('.axe_cover').remove();
  $('.arrowLRtoK').remove();
  $('.bee_right').remove();
  $('.bee_left').remove();

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
  $('.umbrella').remove();

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

  if (!playerObj.inventory.includes('Axe')) {
    $('.axe').remove();
  }

  $('.axe_cover').remove();
  $('.arrowLRtoK').remove();
  $('.trapdoor_opened').remove();
  $('.bee_right').remove();
  $('.bee_left').remove();

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
  endCreepyFaceAnimation();

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
  if (playerObj.activeItem === 'None') {
    message(`Looks fresh, I feel uneasy.`);
  } else if (playerObj.activeItem === 'Shovel') {
    message(`You dug something up!`);

    playerObj.dirtMound = 'Dug';

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

      if (window.innerWidth < 1280) {
        anime({
          targets: '.axe',
          keyframes: [
            { rotateZ: 15, duration: 500 },
            {
              translateX: 100,
              translateY: 350,
              duration: 500,
            },
          ],
          easing: 'linear',
        });
      } else if (window.innerWidth >= 900 && window.innerWidth < 1920) {
        anime({
          targets: '.axe',
          keyframes: [
            { rotateZ: 15, duration: 500 },
            {
              translateX: 100,
              translateY: 310,
              duration: 500,
            },
          ],
          easing: 'linear',
        });
      } else {
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
      }

      playerObj.axe = 'Unstuck';
      removeGlow();
      playerObj.activeItem = 'None';
    } else {
      message(`That doesn't work.`);
      removeGlow();
      playerObj.activeItem = 'None';
    }
  } else if (playerObj.inventory.includes('Axe')) {
    if (!(playerObj.activeItem === 'Axe')) {
      removeGlow();
      playerObj.activeItem = 'Axe';
      addGlow();
    } else {
      removeGlow();
      playerObj.activeItem = 'None';
      console.log(playerObj.activeItem);
    }
  } else {
    message(`Axe found!`);

    if (window.innerWidth < 1280) {
      anime({
        targets: '.axe',
        translateX: 600,
        translateY: 500,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else if (window.innerWidth >= 900 && window.innerWidth < 1920) {
      anime({
        targets: '.axe',
        translateX: 740,
        translateY: 100,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else {
      anime({
        targets: '.axe',
        translateX: 975,
        translateY: 125,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    }

    playerObj.inventory.push('Axe');
  }
});

$(document).on('click', '.basement_key', () => {
  if (!playerObj.inventory.includes('Basement Key')) {
    message(`Basement Key found!`);

    if (window.innerWidth < 1279) {
      anime({
        targets: '.basement_key',
        translateX: 100,
        translateY: 550,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else if (window.innerWidth >= 900 && window.innerWidth < 1920) {
      anime({
        targets: '.basement_key',
        translateX: 755,
        translateY: -15,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else {
      anime({
        targets: '.basement_key',
        translateX: 1000,
        translateY: -75,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    }

    playerObj.inventory.push('Basement Key');
  } else {
    if (!(playerObj.activeItem === 'Basement Key')) {
      removeGlow();
      playerObj.activeItem = 'Basement Key';
      addGlow();
    } else {
      removeGlow();
      playerObj.activeItem = 'None';
      console.log(playerObj.activeItem);
    }
  }
});

$(document).on('click', '.note_with_passcode', () => {
  if (!playerObj.inventory.includes('Note With Passcode')) {
    message(`Note with passcode found!`);

    if (window.innerWidth < 1279) {
      anime({
        targets: '.note_with_passcode',
        translateX: -17,
        translateY: 465,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else if (window.innerWidth >= 900 && window.innerWidth < 1920) {
      anime({
        targets: '.note_with_passcode',
        translateX: 470,
        translateY: 25,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else {
      anime({
        targets: '.note_with_passcode',
        translateX: 622,
        translateY: 13,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    }

    playerObj.inventory.push('Note With Passcode');
  } else {
    if (!(playerObj.activeItem === 'Note With Passcode')) {
      removeGlow();
      playerObj.activeItem = 'Note With Passcode';
      addGlow();
    } else {
      removeGlow();
      playerObj.activeItem = 'None';
      console.log(playerObj.activeItem);
    }
  }
});

$(document).on('click', '.shovel', () => {
  if (!playerObj.inventory.includes('Shovel')) {
    message(`Shovel found!`);

    if (window.innerWidth < 1279) {
      anime({
        targets: '.shovel',
        translateX: -425,
        translateY: 375,
        height: '25%',
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else if (window.innerWidth >= 900 && window.innerWidth < 1920) {
      anime({
        targets: '.shovel',
        translateX: 310,
        translateY: -190,
        height: '25%',
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else {
      anime({
        targets: '.shovel',
        translateX: 405,
        translateY: -305,
        height: '25%',
        duration: 500,
        easing: 'easeInOutQuad',
      });
    }

    playerObj.inventory.push('Shovel');
  } else {
    if (!(playerObj.activeItem === 'Shovel')) {
      removeGlow();
      playerObj.activeItem = 'Shovel';
      addGlow();
    } else {
      removeGlow();
      playerObj.activeItem = 'None';
      console.log(playerObj.activeItem);
    }
  }
});

$(document).on('click', '.drawer_key', () => {
  if (!playerObj.inventory.includes('Drawer Key')) {
    message(`Drawer Key found!`);

    if (window.innerWidth < 1279) {
      anime({
        targets: '.drawer_key',
        translateX: 75,
        translateY: 175,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else if (window.innerWidth >= 900 && window.innerWidth < 1920) {
      anime({
        targets: '.drawer_key',
        translateX: 550,
        translateY: -225,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else {
      anime({
        targets: '.drawer_key',
        translateX: 725,
        translateY: -325,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    }

    playerObj.inventory.push('Drawer Key');
  } else {
    if (!(playerObj.activeItem === 'Drawer Key')) {
      removeGlow();
      playerObj.activeItem = 'Drawer Key';
      addGlow();
    } else {
      removeGlow();
      playerObj.activeItem = 'None';
      console.log(playerObj.activeItem);
    }
  }
});

$(document).on('click', '.rope', () => {
  if (!playerObj.inventory.includes('Rope')) {
    message(`Rope found!`);

    if (window.innerWidth < 1279) {
      anime({
        targets: '.rope',
        translateX: -40,
        translateY: 540,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else if (window.innerWidth >= 900 && window.innerWidth < 1920) {
      anime({
        targets: '.rope',
        translateX: 450,
        translateY: 95,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    } else {
      anime({
        targets: '.rope',
        translateX: 590,
        translateY: 100,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    }

    playerObj.inventory.push('Rope');
  } else {
    if (!(playerObj.activeItem === 'Rope')) {
      removeGlow();
      playerObj.activeItem = 'Rope';
      addGlow();
    } else {
      removeGlow();
      playerObj.activeItem = 'None';
      console.log(playerObj.activeItem);
    }
  }
});

$(document).on('click', '.umbrella', () => {
  message(`Who am I, Mary Poppins?`);
});

$(document).on('click', '.bees', () => {
  message(`BEES!?‽`);
});

$(document).on('click', '.creepy_face_eyes_closed', () => {
  message(`I hate that someone drew a face here...`);
});

$(document).on('click', '.creepy_face_eyes_open', () => {
  message(`You're being watched...`);
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
  storeScore();
};

async function storeScore(time) {
  try {
    const user_id = document
      .getElementById('gameSpace')
      .getAttribute('user_id');
    const time = Number(localStorage.getItem('elapsedTime'));
    const bodyObj = { user_id, time };

    const response = await fetch('/api/scores', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      return;
    }
    alert("Check if you're among the top 5 players in the gamescore table!!");
  } catch (err) {
    console.log(err);
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
  if ($('.bees')) {
    $('.bees').remove();
  }
  if ($('.umbrella')) {
    $('.umbrella').remove();
  }
  if ($('.creepy_face_eyes_open')) {
    $('.creepy_face_eyes_open').remove();
  }
  if ($('.creepy_face_eyes_closed')) {
    $('.creepy_face_eyes_closed').remove();
  }
};
