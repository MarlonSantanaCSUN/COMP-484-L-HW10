console.log(
  "%cGiga Pet App Loaded!",
  "color: green; font-size: 16px; font-weight: bold;"
); // Initial load message with styling for better visibility

$(function() {
  // Initialize display
  checkAndUpdatePetInfoInHtml();
  
  // Button click events
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.sleep-button').click(clickedSleepButton);
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

console.table(pets); // Log pet data in a table format for easy debugging

// Track current pet
var currentPetIndex = 0;
var pet_info = pets[currentPetIndex];
  
// Treat → +happiness +weight
function clickedTreatButton() {
  console.group("Treat Button Clicked"); // Group logs for better organization

  console.log("Before:", pet_info); // Log pet info before changes for debugging

  pet_info.happiness += 5;
  pet_info.weight += 2;

 // Violaion Error test: Simulate a long-running operation that blocks the UI
  let start = Date.now();
  while (Date.now() - start < 3000) {
    // Busy wait for 3 seconds (blocks UI)
  }
  console.log("After:", pet_info); // Log pet info after changes to verify updates

  console.groupEnd(); // End log group

  showMessage("Yum! That was tasty! 🦴");
  checkAndUpdatePetInfoInHtml();
}

// Play → +happiness -weight
function clickedPlayButton() {
  console.group("Play Button Clicked");

  console.log("Before:", pet_info);

  pet_info.happiness += 8;
  pet_info.weight -= 1;
  
  console.log("After:", pet_info);

  console.groupEnd();

  showMessage("That was fun! 🎾");
  checkAndUpdatePetInfoInHtml();
}
    
// Exercise → -happiness -weight
function clickedExerciseButton() {
  console.group("Exercise Button Clicked");

  console.log("Before:", pet_info);

  pet_info.happiness -= 3;
  pet_info.weight -= 2;

  console.log("After:", pet_info);

  console.groupEnd();
      
  showMessage("I'm tired... 😓");
  checkAndUpdatePetInfoInHtml();
}

// NEW BUTTON: Sleep → +happiness (no weight change)
function clickedSleepButton() {
  console.group("Sleep Button Clicked");

  console.log("Before:", pet_info);
  pet_info.happiness += 10;

  console.log("After:", pet_info);

  console.groupEnd();
      
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
    console.error("Weight dropped below 0. Resetting to 0."); // Log error when weight goes negative
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    console.error("Happiness dropped below 0. Resetting to 0.");
    pet_info.happiness = 0;
  }
}

// Update UI
function updatePetInfoInHtml() {
  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);
  $('.pet-image').attr('src', pet_info.image);

  console.info("Pet updated:", pet_info); // Log updated pet info for debugging
}

$('.switch-button').click(switchPet);

function switchPet() {
  currentPetIndex++;

  if (currentPetIndex >= pets.length) {
    console.warn("Reached end of pet list. Resetting index."); // Log warning when index resets
    currentPetIndex = 0;
  }

  pet_info = pets[currentPetIndex];

  showMessage("Now playing with " + pet_info.name + " 🐾");
  checkAndUpdatePetInfoInHtml();

  //if (!pet_info.nonexistentProperty) { //TypeError test
  //console.log(pet_info.nonexistentProperty.toUpperCase());
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



