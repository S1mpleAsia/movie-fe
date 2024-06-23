const nameUtils = {
  getFirstName: (fullName: string) => {
    const nameParts = fullName.trim().split(/\s+/);

    // Check if there are any parts
    if (nameParts.length === 0) {
      return ""; // Return empty string if no parts
    }

    // Return the first part as the first name
    return nameParts[0];
  },

  getLastName: (fullName: string) => {
    // Split the string by whitespace
    const nameParts = fullName.trim().split(/\s+/);

    // Check if there are any parts
    if (nameParts.length === 0) {
      return ""; // Return empty string if no parts
    }

    nameParts.shift();
    // Return the last part as the last name
    return nameParts.join(" ");
  },
};

export default nameUtils;
