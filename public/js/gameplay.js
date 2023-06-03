// const anime = require('animejs');
// const session = require('express-session');

const playerObj = {
  inventory: [],
  usedItems: [],
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
  if (!playerObj.inventory.includes('Axe')
  ) {
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
  };

  addArrowKToLR();

  if (playerObj.drawer !== 'Opened') {
    addClosedDrawer();
  } else {
    addOpenedDrawer();
    if (!playerObj.inventory.includes('Note With Passcode') && !playerObj.usedItems.includes('Note With Passcode')
    ) {
      addNoteWithPasscode();
    };
  };
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

$(document).on('click', '.axe', () => {
  if (!playerObj.inventory.includes('Rope')) {
    message(`I can't reach it!`);
  } else if (playerObj.axe === 'Unstuck') {
    message(`Axe found!`);
    $('.axe').remove();
    playerObj.inventory.push('Axe');
    console.log(playerObj.inventory);

  } else {
    message(`You knocked the axe down!`);

    anime({
      targets: '.axe',
      rotateY: 50,
      translateX: 250,
    });


    playerObj.axe = 'Unstuck';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    // $('.axe').remove();
    addOpenedTrapdoor();
  }
});

$(document).on('click', '.hardwood_door_closed', () => {
  if (!playerObj.inventory.includes('Axe')) {
    message(`It's locked...`);
  } else {
    message(`You axed the door!`);

    playerObj.hardwoodDoor = 'Broken';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.hardwood_door_closed').remove();
    addBrokenHardwoodDoor();
  }
});

$(document).on('click', '.trapdoor_closed', () => {
  if (!playerObj.inventory.includes("Basement Key")) {
    message(`Locked... darn.`);
  } else {
    message(`Basement door unlocked!`);
    let index = playerObj.inventory.indexOf("Basement Key");

    playerObj.inventory.splice(index, 1);
    playerObj.usedItems.push("Basement Key")
    playerObj.trapdoor = "Opened"

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.trapdoor_closed').remove()
    addOpenedTrapdoor();
  };
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

$(document).on('click', '.basement_key', () => {
  message(`Basement Key found!`);
  $('.basement_key').remove();
  playerObj.inventory.push('Basement Key');
  console.log(playerObj.inventory);
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
    };
    
  }

  determineRoomItems();
});

$(document).on('click', '.drawer_closed', () => {
  if (!playerObj.inventory.includes('Drawer Key')) {
    message(`Locked! Why is everything locked?`);
  } else {
    message(`Safe unlocked!`);
    let index = playerObj.inventory.indexOf('Drawer Key');

    playerObj.inventory.splice(index, 1);
    playerObj.usedItems.push('Drawer Key');
    playerObj.drawer = 'Opened';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.drawer_closed').remove();
    addOpenedDrawer();
    addNoteWithPasscode();
  }
});

$(document).on('click', '.note_with_passcode', () => {
  message(`Note with passcode found!`);
  $('.note_with_passcode').remove();
  playerObj.inventory.push('Note With Passcode');
  console.log(playerObj.inventory);
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
  };

  $('.arrowBtoLR').remove();

  if (playerObj.dirtMound !== 'Dug') {
    $('.dirt_mound').remove();
  } else {
    $('.dirt_mound_dug').remove();
    if (!playerObj.inventory.includes('Drawer Key')) {
      $('.drawer_key').remove();
    }
  };

  if (playerObj.safe !== 'Opened') {
    $('.safe_closed').remove();
  } else {
    $('.safe_opened').remove();
    if (!playerObj.inventory.includes('Rope')) {
      $('.rope').remove();
    };
  };

  determineRoomItems();
});

$(document).on('click', '.dirt_mound', () => {
  
  if (!playerObj.inventory.includes('Shovel')) {
    message(`Looks fresh, I feel uneasy.`);
  } else {
    message(`You dug something up!`);

    playerObj.dirtMound = 'Dug';

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.dirt_mound').remove();
    addDugDirtMound();
    addDrawerKey();
  }
});

$(document).on('click', '.shovel', () => {
  message(`Shovel found!`);
  $('.shovel').remove();
  playerObj.inventory.push('Shovel');
  console.log(playerObj.inventory);
});

$(document).on('click', '.safe_closed', () => {
    if (!playerObj.inventory.includes("Note With Passcode")) {
    message(`I don't know the combination.`);
  } else {
    message(`Safe unlocked!`);
    let index = playerObj.inventory.indexOf('Note With Passcode');

    playerObj.inventory.splice(index, 1);
    playerObj.usedItems.push('Note With Passcode');
    playerObj.safe = "Opened";

    // console.log(playerObj.inventory)
    // console.log(playerObj.usedItems)

    $('.safe_closed').remove();
    addOpenedSafe();
    addRope();
  };
});

$(document).on('click', '.drawer_key', () => {
  message(`Drawer Key found!`);
  $('.drawer_key').remove();
  playerObj.inventory.push('Drawer Key');
  console.log(playerObj.inventory);
});

$(document).on('click', '.rope', () => {
  message(`Rope found!`);
  $('.rope').remove();
  playerObj.inventory.push('Rope');
  console.log(playerObj.inventory);
});

$(document).on('click', '.hardwood_door_broken', () => {
  message(`You Win!!!!!!!!`);
});

// anime({
//   targets: '.axe',
//   opacity: 0.5,
//   duration: 1000,
//   easing: 'easeInOutQuad',
// });
