// constants/roles.ts
export type Role =
  | "ADMIN"
  | "ENGINEER"
  | "USER"
  | "SUPER_ADMIN"
  | "SERVICE_PROVIDER";

export const ROLES: Role[] = [
  "ADMIN",
  "ENGINEER",
  "USER",
  "SUPER_ADMIN",
  "SERVICE_PROVIDER",
];

export const PERMISSIONS = [
  "VIEW_DASHBOARD",
  "MANAGE_USERS",
  "CREATE_INQUIRY",
  "VIEW_REPORTS",
  "EDIT_PROFILE",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    "VIEW_DASHBOARD",
    "MANAGE_USERS",
    "CREATE_INQUIRY",
    "VIEW_REPORTS",
    "EDIT_PROFILE",
  ],
  SUPER_ADMIN: [
    "VIEW_DASHBOARD",
    "MANAGE_USERS",
    "CREATE_INQUIRY",
    "VIEW_REPORTS",
    "EDIT_PROFILE",
  ],
  ENGINEER: ["VIEW_DASHBOARD", "CREATE_INQUIRY", "EDIT_PROFILE"],
  SERVICE_PROVIDER: ["VIEW_DASHBOARD", "EDIT_PROFILE"],
  USER: ["VIEW_DASHBOARD"],
};
