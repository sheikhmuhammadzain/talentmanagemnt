// API URL would typically be stored in .env file
// For now using the direct URL as requested
const API_URL = 'http://103.18.20.205:8080/V1_Job_Description';

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
 * @param id - The ID parameter (default: 2)
 * @returns The chat response data
 */
export const getChatResponse = async (query: string, id: number = 6): Promise<ChatResponse> => {
  try {
    // Build URL with query parameters
    const url = new URL(API_URL);
    url.searchParams.append('query', query);
    url.searchParams.append('id', id.toString());
    
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