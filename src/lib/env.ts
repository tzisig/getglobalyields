/**
 * Environment variable helper
 */

export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || import.meta.env[key];

  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value || defaultValue || '';
}

export function getEnvOptional(key: string, defaultValue: string = ''): string {
  const value = process.env[key] || import.meta.env[key];
  return value || defaultValue;
}
