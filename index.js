let themeButton= document.getElementById("theme-button");







const toggleDarkMode = () => {

    // Write your code to manipulate the DOM here
    document.body.classList.toggle("dark-mode");

}
themeButton.addEventListener("click", toggleDarkMode);


let signNowButton= document.getElementById("sign-now-button");

let count=3;

const addSignature = (person) => {
    // Write your code to manipulate the DOM here
//  const name= document.getElementById("nameInput").value;
//  const hometown= document.getElementById("hometownInput").value;
  const { name, hometown } = person;
  
  const signatureElement= document.createElement("p");
  signatureElement.textContent= "️🖊️ " + name + " from " + hometown + "  supports this.";

  const signatureSection= document.querySelector(".signatures");
  signatureSection.appendChild(signatureElement);
  
  const existingCounter = document.getElementById("counter");
  if(existingCounter){
    existingCounter.remove();
  }

  count= count + 1;

  const counterElement= document.createElement("p");
  counterElement.id = "counter";
  counterElement.textContent= "🖊️" + count + " people have signed this petition and support this cause.";

  signatureSection.appendChild(counterElement);

   toggleModal(person);
}

const validateForm = () => {

  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;
  // TODO: Loop through all inputs
  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value,
  };
  
  for(let i= 0; i < petitionInputs.length; i++){
    if(person[Object.keys(person)[i]].length < 2){
      petitionInputs[i].classList.add('error');
       containsErrors = true;
    }
    else{
      petitionInputs[i].classList.remove('error');
    }
  }if (!person.email.includes(".") || !person.email.includes("@")){
    petitionInputs[2].classList.add('error');
    containsErrors = true;
  
  }
    
  

  // TODO: Validate the value of each input
  if(!containsErrors){
    addSignature(person);
    for (let i=0; i < petitionInputs.length; i++){
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }


  // TODO: Call addSignature() and clear fields if no errors\

  //const email = document.getElementById("emailInput");
  //if (!email.value.includes('.com')) {
    //email.classList.add('error');
    //containsErrors = true;

  //}
  //else{
   // email.classList.remove('error');
  //}
}

signNowButton.addEventListener('click', validateForm);

//------------------animation--------------------///

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
}

let revealableContainers= document.querySelectorAll(".revealable");
const reveal= () => {
  for(let i=0; i< revealableContainers.length; i++ ){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      /* add the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.add("active");
    } else {
      /* remove the active class to the revealableContainer's classlist */
       revealableContainers[i].classList.remove("active");
    }
  }
}
revealableContainers.forEach(container => {
  window.addEventListener('scroll', reveal);
});

let scaleFactor = 1;
const modalImage = document.getElementById("modal-image");

const scaleImage = () => {

  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  
    modalImage.style.transform = `scale(${scaleFactor})`;
};

const toggleModal = (person) => {
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("modal-text-container");

   
    modal.style.display = "flex";

    
    modalContent.textContent = "Thank you so much " + person.name + "!";

    const intervalId = setInterval(scaleImage, 500);

   
    setTimeout(() => {
        clearInterval(intervalId); 
        modal.style.display = "none";
    }, 4000);
};
