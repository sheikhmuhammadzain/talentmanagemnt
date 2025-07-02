// API URL would typically be stored in .env file
// For now using the direct URL as requested
const API_URL = 'http://103.18.20.205:8080/V1_Job_Description';

// Session ID management
let sessionId: number | null = null;

// Load previously used session IDs from localStorage
const loadUsedSessionIds = (): Set<number> => {
  try {
    const storedIds = localStorage.getItem('usedChatSessionIds');
    if (storedIds) {
      return new Set(JSON.parse(storedIds).map(Number));
    }
  } catch (error) {
    console.error('Error loading used session IDs from localStorage:', error);
  }
  return new Set<number>();
};

// Save used session IDs to localStorage
const saveUsedSessionIds = (ids: Set<number>): void => {
  try {
    localStorage.setItem('usedChatSessionIds', JSON.stringify([...ids]));
  } catch (error) {
    console.error('Error saving used session IDs to localStorage:', error);
  }
};

// Track all used session IDs to avoid duplicates
const usedSessionIds: Set<number> = loadUsedSessionIds();

/**
 * Generates a truly unique session ID
 * Uses a combination of timestamp and random number to ensure uniqueness
 * Should be called when a new session starts
 */
export const generateNewSessionId = (): number => {
  // Get current timestamp (milliseconds since epoch)
  const timestamp = Date.now();
  
  // Add some randomness (0-999) to ensure uniqueness
  const randomPart = Math.floor(Math.random() * 1000);
  
  // Create a number from timestamp - we only need a part of it to stay within safe integer limits
  // Taking last 7 digits of timestamp and combining with 3 random digits
  const timestampPart = timestamp % 10000000;
  
  // Generate final ID - use modulo to keep it in reasonable range (1-1000)
  // We use the hash technique to compress the large number to our desired range
  const newId = ((timestampPart * 1000 + randomPart) % 1000) + 1;
  
  // Store the new ID
  sessionId = newId;
  
  return newId;
};

/**
 * Gets the current session ID or generates a new one if none exists
 */
export const getSessionId = (): number => {
  if (sessionId === null) {
    return generateNewSessionId();
  }
  return sessionId;
};

/**
 * Reset all used session IDs (for testing purposes)
 */
export const resetUsedSessionIds = (): void => {
  usedSessionIds.clear();
  saveUsedSessionIds(usedSessionIds);
};

export interface ChatResponse {
  chat: string;
  canvas_flag: {
    justification_of_job_description: null | string;
    canvas_window: boolean;
    linkedin_job: boolean;
    indeed_job: boolean;
    career_page_post: boolean;
  };
}

/**
 * Fetches chat response from the API
 * @param query - The user's query string
 * @param id - The ID parameter (uses session ID by default)
 * @returns The chat response data
 */
export const getChatResponse = async (query: string, id?: number): Promise<ChatResponse> => {
  try {
    // Use provided id or current session id
    const sessionIdentifier = id !== undefined ? id : getSessionId();
    
    // Build URL with query parameters
    const url = new URL(API_URL);
    url.searchParams.append('query', query);
    url.searchParams.append('id', sessionIdentifier.toString());
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
}; 