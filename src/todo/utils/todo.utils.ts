// todo.constants.ts

export const TODO_CONSTRAINTS = {
  TITLE: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 50,
  },

  DESCRIPTION: {
    MAX_LENGTH: 150,
  },
} as const;