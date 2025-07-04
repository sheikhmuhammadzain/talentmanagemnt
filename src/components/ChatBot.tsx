import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, FileText, ListChecks, Link2, ChevronDown, ChevronUp } from 'lucide-react';
import { getChatResponse } from '../services/chatbotService';

interface Message {
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
  showJobDescription?: boolean;
  jobDescription?: string;
  justification?: string | null;
}

interface ChatBotProps {
  theme?: 'light' | 'dark';
}

const ChatBot: React.FC<ChatBotProps> = ({ theme = 'light' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! Welcome back, Ali Hamza 👋\nHow can I assist you today? Here are the HR services I can help with:',
      timestamp: 'Thursday 11:44am',
      showJobDescription: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentJustification, setCurrentJustification] = useState<string | null>(null);
  const [showReasoning, setShowReasoning] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { text: 'Post a Job', icon: <FileText className="w-4 h-4 text-purple-600" /> },
    { text: 'Shortlist Candidates', icon: <ListChecks className="w-4 h-4 text-purple-600" /> }, 
    { text: 'Hire a Candidate', icon: <Link2 className="w-4 h-4 text-purple-600" /> }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickAction = async (action: string) => {
    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Fetch response from API
    await fetchBotResponse(action);
  };

  const fetchBotResponse = async (query: string) => {
    setIsLoading(true);
    
    try {
      const response = await getChatResponse(query);
      
      const botMessage: Message = {
        type: 'bot',
        content: response.chat,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showJobDescription: response.canvas_flag.canvas_window,
        jobDescription: response.chat, // Normally this would be a separate field from the API
        justification: response.canvas_flag.justification_of_job_description
      };
      
      setMessages(prev => [...prev, botMessage]);

      // Update canvas state based on response
      if (response.canvas_flag.canvas_window) {
        setShowCanvas(true);
        setCurrentJustification(response.canvas_flag.justification_of_job_description);
      }
    } catch (error) {
      console.error('Error getting chat response:', error);
      
      // Add error message
      const errorMessage: Message = {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        type: 'user',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Clear input
      setInputValue('');
      
      // Fetch response from API
      await fetchBotResponse(inputValue.trim());
    }
  };

  const handleCloseCanvas = () => {
    setShowCanvas(false);
  };

  // Format justification text to properly display markdown-like syntax
  const formatJustification = (text: string | null): React.ReactNode => {
    if (!text) return null;
    
    // Replace the heading and trim whitespace
    const formattedText = text.replace(/===== Justification =====/g, '').trim();
    
    // Regex to match numbered points with markdown bold
    const pointRegex = /(\d+)\.\s+\*\*([^*]+)\*\*:?\s+(.*?)(?=\s+\d+\.\s+\*\*|$)/gs;
    
    // Extract all matches
    const matches = [...formattedText.matchAll(pointRegex)];
    
    if (matches.length === 0) {
      // Fallback if regex doesn't match
      return <div className="whitespace-pre-wrap text-xs">{text}</div>;
    }
    
    return (
      <div className="space-y-2">
        <h4 className="font-medium text-xs text-purple-700 border-b border-purple-100 pb-1 mb-2">Justification</h4>
        {matches.map((match, index) => {
          const [, number, title, content] = match;
          return (
            <div key={index} className="mb-2">
              <div className="flex items-start gap-1">
                <span className="text-purple-600 font-medium">{number}.</span>
                <span className="font-medium text-gray-800">{title}:</span>
              </div>
              <p className="ml-4 text-gray-600 mt-0.5">{content.trim()}</p>
            </div>
          );
        })}
      </div>
    );
  };

  // Format message content to hide content between --- markers when canvas is shown
  const formatMessageContent = (content: string, showJobDescription: boolean | undefined, canvasVisible: boolean): string => {
    // If canvas is not visible or message doesn't have job description, show full content
    if (!canvasVisible || !showJobDescription) {
      return content;
    }

    // If canvas is visible and message has job description, hide content between --- markers
    const regex = /---\s*\n([\s\S]*?)\n\s*---/;
    const match = content.match(regex);
    
    if (match && match.index !== undefined) {
      // Extract text before and after the job description
      const beforeJob = content.substring(0, match.index).trim();
      const afterJob = content.substring(match.index + match[0].length).trim();
      
      // Return combined text without the job description
      if (afterJob) {
        return beforeJob + "\n\n[Job description visible in side panel]" + "\n\n" + afterJob;
      } else {
        return beforeJob + "\n\n[Job description visible in side panel]";
      }
    }
    
    return content;
  };

  return (
    <>
      {/* Job Description Canvas (Positioned relative to chat window) */}
      {showCanvas && isOpen && (
        <div className={`fixed bottom-20 right-[26rem] w-72 h-[500px] rounded-lg shadow-xl flex flex-col z-40 overflow-hidden ${
          theme === 'dark' 
            ? 'bg-dark-card border border-dark-border' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className={`p-2 border-b flex justify-between items-center ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-medium text-sm ${
              theme === 'dark' ? 'text-dark-text' : 'text-gray-800'
            }`}>Job Description</h3>
            <button
              onClick={handleCloseCanvas}
              className={`p-1 rounded transition-colors ${
                theme === 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'
              }`}
            >
              <X className={`w-4 h-4 ${
                theme === 'dark' ? 'text-dark-text' : 'text-gray-600'
              }`} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            <div className={`rounded-lg p-2 ${
              theme === 'dark' ? 'bg-dark-card' : 'bg-white'
            }`}>
              {/* Job Description Content */}
              <div 
                className={`flex items-center gap-2 mb-2 cursor-pointer p-1 rounded ${
                  theme === 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-50'
                }`}
                onClick={() => setShowReasoning(!showReasoning)}
              >
                <div className={`h-4 w-4 ${
                  theme === 'dark' ? 'bg-dark-accent/20' : 'bg-purple-100'
                } rounded-full flex items-center justify-center`}>
                  <div className={`h-2 w-2 ${
                    theme === 'dark' ? 'bg-dark-accent' : 'bg-purple-600'
                  } rounded-full`}></div>
                </div>
                <span className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Reasoning and Scanning</span>
                {showReasoning ? 
                  <ChevronUp className={`w-3 h-3 ml-auto ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} /> : 
                  <ChevronDown className={`w-3 h-3 ml-auto ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                }
              </div>
              
              {/* Display justification if available and showReasoning is true */}
              {showReasoning && (
                <>
                  {currentJustification ? (
                    <div className={`text-xs p-3 mb-3 rounded border overflow-y-auto max-h-48 ${
                      theme === 'dark' 
                        ? 'bg-dark-hover border-dark-hover text-dark-text' 
                        : 'bg-gray-50 border-gray-100 text-gray-700'
                    }`}>
                      {formatJustification(currentJustification)}
                    </div>
                  ) : (
                    <div className={`text-xs italic mb-3 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>No reasoning available</div>
                  )}
                </>
              )}

              <div className="space-y-3 mt-3">
                <div>
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                  }`}>Job Title: UI/UX Designer</h3>
                  <p className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>Location: Faisalabad, Pakistan (On-Site)</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>Employment Type: Full-Time</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>Salary: Rs. 50,000 per month</p>
                </div>

                <div>
                  <h3 className={`text-xs font-medium ${
                    theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                  }`}>Job Summary:</h3>
                  <p className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    My Company is looking for a creative and detail-oriented UI/UX Designer to join our team in Faisalabad. The ideal candidate will be responsible for designing intuitive and visually appealing user interfaces for web and mobile applications.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xs font-medium ${
                    theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                  }`}>Key Responsibilities:</h3>
                  <ul className={`list-disc pl-4 mt-1 text-xs space-y-0.5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    <li>Design wireframes, prototypes, and high-fidelity UI designs</li>
                    <li>Conduct user research, usability testing, and competitor analysis</li>
                    <li>Create and maintain design systems, style guides, and UI components</li>
                    <li>Collaborate closely with developers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button (Fixed Position) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 ${
          theme === 'dark' ? 'bg-dark-accent text-white' : 'bg-purple-600 text-white'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-20 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] ${
          theme === 'dark' 
            ? 'bg-dark-card border border-dark-border' 
            : 'bg-white border border-gray-200'
        } rounded-lg shadow-xl flex flex-col z-40`}>
          {/* Chat Header */}
          <div className={`p-3 border-b flex justify-between items-center ${
            theme === 'dark' ? 'border-dark-border' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-dark-accent/20' : 'bg-purple-100'
              }`}>
                <Bot className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-dark-accent' : 'text-purple-600'
                }`} />
              </div>
              <div>
                <h3 className={`font-medium text-sm ${
                  theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                }`}>HR Assistant</h3>
                <p className={`text-[10px] ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className={`p-1 rounded ${
                theme === 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'
              }`}
            >
              <X className={`w-4 h-4 ${
                theme === 'dark' ? 'text-dark-text' : 'text-gray-500'
              }`} />
            </button>
          </div>

          {/* Messages Container */}
          <div className={`flex-1 p-4 overflow-y-auto ${
            theme === 'dark' ? 'bg-dark-background' : 'bg-gray-50'
          }`}>
            {/* Quick Actions (shown at start) */}
            {messages.length === 1 && (
              <div className="grid grid-cols-1 gap-2 my-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.text)}
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm text-left transition-colors ${
                      theme === 'dark'
                        ? 'bg-dark-card hover:bg-dark-hover text-dark-text'
                        : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-dark-accent/20' : 'bg-purple-100'
                    }`}>
                      {action.icon}
                    </div>
                    {action.text}
                  </button>
                ))}
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.type === 'user' ? 'flex flex-row-reverse' : ''}`}
              >
                <div className={`max-w-[85%] ${
                  message.type === 'user'
                    ? theme === 'dark' ? 'bg-dark-accent text-white' : 'bg-purple-600 text-white'
                    : theme === 'dark' ? 'bg-dark-card text-dark-text' : 'bg-white text-gray-700'
                } p-3 rounded-lg ${
                  message.type === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
                } ${
                  theme === 'dark' && message.type !== 'user' ? '' : message.type !== 'user' ? 'shadow-sm' : ''
                }`}>
                  <div className="whitespace-pre-wrap text-[14px]">
                    {formatMessageContent(message.content, message.showJobDescription, showCanvas)}
                  </div>
                  <div className={`text-[10px] mt-1 text-right ${
                    message.type === 'user'
                      ? 'text-purple-100'
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                  }`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start mb-4">
                <div className={`p-3 rounded-lg rounded-tl-none max-w-[85%] ${
                  theme === 'dark' ? 'bg-dark-card text-dark-text' : 'bg-white text-gray-700 shadow-sm'
                }`}>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-dark-accent' : 'bg-purple-600'
                    } animate-bounce`}></div>
                    <div className={`w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-dark-accent' : 'bg-purple-600'
                    } animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                    <div className={`w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-dark-accent' : 'bg-purple-600'
                    } animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* This element helps us scroll to the bottom of the messages */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Change to textarea */}
          <div className={`p-3 border-t ${
            theme === 'dark' ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'
          }`}>
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevent default to avoid new line
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                rows={1}
                className={`w-full pl-4 pr-12 py-2 rounded-xl resize-none text-sm ${
                  theme === 'dark' 
                    ? "bg-dark-hover text-dark-text border-none focus:outline-none placeholder-gray-500"
                    : "border border-gray-200 focus:outline-none focus:border-purple-500"
                }`}
                style={{ 
                  minHeight: '44px',
                  maxHeight: '100px',
                  overflowY: 'auto'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isLoading}
                className={`absolute right-2 bottom-3 w-8 h-8 rounded-full flex items-center justify-center ${
                  inputValue.trim() === '' || isLoading
                    ? theme === 'dark' ? 'bg-dark-hover text-gray-500' : 'bg-gray-100 text-gray-400'
                    : theme === 'dark' ? 'bg-dark-accent text-white' : 'bg-purple-600 text-white'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;