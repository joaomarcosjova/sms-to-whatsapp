import { countryCodes } from './countries.js';

const button = document.querySelector('#button');
const input = document.querySelector('input');
const errorText = document.querySelector('#error');
const countryInfo = document.createElement('p'); // For country name and flag
const validationInfo = document.createElement('p'); // For validation status

// Append the paragraphs to the DOM
input.parentNode.insertBefore(countryInfo, errorText.nextSibling);
input.parentNode.insertBefore(validationInfo, countryInfo.nextSibling);

// Function to reset form state
function resetForm() {
  errorText.innerHTML = '';
  countryInfo.innerHTML = '';
  validationInfo.innerHTML = '';
  input.style.border = 'none';
  button.value = 'Start a Conversation'; // Default button text
}

button.addEventListener('click', function (e) {
  e.preventDefault();
  
  // Reset error and country info
  resetForm();

  if (input.value.trim() === '') {
    errorText.innerHTML = 'Type a phone number!';
    input.style.border = '2px solid #ed5463';
    return;
  }

  const phoneNumber = input.value.trim();
  const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
  
  // Extract country code
  const countryCode = Object.keys(countryCodes).find(code => formattedPhoneNumber.startsWith(code));
  
  if (countryCode) {
    // Display country name and flag
    const country = countryCodes[countryCode];
    countryInfo.innerHTML = `This number is from: ${country.name} ${country.flag}`;

    // Create the WhatsApp URL
    const whatsappURL = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}`;
    
    // Open WhatsApp chat
    button.value = 'Start a Conversation'; // Change button text to valid
    button.onclick = () => window.open(whatsappURL, '_blank').focus(); // Open chat on click

    validationInfo.innerHTML = 'Ready to start a conversation!';
  } else {
    errorText.innerHTML = 'Invalid phone number!';
    input.style.border = '2px solid #ed5463';
    button.value = 'Revalidate'; // Change button text to revalidate
    button.onclick = () => location.reload(); // Reload page to reset state
  }
});
