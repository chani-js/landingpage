function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const form = document.querySelector("form");
const success = document.querySelector(".success");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close-event");

// constante message erreur
const minchar = "Veuillez entrer 2 caractères ou plus pour le champ du nom";
const option  = "Vous devez choisir une option.";
const termes  = "Vous devez vérifier que vous acceptez les termes et conditions.";
const birth   = "Vous devez entrer votre date de naissance.";


// add event listeners
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// open modal
function launchModal() {
	success.style.display = "none";
  form.style.display = "block";
  modalbg.style.display = "block";
  form.reset(); 

  const formDatas = document.querySelectorAll(".formData");
  formDatas.forEach((formData) => {
  	clearError(formData)
  })

}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}


// validate
function validate() {
	let validate = true
  const formDatas = document.querySelectorAll(".formData");
  
  formDatas.forEach((formData) => {
  	clearError(formData)
    const field = formData.querySelector("input")
    const fieldName = field.getAttribute("name")
    
    let fieldValue = document.forms["reserve"][fieldName].value
    if(field.getAttribute("type") == 'checkbox') {
    	fieldValue = field.checked
    }
    
    switch (fieldName) {
      case 'first':
        if(!checkMinLength(fieldValue)) {
        	setError(formData, minchar)
          validate = false
        } 
        break;
      case 'last':
        if(!checkMinLength(fieldValue)) {
        	setError(formData, minchar)
          validate = false
        } 
        break;
      case 'email':
      	if(!checkEmail(fieldValue)) {
        	setError(formData, 'must be an adress mail')
          validate = false
        } 
        break;
      case 'birthdate':
        if(!fieldValue){
        setError(formData, birth)
        validate = false
      }
        break;
      case 'quantity':
      	if(!checkQuantity(fieldValue)) {
        	setError(formData, 'must be between 0 and 100')
          validate = false
        } 
        break;
      case 'location':
      	if(!fieldValue) {
        	setError(formData, option)
          validate = false
        } 
        break;
      case 'conditions':
      	if(!fieldValue) {
        	setError(formData, termes)
          validate = false
        } 
        break;
      case 'events':
        break;
      default:
    		console.log(`no ${fieldName} found.`);
		}

  });
  
  if(validate) {
  	success.style.display = "block";
  	form.style.display = "none";
  }
  
  return validate
}


function checkMinLength(str){
  if(str && str.length >= 2)
    return true
  return false
}

function checkEmail(email){
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email && re.test(String(email).toLowerCase());
}

function checkQuantity(quantity){
  if(quantity && Math.sign(quantity) >= 0 && quantity < 100)
  	return true
	return false
}

function setError(formData, error) {
	formData.setAttribute('data-error-visible', 'true')
  formData.setAttribute('data-error', error)
}

function clearError(formData) {
	formData.removeAttribute('data-error-visible');
  formData.removeAttribute('data-error');
}

