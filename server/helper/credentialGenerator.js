async function generateUsername(firstname, lastname, id) {
  return `nla${firstname.toLowerCase()}${lastname.toLowerCase()}${id}`;
}

async function generatePassword(dob) {
  return dob.split("-").join("");
}

module.exports = { generateUsername, generatePassword };
