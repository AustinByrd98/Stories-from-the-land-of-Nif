// text box code
// array of text nodes that will be pulled from
// might put this in  the player class when it's built
let state = {}
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
        nextText: 3,
      },
      {
        text: "save the potion for later",
        //function for putting items in inventory
        nextText: 1,
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
      },
    ],
  },
  {
    index: 2,
    text: "Great well gather your things and let's get going",
    nextText: 4,
  },
  {
    index: 3,
    text: "OK that's fine it is probably too great a quest for you anyway",
    // end game function here
  },
  {
    index:4
  }
];

const startGame =()=>{
    state={}
    showText(0)
}
const textElement = document.getElementById("text");
const optionButtions = document.getElementById("buttons");

const checkTextIndex =(textIndex)=>{
    return textNodes.index === textIndex
}

const showText = (textIndex) => {
  const currentTextNode = textNodes.find((textObject)=>{ return textObject.index === textIndex});
  console.log(textIndex)
  console.log(currentTextNode);
  textElement.innerText = currentTextNode.text;

  while(optionButtions.firstChild){
    optionButtions.removeChild(optionButtions.firstChild)
  }

  //adding button text 
  currentTextNode.options.forEach(options =>{
    // if(checkRequirement(option)){
        const button = document.createElement("button")
        button.innerText = options.text
        button.classList.add("btn")
        optionButtions.appendChild(button)
        button.addEventListener("click", ()=> clickOption(options) )
        console.log(button)
    //}
  })
};
const clickOption =(options) =>{
    const nextTextId = options.nextText
    // might need an if statement here for if an option restarts the game
    state= Object.assign(state, options.setState )
    console.log(options)
    console.log(options.nextText)
    console.log(nextTextId)
    showText(nextTextId)
}

const checkRequirement =(option) =>{
    return option.requirment===null || option.requirment(state)

}

startGame()