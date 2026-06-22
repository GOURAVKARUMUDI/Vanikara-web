export const isAdmin = (emailOrUser: any): boolean => {
  if (!emailOrUser) return false;

  // If a user object is passed, check metadata first
  if (typeof emailOrUser === "object") {
    if (emailOrUser.user_metadata?.role === "admin") return true;
    if (emailOrUser.role === "admin") return true;
    emailOrUser = emailOrUser.email;
  }

  if (typeof emailOrUser !== "string") return false;

  const admins = ["gouravkarumudi6@gmail.com", "chharicharan28@gmail.com"];
  return admins.includes(emailOrUser.toLowerCase().trim());
};

/**
 * Server-side strict database check for Admin privileges
 */
export async function checkIsAdminServer(supabaseClient: any, userId: string): Promise<boolean> {
  if (!userId) return false;
  try {
    const { data, error } = await supabaseClient
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();
    if (error || !data) return false;
    return data.role === "admin";
  } catch {
    return false;
  }
}
