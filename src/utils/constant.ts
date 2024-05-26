export const baseEndpoint = "http://127.0.0.1:9000/movie-system/";

export const storageImage = {
  originalPath: baseEndpoint + "uploadFiles/original/",
  w500Path: baseEndpoint + "uploadFiles/w500/",
  w500ActorPath: baseEndpoint + "uploadFiles/w500Profile/",
  external: baseEndpoint + "uploadFiles/external/",
};

export const getImage = (path: string, url: string) => path + url;

export const videoPath = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?controls=1`;
