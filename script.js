// text box code
// array of text nodes that will be pulled from

//player class will include the inventory, health, name, atack, defend, and use item methods
// 10/9 only worrying about the inventory today
const startGame = () => {
  state = {};
  showText(0, textNodes);
  displayHealth(null)
};
class Player {
  constructor(name) {
    this.name = name;
    this.health = 75;
    // may use .find to check if something is in inventory if that is needed
    this.inventory = [];
    this.attacks = {
      sword: 15,
    };
  }
  attack(target) {
    target.health -= this.attacks.sword;
  }

  useItem(item) {
    item.use();
  }
  getItem(item, source, id) {
    this.inventory.push(item);
    // adds the item picture to the inventory
    const inventory = document.getElementById("inventory");
    const img = document.createElement("img");
    img.className = "itemPics";
    img.src = source;
    img.setAttribute("id", id);
    inventory.appendChild(img);
  }
}

class UseableItem {
  constructor(name, use) {
    this.name = name;
    this.use = use;
  }
}
class CollectibleItem {
  constructor(name) {
    this.name = name;
  }
}
class Enemy {
  constructor(name) {
    this.name = name;
    this.health = 75;
    this.attacks = {
      boneSlash: Math.floor(Math.random() * 15),
    };
  }
  attack() {
    adventurer.health -= this.attacks.boneSlash;
  }
  caught() {
    showText(50, textNodes);
  }
}

class EvilWizard {
  constructor(name) {
    this.name=name
    this.health = 150;
    this.attacks= 
      {fireBall: Math.floor(Math.random() * 50)}
    }
  attack(){
      adventurer.health -= this.attacks.fireBall
    }
}
const displayEnemey = (source, id) => {
  const badGuysBox = document.getElementById("badGuys");
  const img = document.createElement("img");
  img.className = "enemyPics";
  img.src = source;
  img.setAttribute("id", id);
  badGuysBox.appendChild(img);
};
const removeEnemy = (id) => {
  const badGuysBox = document.getElementById("badGuys");
  const badGuy = document.getElementById(id);
  badGuysBox.removeChild(badGuy);
};
const bones = new Enemy("bones");
const evilbadWizard = new EvilWizard("evil wizard");
const adventurer = new Player("name");
//useable items get passed an anoumous function that preforms it's action and is passed into the UseableItem this.use and can then be invoked by the useItem method in the Player class
const healthPotion = new UseableItem(
  "health potion",
  () => {
    //if statements that make sure that the health can't go above 100
    if (adventurer.health < 100 && adventurer.health > 75) {
      const difference = 100 - adventurer.health;
      adventurer.health += difference;
      displayHealth(null);
    } else if (adventurer.health <= 75) {
      adventurer.health += 25;
      displayHealth(null)
    }
  },
  "healthPotion"
);

const makeClickableImage = (id, location, callback) => {
  const button = document.createElement("button");
  const img = document.getElementById(id);
  button.innerHTML = img;

  img.addEventListener("click", () => {
    callback;
    const div = document.getElementById(location);
    div.removeChild(img);
    console.log("yes");
  });
};
const attackHiddenEnemeys = (source, id, index) => {
  console.log("jlh");
  // displayEnemey(source,id)
  // showText(index,textNodes)
};
// collectible items below
const goldCoin = new CollectibleItem("gold coin");
const ruby = new CollectibleItem("Ruby of Protection");
// useable items below
const sword = new UseableItem("sword");

const shield = new UseableItem(
  "shield",
  () => {
    adventurer.inventory.shield = true;
    // not sure how i will  block an attack yet -
  },
  "shield"
);

const superAxe = new UseableItem("Enchanted Axe");

const eyeOfGoodness= new UseableItem("eye of goodness",()=>{
        evilbadWizard-=75
})




let keepState = 0;
let attacker = {};

const textNodes = [
  {
    index: 0,
    text: `Hello adventurer (name here). After the night you had I imagine you feel like poop. Your health is at ${adventurer.health}.  Here have a health potion.`,
    options: [
      {
        text: "drink the potion",
        action: () => {
          adventurer.useItem(healthPotion);
          console.log(adventurer.health);
        },
        nextText: 1,
      },
      {
        text: "refuse the potion",
        nextText: 1,
      },
      {
        text: "save the potion for later",
        //function for putting items in inventory
        nextText: 1,
        hasAction: true,
        action: () => {
          adventurer.getItem(
            healthPotion,
            "./assets/pngaaa.com-5184525.png",
            "healthPotion"
          );
          makeClickableImage(
            "healthPotion",
            "inventory",
            adventurer.useItem(healthPotion)
          );
        },
      },
    ],
  },
  {
    index: 1,
    text: "Ok (name here) now that you feel well enough to get moving I'll bring you up to speed. Last night there was an attack on our little village of Nif. An evil wizard stole our most precious jem. The Ruby of Protection. It's the gem that has kept our little village heathy, happy, and safe. Now that It's gone everyone is already getting sick and it's up to you to go and get it back. Do you accept this quest?",
    options: [
      {
        text: "Yes I accept!",
        nextText: 2,
      },
      {
        text: "No let me sleep!",
        nextText: 3,
        action: () => {
          setTimeout(startGame, 3000);
        },
      },
    ],
  },
  {
    index: 2,
    text: "Great well gather your things and let's get going",
    options: [
      {
        text: "Click to continue",
        nextText: 4,
      },
    ],
  },
  {
    index: 3,
    text: "OK that's fine it is probably too great a quest for you anyway",
  },
  {
    index: 4,
    text: "Make sure you get your sword and shield. You will need them!",
    options: [
      {
        text: "Pick up your sword and shield",
        nextText: 5,
        action: () => {
          adventurer.getItem(
            sword,
            "./assets/—Pngtree—silver short sword decorative illustration_4707805.png"
          );
          adventurer.getItem(shield, "./assets/Daco_6138019.png");
          
        },
      },
    ],
  },
  {
    index: 5,
    text: "Now let's not waste any more time. We must make for the forest of frogs just outside of the Wizard's castle. ",
    options: [
      {
        text: "Ok I'm waiting on you",
        nextText: 6,
        action: () => {
          document.body.style.backgroundImage =
            "url(./assets/vecteezy_deep-forest-fantasy-backdrop-concept-art-realistic_22807025_774.jpg";
          //displayEnemey("assets/image-from-rawpixel-id-6265744-original.png", "hiddenSkull")
        },
      },
    ],
  },
  {
    index: 6,
    text: "Once you get past the frogs this place is quite beautiful.",
    options: [
      {
        text: "I'm not here for sight seeing",
        action: () => {
          displayEnemey(
            "assets/alekzander-zagorulko-undex-creatures-01.png",
            "skeleton"
          );
        },
        nextText: 7,
      },
    ],
  },
  {
    index: 50,
    text: "Good eyes adventure. You spotted the skeleton monster before he could attack. You now get to land the frist attack.",
    options: [
      {
        text: "strike frist",
        nextText: 101,
        action: () => {
          displayEnemey(
            "assets/alekzander-zagorulko-undex-creatures-01.png",
            "skeleton"
          );
        },
      },
    ],
  },
  {
    index: 7,
    text: "Oh that's right! We are on a mission. But if you would have done a litte sight seeing you have noticed that skeleton creature that's about to attack you.",
    options: [
      {
        text: "You have been suprised!!",
        nextText: 101,
        action: () => {
          keepState = 8;
         attacker =bones
          bones.attack();
        },
      },
    ],
  },
  {
    index: 8,
    text: "Good job on sending the skeleton back to the dead. It look like he dropped somethings when he died. ",
    options: [
      {
        text: " Ignore the items and keep moving",
        nextText: 9,
        action: () => {
          displayHealth(null)
          removeEnemy("skeleton");
        },
      },
      {
        text: "pick up the items",
        nextText: 10,
        action: () => {
          displayHealth(null)
          adventurer.getItem(
            goldCoin,
            "assets/—Pngtree—gold coin_3779125.png",
            "goldCoin"
          );
          adventurer.getItem(superAxe, "assets/pngegg (1).png", "superAxe");
          removeEnemy("skeleton");
        },
      },
    ],
  },
  {
    index: 9,
    text: "Ok well you are mighty decated to seeing this wizard dead. I just hope you don't need any of those things.",
    options: [
      {
        text: "Naw I'll be fine",
        nextText: 11,
      },
    ],
  },
  {
    index: 10,
    text: "Wow thats the Great King Tabak's axe. It is said that his hatred for evil magic was passed to the axe when he died. It deals greater damage to those who use magic for evil purposes. But why was this skeleton carrying it?",
    options: [
      {
        text: "I don't know, but we need to keep moving",
        nextText: 11,
      },
      {
        text: "Is that a note stuck to the skeleton?",
        nextText: 12,
      },
    ],
  },
  {
    index: 11,
    text: "You're right lets keep moving I think I see the evil wizard's castle up ahead",
    options: [
      {
        text: "I see it too. Lets go",
        nextText: 13,
        action: () => {
          document.body.style.backgroundImage =
            "url(./assets/ai-generated-8123752_1280.jpg";
        },
      },
    ],
  },
  {
    index: 12,
    text: "Yes it is. It says 'If you want answers and help defeating the evil Wizard meet me here signed King Tabak' How is that possible? King Tabak died years ago! I know where this location is. Do you want to go? ",
    options: [
      {
        text: "It will have to wait",
        nextText: 11,
      },
      {
        text: "Lets go I want answers",
        nextText: 14,
      },
    ],
  },
  {
    index: 13,
    text: "Ok we finally made it. There is the castle. What should we do now?",
    options: [
      {
        text: "Storm in and attack! I want the frist strike.",
        nextText: 15,
      },
      {
        text: "I'm not sure if I'm ready for this. Lets go back to that meeting place on the note.",
        nextText: 14,
      },
    ],
  },
  {
    index: 14,
    text: "OK well lets get going it's not too far",
    options: [
      {
        text: "OK",
        nextText: 16,
        //action: background change here
      },
    ],
  },
  {
    index: 16,
    text: "That's King Tabak!! 'Hello adventure my name is King Tabak. Iv'e been in hiding since my last battle with the evil wizard. He almost killed me that day and i just barely escaped as he vowed to end my life. I ran because I knew I couldn't defeat him without the Eye of Goodness. It has taken me years to find it but I finally found it. I'm too weak to use it now, but you are not. Will you take it along with this health potion?",
    options: [
      {
        text: "Yes, I need all the help I can get.",
        action: () => {
          adventurer.getItem(
            healthPotion,
            "./assets/pngaaa.com-5184525.png",
            "healthPotion"
          );
          adventurer.getItem(eyeOfGoodness,"assets/fractal-2038085_640.png","eye")
          makeClickableImage(
            "healthPotion",
            "inventory",
            adventurer.useItem(healthPotion));
          makeClickableImage(
            "eye",
            "inventory",
            adventurer.useItem(eyeOfGoodness));
        },
      },
    ],
  },
  {
    index:17,
    text:"That Eye of Goodness. When you use it the evil wizard will lose 75 points of health out of his 150. You might just have a chance to bet him!",
    options:[
      {
        text:"Awesome well let's go",
        nextText:13
      }
    ]
  },
  {
    index: 15,
    text: "OK well there is the door lets go!!",
    options: [
      {
        text: "Storm the gates!!",
        nextText: 18,
        action: () => {
          document.body.style.backgroundImage =
            "url(./assets/vecteezy_inside-the-palace-of-abandoned-magnificent-castle_22263438_117.jpg";
          adventurer.attack(evilbadWizard);
        },
      },
    ],
  },
  {
    index: 18,
    text: "You landed an attack on the wizard",
    options: [
      {
        text: "Let the fight begin!",
        nextText: 19,
        action: () => {
         Object.assign(attacker, evilbadWizard)
          keepState = 20;
          displayEnemey("./assets/PngItem_5746155.png", "evilWizard");
        },
      },
    ],
  },
  {
    index: 19,
    text: "YOU THINK YOU CAN ATTACK ME IN MY ONW HOME!!!!",
    options: [
      {
        text: "Continue",
        nextText: 100,
        action: () => {
          // displayEnemey("assets/pngegg (2).png","weakSkeleton1")
          // displayEnemey("assets/pngegg (2).png","weakSkeleton2")
        },
      },
    ],
  },
  {
    index: 20,
    text: "Cogratulations adventure you have done it. You killed the evil wizard and look there is the ruby. Grab it and let's get it back to the village.",
    options: [
      {
        text: "Grab the ruby",
        nextText: 21,
        action: () => {
          adventurer.getItem(
            ruby,
            "assets/—Pngtree—ruby stone prism gemstone_5815791.png",
            "ruby"
          );
          document.body.style.backgroundImage =
            "url(assets/vecteezy_farm-fantasy-backdrop-concept-art-realistic-illustration_22807383_565.jpg)";
          removeEnemy("evilWizard");
        },
      },
    ],
  },
  {
    index: 21,
    text: "Ok adventure this is it the end of our adventure. You saved the village!!",
    options: [
      {
        text: "end game",
      },
    ],
  },
  {
    index: 100,
    text: `You have been hit.`,
    options: [
      {
        text: "keep fighting",
        action: () => {
          attacker.attack();
          console.log(adventurer.health);
          console.log(attacker.health);
          displayHealth(attacker)
        },
        nextText: 101,
      },
    ],
  },
  {
    index: 101,
    text: `You're turn to attack.`,
    options: [
      {
        text: "attack with sword",
        action: () => {
          adventurer.attack(attacker);
          checkWinOrLose(attacker);
          console.log(attacker)
          console.log(attacker.health)
          displayHealth(attacker)
          //showText(100,textNodes)
        },
        nextText: 100,
      },
      {
        text: "attack with shield",
        nextText: 100,
      },
    ],
  },
  {
    index: 2,
    text: "you have defeated you'er foe. Congratulations!!",
    options: [
      {
        text: "Lets warp this up!",
        nextText: 0,
        action: () => {
         // showText(keepState, textNodes);
        },
      },
    ],
  },
];

const textElement = document.getElementById("text");
const optionButtions = document.getElementById("buttons");

const checkTextIndex = (textIndex) => {
  return textNodes.index === textIndex;
};

const showText = (textIndex, nodes) => {
  const currentTextNode = nodes.find((textObject) => {
    return textObject.index === textIndex;
  });
  console.log(textIndex);
  console.log(currentTextNode);
  textElement.innerText = currentTextNode.text;

  while (optionButtions.firstChild) {
    optionButtions.removeChild(optionButtions.firstChild);
  }

  //adding button text
  currentTextNode.options.forEach(
    (options) => {
      // if(checkRequirement(options)){
      const button = document.createElement("button");
      button.innerText = options.text;
      button.classList.add("btn");
      optionButtions.appendChild(button);
      button.addEventListener("click", () => clickOption(options, nodes));
      console.log(button);
    }
    //}
  );
};
const clickOption = (options, nodes) => {
  const nextTextId = options.nextText;
  // might need an if statement here for if an option restarts the game
  state = Object.assign(state, options.setState);
  showText(nextTextId, nodes)
  if ("action" in options) {
    options.action();
  } 
};

const checkRequirement = (option) => {
  return option.requirment === null || option.requirment;
};

const checkWinOrLose = (enemy) => {
  if (adventurer.health <= 0) {
    textElement.innerText = "Im sorry Adventure but you have died";
  } else if (enemy.health <= 0) {
    showText(keepState, textNodes);
  }
};

const letsFight = (attacker, node) => {
  showText(node, fightNodes);
  attacker = attacker;
  console.log(keepState);
  console.log(attacker);
};

const displayHealth =(enemy)=>{
  const playerHealth =document.getElementById("playerHealth")
  const enemyHealth = document.getElementById("enemyHealth")
  
  if (enemy===null)
  {
    playerHealth.innerText = `Adventure's health: ${adventurer.health}`
   
    
  } else{
    enemyHealth.innerText = `${enemy.name}'s health: ${enemy.health}`
    playerHealth.innerText = `Adventure's health: ${adventurer.health}`
  }

}

console.log(Player);
startGame();
