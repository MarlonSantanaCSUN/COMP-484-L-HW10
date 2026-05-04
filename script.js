$(function() {
  // Initialize display
  checkAndUpdatePetInfoInHtml();
  
  // Button click events
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.sleep-button').click(clickedSleepButton); // NEW BUTTON
  }
);

// Constructor function for pets
function Pet(name, weight, happiness, image) {
  this.name = name;
  this.weight = weight;
  this.happiness = happiness;
  this.image = image;
}

// Create multiple pets
var pets = [
  new Pet("Sunika", 50, 50, "images/hound.jpg"),
  new Pet("Helminth", 40, 60, "images/hound2.jpg"),
  new Pet("Medjay", 30, 80, "images/hound3.jpg")
];

// Track current pet
var currentPetIndex = 0;
var pet_info = pets[currentPetIndex];
  
// Treat → +happiness +weight
function clickedTreatButton() {
  pet_info.happiness += 5;
  pet_info.weight += 2;
  
  showMessage("Yum! That was tasty! 🦴");
  checkAndUpdatePetInfoInHtml();
}

// Play → +happiness -weight
function clickedPlayButton() {
  pet_info.happiness += 8;
  pet_info.weight -= 1;
  
  showMessage("That was fun! 🎾");
  checkAndUpdatePetInfoInHtml();
}
    
// Exercise → -happiness -weight
function clickedExerciseButton() {
  pet_info.happiness -= 3;
  pet_info.weight -= 2;
      
  showMessage("I'm tired... 😓");
  checkAndUpdatePetInfoInHtml();
}

// NEW BUTTON: Sleep → +happiness (no weight change)
function clickedSleepButton() {
  pet_info.happiness += 10;
      
  showMessage("Zzz... I feel great! 😴");
  checkAndUpdatePetInfoInHtml();
}

    
// Master update function
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}
    
// Prevent negative values
function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
      
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}
    
// Update UI
function updatePetInfoInHtml() {
  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);

  $('.pet-image').attr('src', pet_info.image);
}

$('.switch-button').click(switchPet);

function switchPet() {
  currentPetIndex++;

  // Loop back to first pet
  if (currentPetIndex >= pets.length) {
    currentPetIndex = 0;
  }

  pet_info = pets[currentPetIndex];

  showMessage("Now playing with " + pet_info.name + " 🐾");
  checkAndUpdatePetInfoInHtml();
}

// Visual notification (NO alert/console)
function showMessage(message) {

  // jQuery METHOD #1: .prepend()
  // Adds message to the bottom of container
  $('.message-container').prepend(`<div class="pet-message">${message}</div>`);

  var msg = $('.pet-message').first();

  // jQuery METHOD #2: .fadeTo()
  // Fades message slightly after appearing
  msg.fadeTo(2000, 0.3);
}



