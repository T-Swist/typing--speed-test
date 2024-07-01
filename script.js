
/// Getting all the elements to manipulate
let paragraph = document.getElementById("paragraph_Co");
let start_test = document.getElementById("start_Test");
let inputField = document.getElementById("type_input");
let timeLeftSpan = document.getElementById("tlest_Span");
let errorSpan = document.getElementById("error_Span");
let wpmSpan = document.getElementById("wpm_Span");
let cpmSpan = document.getElementById("cpm_Span");

let timer;
let timeLeft = 60;
let errors = 0;
let totalCharacters = 0;

// Function to start the typing test
function startingTe() {
  start_test.addEventListener("click", () => {
    // Fetching paragraph data from text.json file
    fetch("text.json")
      .then(res => res.json())
      .then(storePara => {
        // Getting a random paragraph from the fetched data
        let text_para = storePara.text;
        let get_rannum = Math.floor(Math.random() * text_para.length);
        let para_lenth = text_para[get_rannum];

        // Displaying the selected paragraph
        paragraph.textContent = para_lenth;
        // Displaying the input flied upon click
        inputField.style.display = "block";
        // Resetting test parameters
        timeLeft = 60;
        errors = 0;
        totalCharacters = 0;
        inputField.value = "";
        inputField.disabled = false;
        timeLeftSpan.textContent = `${timeLeft}s`;
        errorSpan.textContent = errors;
        wpmSpan.textContent = 0;
        cpmSpan.textContent = 0;

        // Start the timer
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);

        // Focus the input field
        inputField.focus();
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
      });
  });

  // Event listener for input field to calculate errors and performance metrics
  inputField.addEventListener("input", () => {
    let typedText = inputField.value;
    let originalText = paragraph.textContent;

    // Update total characters typed
    totalCharacters = typedText.length;

    // Calculate errors
    errors = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] !== originalText[i]) {
        errors++;
      }
    }
    errorSpan.textContent = errors;

    if (errors !== 0) {
      
    } else {
      
    }

    // Calculate WPM and CPM
    let wordsTyped = typedText.split(" ").filter(word => word.length > 0).length;
    let minutesElapsed = (60 - timeLeft) / 60;

    // Ensure we do not divide by zero
    let wpm = (minutesElapsed > 0) ? (wordsTyped / minutesElapsed) : 0;
    let cpm = (minutesElapsed > 0) ? (totalCharacters / minutesElapsed) : 0;

    wpmSpan.textContent = Math.round(wpm);
    cpmSpan.textContent = Math.round(cpm);
  });
}

// Function to update the timer
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftSpan.textContent = `${timeLeft}s`;
  } else {
    clearInterval(timer);
    inputField.disabled = true; // Disable input field when time is up
    start_test.textContent = "Try Again!"
  }
}

// Initialize the typing test function
startingTe();




