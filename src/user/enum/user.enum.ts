export enum userRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum userAccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',

  // TEMPRORY BLOCK BY ADMIN
  SUSPENDED = 'suspended',
  
  // BANNED BY ADMIN
  BANNED = 'banned',
}
