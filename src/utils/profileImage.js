export const DEFAULT_PROFILE_IMAGE_SRC = '/assets/profile/base.jpg';

export function getProfileImageSrc(user) {
  const candidate = user?.profileImage || user?.avatar || user?.photoUrl || user?.imageUrl;
  return candidate || DEFAULT_PROFILE_IMAGE_SRC;
}
