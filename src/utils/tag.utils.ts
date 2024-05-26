const tagUtils = {
  getTagFromName: (fullName: string) => {
    const username = fullName.replace(/\s/g, "").toLowerCase();

    return `@${username}`;
  },
};

export default tagUtils;
