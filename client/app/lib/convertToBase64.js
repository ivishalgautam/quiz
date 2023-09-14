export function imageToBase64(file, callback) {
  const reader = new FileReader();

  // Set up a callback for when the file is loaded
  reader.onload = function (e) {
    // Get the base64-encoded string from the result
    const base64String = e.target.result.split(",")[1];

    // Call the callback function with the base64 string as an argument
    callback(base64String);
  };

  // Read the file as a data URL
  reader.readAsDataURL(file);
}
