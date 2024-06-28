//letters
const letters="abcdefghijklmnopqrstuvwxyz"

// get array from our letters string

let lettersarry=Array.from(letters)

//select letters cnontainer

let lettersContainer= document.querySelector(".letters")

//generate letters

lettersarry.forEach(letter => {
    //create span

    let span= document.createElement("span")

    // create text node to put in the element

    let TheLetter= document.createTextNode(letter)

    // Append the letter to the span
    span.appendChild(TheLetter) 

    // add class to span
    span.className='letter-box';
    

    // Append span to the letters-container

    lettersContainer.appendChild(span)
})



// create object of words + categories

const words={
    programming:["python","php","javascript","go","ruby","html","css"],
    movies:["spiderman","superman", "the amazing spiderman","iron man"],
    public_figures:["elon mask","mark","tesla","messi","ronaldo"],
    countries:["egypt","tunis","algeria","saudi arabia","qatar"]
}

// get random property from our four properties  
let allkeys = Object.keys(words)  // get all the keys in an array

let randomPropNumber=  Math.floor( Math.random() * allkeys.length ) // generates number from 0 ot 3
let randomPropName=allkeys[randomPropNumber]
let randomPropValue= words[randomPropName]
let randomValueNumber= Math.floor(Math.random() * randomPropValue.length)
let randomValuevalue= randomPropValue[randomValueNumber] // the word   // = console.log(randomPropValue[randomValueNumber])   


// console.log(randomPropName)


// set category name

document.querySelector(".game-info .category span").innerHTML= randomPropName ;


// select letters guess DIV
 let letterGuessDiv= document.querySelector(".letter-guess")


 // convert choosen word to array 

 let letterAndSpace= Array.from(randomValuevalue);  // the chosen word in an array
//  console.log(letterAndSpace)

// create spans depends on word letters count

letterAndSpace.forEach(letter =>{
    // create empty span

    let empspan = document.createElement("span");

    // if the letter is space
    if(letter === ' '){
        empspan.className="has-space";
    }


    // append the span created to the letter-guess div

    letterGuessDiv.appendChild(empspan)



})



// select guess spans
let guessSpans=document.querySelectorAll(".letter-guess span")
console.log(guessSpans) 


// set wrong attempts count
let wrongAttempts =0;


// sleect the draw element 

let theDraw= document.querySelector(".hangman-draw")




// handling clicking on letters
document.addEventListener("click",(e)=>{

    // set the chose status
    let theStatus= false;
    if(e.target.className==='letter-box'){
        e.target.classList.add("clicked");

        // get the clicked letter
        let theclickedLetter= e.target.innerHTML.toLowerCase();

        // get the chosen word
        let theChosenWord= Array.from(randomValuevalue.toLowerCase()) 
        console.log(theChosenWord);
        // console.log(theChosenWord)


        theChosenWord.forEach((wordLetter,wordindex)=> {

            // check if the clicked letter is equal to one of the chosen word letters
            if(theclickedLetter == wordLetter){

                // set the status to correct
                theStatus= true

                // console.log(`Found At Index Number ${wordindex}`);

                // loop on all guess spans
                guessSpans.forEach((span,spanIndex) => {
                    if(wordindex===spanIndex){
                        span.innerHTML= theclickedLetter
                    }
                });

            }
        });

        // outside loop

        // if letter clicked is wrong 
        if(theStatus!== true){
            // increase wrong attempt value
            wrongAttempts++;
            
            //add class wrong to the draw element
            theDraw.classList.add(`Wrong-${wrongAttempts}`)

            // play failed sound
            document.getElementById("failed").play()

            // check the wrong attemps count

            if(wrongAttempts===8){
                endgame();
                lettersContainer.classList.add("finished")
            }
        } 
        else{
            
            document.getElementById("success").play()
        }
    }
});


// create endgame function

function endgame(){
    //create popup div

    let div=document.createElement("div")

    // create text of popup
    let popText=document.createTextNode(`Game Over ,The Word Is ${randomValuevalue} , Refresh To Enter The Game Again  `)

    //append textnode to the div

    div.appendChild(popText)

    // add class to div

    div.className="popup";

    // append the div to the body
    document.body.appendChild(div)
}