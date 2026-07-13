const validateSignupData = (data = {}) => {
  const errors = [];
  const { name, email, password } = data;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return { isValid: errors.length === 0, errors };
};

const validateTaskData = (data = {}) => {
  const errors = [];
  const { title, priority } = data;

  if (!title || typeof title !== 'string' || title.trim().length < 1) {
    errors.push('Title is required');
  }

  if (!priority || typeof priority !== 'string' || priority.trim().length < 1) {
    errors.push('Priority is required');
  }

  return { isValid: errors.length === 0, errors };
};

module.exports = { validateSignupData, validateTaskData };
