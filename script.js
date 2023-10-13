// text box code
// array of text nodes that will be pulled from


//player class will include the inventory, health, name, atack, defend, and use item methods
// 10/9 only worrying about the inventory today
const startGame = () => {
  state = {};
  showText(0,textNodes);
};
class Player {
  constructor(name) {
    this.name = name;
    this.health = 74;
    // may use .find to check if something is in inventory if that is needed
    this.inventory = []
    this.attacks= {
        sword: 15
    }
  }
  attack(target){
    target.health-= this.attacks.sword
  }

  useItem(item) {
    item.use();
    }
  getItem(item,source,id){
    this.inventory.push(item)
// adds the item picture to the inventory
    const inventory= document.getElementById("inventory")
    const img= document.createElement("img")
    img.className="itemPics"
    img.src = source
    img.setAttribute("id",id)
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
    this.attacks = {
        boneSlash: Math.floor(Math.random() * 15)
        }
    }
    attack(){
    adventurer.health-= this.attacks.boneSlash
    }
  }
 

class EvilWizard extends Enemy {
  constructor(name) {
    super(name);
    this.health = 90;
  }
}
const displayEnemey = (source,id)=>{
    const badGuysBox= document.getElementById("badGuys")
    const img= document.createElement("img")
    img.className="enemyPics"
    img.src = source
    img.setAttribute("id",id)
    badGuysBox.appendChild(img)
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
},"healthPotion");

const useHealthpotion=()=>{
    const img=document.getElementById("healthPotion")
    img.addEventListener("click",()=>{adventurer.useItem(healthPotion)
        const div =document.getElementById("inventory")
        div.removeChild(img)
        console.log("yes")
    })
}

const sword = new UseableItem("sword");

const shield = new UseableItem("shield", () => {
    adventurer.inventory.shield=true
    // not sure how i will  block an attack yet -
},"shield");
// i think this is testing i can remove it later if nothing is breaking
//adventurer.useItem(sword);
const buttonAction=()=>{

}
let state = {};
let keepState=0
const textNodes = [
  {
    index: 0,
    text: "Hello adventurer (name here). After the night you had I imagine you feel like poop. Here have a health potion.",
    options: [
      {
        text: "drink the potion",
        action:()=>{adventurer.useItem(healthPotion)
        console.log(adventurer.health)},
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
            text: "Pick up your sword and shield",
            nextText: 5,
            action:()=>{adventurer.getItem(sword,"./assets/—Pngtree—silver short sword decorative illustration_4707805.png")
            adventurer.getItem(shield,"./assets/Daco_6138019.png")
        }
        }
    ]
  },
  {
    index:5,
    text:"Now let's not waste any more time. We must make for the forest of frogs just outside of the Wizard's castle. ",
    options:[
        {
            text:"Ok I'm waiting on you",
            nextText: 6,
            action:()=>{
                document.body.style.backgroundImage ="url(./assets/vecteezy_deep-forest-fantasy-backdrop-concept-art-realistic_22807025_774.jpg"
            }
        }
    ]
  },
  {
    index: 6,
    text:"Once you get past the frogs this place is quite beautiful.",
    options:[
        {
            text:"I'm not here for sight seeing",
            action:()=>{displayEnemey("assets/alekzander-zagorulko-undex-creatures-01.png","skeleton")},
            nextText:7
        }
    ]
  },
  {
    index: 7,
    text:"Oh that's right! We are on a mission. But if you would have done a litte sight seeing you have noticed that skeleton creature that's about to attack you.",
    options:[
        {
            text:"You have been suprised!!",
            nextText:8,
            action:()=>{
                keepState=8
                letsFight()
            }

        }
    ]
  },
  {
    index:8,
    text:"the congads on winning that fight",
    options:[
        {
            text:"lets get going",
            nextText:9
        }
    ]
  },
  {
    index:9,
    text:"things",
    options:[
       {
        text:"things",
        nextText:10
       }

    ]
  }
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
  currentTextNode.options.forEach((options) => {
    // if(checkRequirement(option)){
    const button = document.createElement("button");
    button.innerText = options.text;
    button.classList.add("btn");
    optionButtions.appendChild(button);
    button.addEventListener("click", () => clickOption(options,nodes));
    console.log(button);
    //}
  });
};
const clickOption = (options,nodes) => {
  const nextTextId = options.nextText;
  // might need an if statement here for if an option restarts the game
  state = Object.assign(state, options.setState);
  showText(nextTextId,nodes);
  if("action" in options){
    options.action()
  }
    
};

const checkRequirement = (option) => {
  return option.requirment === null || option.requirment(state);
};

const checkWinOrLose=(enemy)=>{
    if(adventurer.health<=0){
        textElement.innerText="Im sorry Adventure but you have died"
    }
    if(enemy.health<=0){
        console.log(bones.health)
        showText(2,fightNodes)
    }
}

// fight function
const fightNodes=[
    {
        index:0,
        text:`You have been hit and lost  ${bones.attacks.boneSlash} HP.`,
        options:[
            {
                text:"keep fighting",
                action:()=>{bones.attack()
                console.log(adventurer.health)
                console.log(bones.health)
                },
                nextText:1
            }
        ]
    },
    {
        index:1,
        text:"you turn to attack",
        options:[
            {
                text:"attack with sword",
                action:()=>{adventurer.attack(bones)
                checkWinOrLose(bones)},
                nextText:0

            },
            {
                text:"attack with shield",
                nextText:0
            }
        ]
    },
    {
        index: 2,
        text:"you have defeated you foe. Congratulations!!",
        options:[
            {
                text:"Lets warp this up!",
                nextText:0,
                action:()=>{showText(keepState,textNodes)}
            }
        ]
    }
]
const letsFight =()=>{
    showText(0,fightNodes)
   
    console.log(keepState)

}

console.log(Player);

startGame();
