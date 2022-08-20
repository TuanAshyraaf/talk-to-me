const img = document.querySelector('.profile-pic');
const audio = document.getElementById('audio');

const recognition = new webkitSpeechRecognition();
recognition.continous =  false; 
recognition.lang = 'en-US';
recognition.interimResults = false; 
recognition.maxAlternatives = 1; 

const synth = window.speechSynthesis;
const reply = new SpeechSynthesisUtterance('');

//add animation
const animation = document.getElementById('listening');

img.addEventListener('click', () => {
  recognition.start();
  animation.style.display = 'block';
  animation.classList.add('animation');
});

recognition.onend = () => {
  animation.classList.remove('animation');
  animation.style.display = 'none';
}


//collections of commands and answers 
const commands = [['hi','hai','hei','hello','hallo', 'hye', 'helo', 'halo'],
                   ['how are you', 'are you good'],
                   ['what is your name', 'your name', 'who are you'],
                   ['where do you live', 'where you at', 'where are you'],
                   ['do you have a girlfriend', 'what is your girlfriend'],
                   ['who is your mother', 'what is your mother name'],
                   ['who is your father', 'what is your father name'],
                   ['what are you doing'],
                   ['how old are you', 'what is your age', 'your age'],
                   ['assalamualaikum', 'salam'],
                   ['goodbye', 'good bye', 'bye', 'bye-bye'],
                   ['what is your favourite food', 'favourite food', 'best food'],
                   ['sing me a song', 'sing', 'can u sing', 'sing a song'],
                   ['tell me a joke', 'joke', 'another joke', 'do you have a joke'],
                   ['sorry', 'i am sorry', 'im sorry']];
const answers =  [['hello there, how are you', 'hye', 'sup'],
                  ['i am find, thank you, what about you?', 'im doing good'],
                  ['i am Tuan Ashyraaf, what is your name', 'my name is Tuan Ashyraaf'],
                  ['i live in terengganu', 'i stay at kuala terengganu'],
                  ['i have a girlfriend', 'my girlfriend is Liyana'],
                  ['my mother is Katina'],
                  ['my father is Tuan Embong'],
                  ['i am in conversation with you', ' why would i tell you'],
                  ['it is a secret', 'i am 22 years old', 'i am 10 plus 12 years'],
                  ['wasalam', 'waalaikumussalam'],
                  ['bye, have a good day', 'thank you for talking with me, hope to see you again', 'see you again, bye'],
                  ['i love seafoods', 'i like cakes', 'i love fruits and desserts'],
                  [`Cause sometimes I look in her eyes
                  And that's where I find a glimpse of us
                  And I try to fall for her touch`, `I tried so hard and got so far
                  But in the end it doesn't even matter
                  I had to fall to lose it all
                  But in the end it doesn't even matter`], 
                  [`I invented a new word !. PLAGIARISM, hahahahaha`, `what do call a pig that does a 
                  karate?. Pork Chop hahahahaha`, `what do you call a fake noodles?. IMPASTA!, hahahahaha`],
                  ['apologize accepted', 'its okay my friend', 'dont worry about that']];

const simpleCommands = ['haha', 'is', 'right', 'why', 'ok', 'crazy', 'mama', 'joke', 'funny', 'think', 'so',
                        'where', 'are', 'much' ,'how', 'what', 'do', 'anything', 'hobby'];
const simpleAnswers = ['hahahahahahaha', 'no', 'i dont know', 'dont ask me, i also dont know',
                       'okay', 'no, you are crazy', 'is that big mom from one piece', 'i dont have any hahahaha',
                       'its not funny at all', 'i have no idea','thank you','i dont know, sorry',
                       'you dont need to know about that', 'infinity','fine', 'i cant tell you that',
                       'yes', 'no','my hobby is sleeping'];

const face = document.getElementById('action-face');

recognition.onresult = event => {
  let answered = false;
  const transcript = event.results[0][0].transcript;

  for(let i = 0; i < commands.length; i++){
    for(let j = 0; j < commands[i].length; j++){
      if(transcript.toLowerCase() === commands[i][j] ){
        const randomIndex = getRandomReply(answers[i]);
        reply.text = answers[i][randomIndex];
        synth.speak(reply);
        face.innerHTML = `<i class="fa-regular fa-face-laugh edit-face"></i>`
        displayFace(2500);
        answered = true;
        break;
      }     
    }
  }

  if(!answered){
    let simpleAnswer = false;
    for(let i = 0; i<simpleCommands.length; i++){
      if(transcript.includes(simpleCommands[i])){
        reply.text = simpleAnswers[i];
        face.innerHTML = `<i class="fa-regular fa-face-laugh edit-face"></i>`
        displayFace(2500);
        simpleAnswer = true;
        break;
      }
    }

    if(!simpleAnswer){
      reply.text = 'I dont understand, can you repeat it again?';
      face.innerHTML = `<i class="fa-regular fa-face-tired edit-face"></i>`
      displayFace(3000);
    }
    synth.speak(reply); 
  }
}

// a function to give reply randomly
const getRandomReply = array => {
  const random = Math.floor(Math.random() * array.length);
  return random;
}

let timeOut;

const changeFace = () =>face.innerHTML = `<i class="fa-regular fa-face-smile edit-face"</i>`;
const displayFace = miliseconds => timeOut = setTimeout(changeFace, miliseconds);


//header
const openCloseHeader = document.querySelector('.open-close-header');
const header = document.querySelector('.header');
//const h3 = document.querySelector('h3');

let close = true;

openCloseHeader.addEventListener('click', () => {
  if(close){
    header.style.left = '0';
    close = false;
  }else{
   header.style.left = '-200px';
    close = true;
  }

});

//commands 
const availableCommands = document.querySelector('#commands');
const newDiv = document.createElement('div');
let ul = `<ul>`;

for(let i = 0; i < commands.length; i++){

  if(i === 4) continue;
  ul += `<li>${commands[i][0].toUpperCase()}</li>`;
}

ul += `</ul>`;

newDiv.innerHTML = ul;
availableCommands.append(newDiv);

const setUL = newDiv.firstChild;
setUL.setAttribute('id', 'first-child');
