export const isAdmin = (email: string | undefined | null): boolean => {
  if (!email) return false;
  const admins = ["gouravkarumudi6@gmail.com", "chharicharan28@gmail.com"];
  return admins.includes(email.toLowerCase().trim());
};
