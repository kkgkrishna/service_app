const commonPermissions = {
  viewDashboard: true,
  submitFeedback: true,
};

const baseEngineerPermissions = {
  ...commonPermissions,
  viewAssignedInquiries: true,
  updateInquiryStatus: true,
};

const baseAdminPermissions = {
  ...commonPermissions,
  manageUsers: true,
  assignEngineers: true,
  viewAllInquiries: true,
  viewAssignedInquiries: true,
  updateInquiryStatus: true,
  cancelInquiry: true,
  manageCategories: true,
  viewReports: true,
  manageEngineers: true,
  createInquiry: true,
  editInquiryPrice: true,
};

export const IMPLICIT_PERMISSIONS = {
  SUPER_ADMIN: {
    ...baseAdminPermissions,
    deleteInquiries: true,
    configureSystemSettings: true,
  },
  ADMIN: {
    ...baseAdminPermissions,
    deleteInquiries: false,
    configureSystemSettings: false,
  },
  ENGINEER: {
    ...baseEngineerPermissions,
    manageUsers: false,
    assignEngineers: false,
    manageCategories: false,
    viewReports: false,
    manageEngineers: false,
    deleteInquiries: false,
    editInquiryPrice: false,
    configureSystemSettings: false,
    createInquiry: false,
    cancelInquiry: false,
  },
  USER: {
    ...commonPermissions,
    cancelInquiry: true,
    createInquiry: true,
    manageUsers: false,
    assignEngineers: false,
    viewAllInquiries: false,
    viewAssignedInquiries: false,
    updateInquiryStatus: false,
    manageCategories: false,
    viewReports: false,
    manageEngineers: false,
    deleteInquiries: false,
    editInquiryPrice: false,
    configureSystemSettings: false,
  },
  SERVICE_PROVIDER: {
    ...baseEngineerPermissions,
    assignEngineers: true,
    manageEngineers: true,
    manageUsers: false,
    viewAllInquiries: false,
    manageCategories: false,
    viewReports: false,
    deleteInquiries: false,
    editInquiryPrice: false,
    configureSystemSettings: false,
    createInquiry: false,
    cancelInquiry: false,
  },
};
