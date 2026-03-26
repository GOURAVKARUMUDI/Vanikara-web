import { isAdmin } from './isAdmin';

export const getRedirectUrl = (user) => {
  if (user && isAdmin(user.email)) {
    return '/admin';
  }
  return '/';
};
