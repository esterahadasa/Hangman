const btn = document.getElementById('btn');
const image = document.getElementById('image');
const letters = document.getElementById('letters');
const mistake = document.getElementById('mistake');

let word;
let mistakes = 6;

document.addEventListener('DOMContentLoaded',onLoad);
document.addEventListener('keyup', onKeyUp);

function onLoad(){
  onReset();
  btn.addEventListener('click', onReset);
}

function onKeyUp(e){
  let guess = e.key;
  if(e.keyCode<65 || e.keyCode>90) return;
  let empty = getEmptySlots();
  let guessed = 0
  empty.forEach(l=>{
    if(l.k==guess){
      l.textContent=guess;
      delete l.k;
      guessed++;
    }
  });
  if(guessed==0){
    mistake.textContent = `${mistake.textContent} ${guess} | `;
    addPenalty(mistakes);
    mistakes--;
  }
  if(getEmptySlots().length==0){
    alert('You won!');
  }else if(mistakes==0){
    alert('You lost!');
  }
}

function onReset(){
  mistakes = 6;
  mistake.innerHTML='';
  image.querySelectorAll('[id]').forEach(x=>x.style.display="none");
  word = alegeCuvant();
  drawingword(word);
}

function alegeCuvant(){
  let words = ['ceainic', 'trandafir', 'dumneavoastra','padure','haiduci','animale'];
  let ndx = createNumber(-1,words.length-1);
  return words[ndx];
}

function drawingword(word){
  let letter;
  letters.innerHTML='';
  word.split('').forEach((l,i)=>{
    letter = document.createElement('span');
    if(i==0 || i==word.length-1)
      letter.textContent = l;
    else
      letter.k = l;
    letters.appendChild(letter);
  });
}

function createNumber(minValue, maxValue){
	return Math.ceil(minValue+Math.random()*(maxValue-minValue));
}

function getEmptySlots(){
  return Array.from(letters.querySelectorAll('span')).filter(l=>l.textContent=="");
}

function addPenalty(id){
  image.getElementById(`id${6 - id+1}`).style.display="inherit";
}
