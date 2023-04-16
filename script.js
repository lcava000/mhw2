
/********* COSTANTI  ***********/
const check = "images/checked.png"
const uncheck = "images/unchecked.png"
const select = {one: null, two: null, three: null};
const checkbox_vector = document.querySelectorAll(".choice-grid div");

function check_box(event){
  const element = event.currentTarget;

  let indice = element.dataset.questionId; //idx del dataset

  for (const firstCheckbox of checkbox_vector){
    //Seleziono img del checkbox
    const image = firstCheckbox.querySelector(".checkbox");

    if(firstCheckbox.dataset.questionId===indice){
      if(firstCheckbox.dataset.choiceId===element.dataset.choiceId){
        firstCheckbox.classList.remove("unchecked");
        firstCheckbox.classList.add("checked");
        image.src = check;
        select[indice] = element.dataset.choiceId;
      }
      else{
        firstCheckbox.classList.remove("checked");
        firstCheckbox.classList.add("unchecked");
        image.src=uncheck;
      }
    }
  }

  let flag = 0;
  // Itero sull'idx dei checkbox
  for(let indice in select){
    if(select[indice] === null){
      flag=1;
    }
  }
  if(flag === 0){
    getResult();
  }
}

function getResult(){

  // REMOVE EventListener -> Prevenire doppio click del checkbox
  for(const thirdCheckbox of checkbox_vector){
    thirdCheckbox.removeEventListener("click", check_box);
  }

  // DEFINITION Elementi 
  const div = document.createElement("div");
  const titolo_h1 = document.createElement("h1");
  const testo = document.createElement("p");
  const bottone = document.createElement("button");
  const reset = document.createElement("div");
  
  div.classList.add("result");
  bottone.classList.add("reset_button");
  reset.textContent= "Clicca per rifare il test!";

  if (select.first === select.two){
    titolo_h1.textContent = RESULTS_MAP[select.two].title;
    testo.textContent = RESULTS_MAP[select.two].contents;
  }
  else{
    titolo_h1.textContent = RESULTS_MAP[select.three].title;
    testo.textContent = RESULTS_MAP[select.three].contents; 
  }

  // ADD Element Result
  bottone.appendChild(reset);
  div.appendChild(titolo_h1);
  div.appendChild(testo);
  div.appendChild(bottone);
  document.querySelector("article").appendChild(div);

  // ADD Reset Button
  bottone.addEventListener("click", resetQuiz);
}

function resetQuiz(){
  //Ricarico la pagina.
  //Potrei volendo anche rendere gli elementi hidden, svuotare la mappa, e reimpostare i checkbox.
  //Dunque la scelta di resettare gli elementi con un refresh della pagina è la soluzione più veloce.
  location.reload();
}

/********* EVENT LISTENER  ***********/
// Appena clicco su thirdCheckbox (che è l'ultimo checkbox del quiz) esegui la funzione check_box
for(const thirdCheckbox of checkbox_vector){
  thirdCheckbox.addEventListener("click", check_box); 
}