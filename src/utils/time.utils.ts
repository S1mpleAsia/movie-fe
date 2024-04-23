const timeUtils = {
  convertTimestampToYear: (timestamp: string | null) => {
    if (!timestamp) return null;

    return timestamp.slice(0, 4);
  },
};

export default timeUtils;
