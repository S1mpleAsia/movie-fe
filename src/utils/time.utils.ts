const timeUtils = {
  convertTimestampToYear: (timestamp: string | null) => {
    if (!timestamp) return null;

    return timestamp.slice(0, 4);
  },

  formatAMPM(date: Date) {
    var myDate = new Date(date);
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;

    return strTime;
  },

  formatDateToString: (dateString: string | null) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) throw new Error("Invalid date string format");

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  },

  convertMovieRuntime: (runtime: string | null) => {
    if (!runtime) return "0";
    const totalMinutes = parseInt(runtime, 10);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let output = "";
    if (hours > 0) {
      output += `${hours}h `;
    }
    if (minutes > 0) {
      output += `${minutes}m`;
    }

    return output;
  },

  tableFormatDate: (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  },
};

export default timeUtils;
