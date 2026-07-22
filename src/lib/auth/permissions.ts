export type AdminRole = "admin" | "editor";
export type Action = "read_contacts" | "edit_content" | "manage_settings" | "manage_users" | "delete_contact";
export function can(role: AdminRole, action: Action) {
  if (role === "admin") return true;
  return action === "read_contacts" || action === "edit_content";
}
