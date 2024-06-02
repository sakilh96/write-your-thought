// utils/permissions.js

export const PERMISSIONS = {
    Writer: ['show','add'], // Writers can only view content
    Admin: ['add', 'edit', 'delete', 'show'], // Admins can perform all actions
    'Sub-Admin': ['add', 'edit', 'show'], // Sub-Admins can add, edit, and view content
  };
  
  export const checkPermission = (userRole, action) => {
    const permissions = PERMISSIONS[userRole];
    return permissions && permissions.includes(action);
  };
  