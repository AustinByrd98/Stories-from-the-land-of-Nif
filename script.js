// text box code
// array of text nodes that will be pulled from


//player class will include the inventory, health, name, atack, defend, and use item methods
// 10/9 only worrying about the inventory today
const startGame = () => {
  state = {};
  showText(0);
};
class Player {
  constructor(name) {
    this.name = name;
    this.health = 74;
    // may use .find to check if something is in inventory if that is needed
    this.inventory = [];
  }
  // attack and defend methods
  useItem(item) {
    item.use();
  }
  getItem(item,source){
    this.inventory.push(item)

    const inventory= document.getElementById("inventory")
    const img= document.createElement("img")
    img.className="itemPics"
    img.src = source
    inventory.appendChild(img)
  }
}

class UseableItem {
  constructor(name, use) {
    this.name = name;
    this.use = use;
  }
}
class Enemy {
  constructor(name) {
    this.name = name;
    this.health = 75;
  }
  attck() {
    // can make this a random function maxing out at 15
    adventurer.health - 10;
  }
}
class EvilWizard extends Enemy {
  constructor(name) {
    super(name);
    this.health = 90;
  }
}
const bones = new Enemy("bones");
const EvilbadWizard = new EvilWizard("evil wizard");
const adventurer = new Player("name");
//useable items get passed an anoumous function that preforms it's action and is passed into the UseableItem this.use and can then be invoked by the useItem method in the Player class
const healthPotion = new UseableItem("health potion", () => {
  //if statements that make sure that the health can't go above 100
  if (adventurer.health < 100 && adventurer.health > 75) {
    const difference = 100 - adventurer.health;
    adventurer.health += difference;
    console.log("test");
  } else if (adventurer.health <= 75) {
    adventurer.health += 25;
  }
});

const sword = new UseableItem("sword", () => {
  Enemy.health--;
  console.log(bones);
});

const shield = new UseableItem("shield", () => {
    // not sure how i will  block an attack yet -
});

adventurer.useItem(sword);
const buttonAction=()=>{

}
let state = {};
const textNodes = [
  {
    index: 0,
    text: "Hello adventurer (name here). After the night you had I imagine you feel like poop. Here have a health potion.",
    options: [
      {
        text: "drink the potion",
        // health potion function here
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
        hasAction:true,
        action: ()=>{adventurer.getItem(healthPotion,"./assets/pngaaa.com-5184525.png")}
      },
    ],
  },
  {
    index: 1,
    text: "Ok (name here) now that you feel well enough to get moving I'll bring you up to speed. Last night there was an attack on our little village of Nif. An evil wizard stole our most precious jem. The ruby of protection. It's the gem that has kept our little village heathy and happy. Now that It's gone everyone is already getting sick and it's up to you to go and get it back. Do you accept this quest?",
    options: [
      {
        text: "Yes I accept!",
        nextText: 2,
      },
      {
        text: "No let me sleep!",
        nextText: 3,
        action:()=>{setTimeout(startGame,3000)}
      }
    ],
  },
  {
    index: 2,
    text: "Great well gather your things and let's get going",
    options:[
        {
            text:"Click to continue", 
            nextText: 4,
        }
    ]
   
  },
  {
    index: 3,
    text: "OK that's fine it is probably too great a quest for you anyway",
    
  },
  {
    index: 4,
    text:"Make sure you get your sword and shield. You will need them!",
    options:[
        {
            text: "Pick up sword and shield",
            nextText: 5,
            action:()=>{adventurer.getItem(sword,"./assets/—Pngtree—silver short sword decorative illustration_4707805.png")
            adventurer.getItem(shield,"./assets/Daco_6138019.png")
        }
        }
    ]
  },
  {
    index:5,
    text:"loram",
    options:[
        {
            text:"things"
        }
    ]
  }
];


const textElement = document.getElementById("text");
const optionButtions = document.getElementById("buttons");

const checkTextIndex = (textIndex) => {
  return textNodes.index === textIndex;
};

const showText = (textIndex) => {
  const currentTextNode = textNodes.find((textObject) => {
    return textObject.index === textIndex;
  });
  console.log(textIndex);
  console.log(currentTextNode);
  textElement.innerText = currentTextNode.text;

  while (optionButtions.firstChild) {
    optionButtions.removeChild(optionButtions.firstChild);
  }

  //adding button text
  currentTextNode.options.forEach((options) => {
    // if(checkRequirement(option)){
    const button = document.createElement("button");
    button.innerText = options.text;
    button.classList.add("btn");
    optionButtions.appendChild(button);
    button.addEventListener("click", () => clickOption(options));
    console.log(button);
    //}
  });
};
const clickOption = (options) => {
  const nextTextId = options.nextText;
  // might need an if statement here for if an option restarts the game
  state = Object.assign(state, options.setState);
  console.log(options);
  console.log(options.nextText);
  console.log(nextTextId);
  showText(nextTextId);
  if("action" in options){
    options.action()
  }
    
};

const checkRequirement = (option) => {
  return option.requirment === null || option.requirment(state);
};

console.log(Player);
startGame();
