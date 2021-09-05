// Get photo src from the photo object
export function getPhotoSrc(photo) {
  // First url in the photo.media object
  return photo.media[Object.keys(photo.media)[0]];
}

// Get photo id from the photo object
export function getPhotoId(photo) {
  const src = getPhotoSrc(photo);
  const srcParts = src.split('/');
  // `${server}_${filename}`
  return `${srcParts[srcParts.length - 2]}_${srcParts[srcParts.length - 1]}`;
}
