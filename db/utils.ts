import { db } from './index';
import { SQL } from 'drizzle-orm';

/**
 * Utility function to safely execute a database query
 * @param query The SQL query to execute
 * @returns Result of the query or null if error occurs
 */
export async function executeQuery<T>(query: SQL): Promise<T | null> {
  try {
    const result = await db.execute(query);
    return result as T;
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}

/**
 * Formats a phone number to a consistent format
 * @param phoneNumber The phone number to format
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phoneNumber;
}

/**
 * Validates an email address
 * @param email The email address to validate
 * @returns boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitizes user input to prevent SQL injection and other security issues
 * @param input The user input to sanitize
 * @returns Sanitized input string
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
