export function generateUniqueUsername() {
    const timestamp = Date.now();
    return `user_${timestamp}`;
  }
