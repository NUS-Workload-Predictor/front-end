export const PROFILE_UPDATE = "PROFILE_UPDATE";

export function updateProfile(profile) {
  return {
    type: PROFILE_UPDATE,
    payload: profile
  };
}
