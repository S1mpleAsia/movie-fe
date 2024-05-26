export const getRandomColor = () => {
  while (true) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Calculate relative luminance (per WCAG guidelines)
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    const contrastRatio = luminance > 128 ? 1 / luminance : luminance / 1;

    // Minimum contrast ratio for good readability (WCAG 4.5:1)
    const minimumContrastRatio = 4.5;

    // If contrast is high enough, return the color
    if (contrastRatio >= minimumContrastRatio) {
      return `rgb(${red}, ${green}, ${blue})`;
    }
  }
};

export const getShortenName = (name: string) => {
  const chars = name.split(" ");

  if (chars.length === 0) return name[0];

  const firstChar = chars[0];
  const lastChar = chars[chars.length - 1];

  return firstChar[0] + lastChar[0];
};
