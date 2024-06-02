const languageMap: { [key: string]: string } = {
  en: "English",
  vi: "Vietnamese",
  es: "Spanish",
  fr: "French",
  de: "German",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  ru: "Russian",
  // Add more language codes and names as needed
};

const languageUtils = {
  convertCodeToName: (code: string) => {
    return languageMap[code] || "Unknown";
  },
};

export default languageUtils;
