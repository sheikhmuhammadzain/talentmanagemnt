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

const ChatBot: React.FC = () => {
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
        <div className="fixed bottom-20 right-[20rem] sm:bottom-24 sm:right-[22rem] w-64 sm:w-72 max-w-[calc(100vw-2rem)] h-[400px] sm:h-[450px] max-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-40 overflow-hidden">
          <div className="bg-white p-2 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-sm text-gray-800">Job Description</h3>
            <button
              onClick={handleCloseCanvas}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            <div className="bg-white rounded-lg p-2">
              {/* Job Description Content */}
              <div 
                className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                onClick={() => setShowReasoning(!showReasoning)}
              >
                <div className="h-4 w-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500">Reasoning and Scanning</span>
                {showReasoning ? 
                  <ChevronUp className="w-3 h-3 text-gray-500 ml-auto" /> : 
                  <ChevronDown className="w-3 h-3 text-gray-500 ml-auto" />
                }
              </div>
              
              {/* Display justification if available and showReasoning is true */}
              {showReasoning && (
                <>
                  {currentJustification ? (
                    <div className="text-xs text-gray-700 bg-gray-50 p-3 mb-3 rounded border border-gray-100 overflow-y-auto max-h-48">
                      {formatJustification(currentJustification)}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 italic mb-3">No reasoning available</div>
                  )}
                </>
              )}

              <div className="space-y-3 mt-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Job Title: UI/UX Designer</h3>
                  <p className="text-xs text-gray-700 mt-1">Location: Faisalabad, Pakistan (On-Site)</p>
                  <p className="text-xs text-gray-700">Employment Type: Full-Time</p>
                  <p className="text-xs text-gray-700">Salary: Rs. 50,000 per month</p>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-900">Job Summary:</h3>
                  <p className="text-xs text-gray-700 mt-1">
                    My Company is looking for a creative and detail-oriented UI/UX Designer to join our team in Faisalabad. The ideal candidate will be responsible for designing intuitive and visually appealing user interfaces for web and mobile applications.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-900">Key Responsibilities:</h3>
                  <ul className="list-disc pl-4 mt-1 text-xs text-gray-700 space-y-0.5">
                    <li>Design wireframes, prototypes, and high-fidelity UI designs</li>
                    <li>Conduct user research, usability testing, and competitor analysis</li>
                    <li>Create and maintain design systems, style guides, and UI components</li>
                    <li>Collaborate closely with developers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-900">Required Skills:</h3>
                  <ul className="list-disc pl-4 mt-1 text-xs text-gray-700 space-y-0.5">
                    <li>2+ years of experience in UI/UX design</li>
                    <li>Proficiency in Figma & Adobe XD</li>
                    <li>Strong understanding of user-centered design principles</li>
                  </ul>
                </div>

                <p className="text-xs text-gray-500 italic">Application Deadline: July 30, 2023</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Bot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-11 h-11 bg-purple-600 text-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 z-50"
      >
        <Bot className="w-5 h-5" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-72 sm:w-80 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] h-[400px] sm:h-[450px] max-h-[calc(100vh-8rem)] bg-white rounded-md shadow-lg border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <h3 className="font-medium text-white text-sm">HR Assistant</h3>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 bg-gray-50 p-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-3">
                {message.type === 'bot' ? (
                  <div className="flex items-start gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 shrink-0">
                      <Bot className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <div className="text-xs text-gray-500">
                      HR Assistant
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end mb-1">
                    <div className="text-xs text-gray-500">
                      You
                    </div>
                  </div>
                )}
                
                <div className={`${message.type === 'bot' ? 'pl-8' : 'flex justify-end'}`}>
                  <div className={`
                    ${message.type === 'bot' 
                      ? 'bg-white text-gray-800 max-w-[90%] border border-gray-100' 
                      : 'bg-purple-600 text-white max-w-[85%]'
                    } 
                    rounded-md px-3 py-2 shadow-sm
                  `}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {formatMessageContent(message.content, message.showJobDescription, showCanvas)}
                    </p>
                    
                    {message.showJobDescription && !showCanvas && (
                      <div 
                        className={`mt-2 pt-2 border-t ${message.type === 'bot' ? 'border-gray-100 text-purple-600' : 'border-purple-500/30 text-white'} text-xs font-medium cursor-pointer`}
                        onClick={() => {
                          setShowCanvas(true);
                          setCurrentJustification(message.justification || null);
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span>View job description</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions - only show after first bot message */}
                {message.type === 'bot' && index === 0 && (
                  <div className="mt-3 pl-8 grid grid-cols-1 gap-2">
                    {quickActions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => handleQuickAction(action.text)}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md hover:bg-white transition-all bg-gray-50"
                      >
                        <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center">
                        {action.icon}
                        </div>
                        <span className="text-gray-700 text-xs">{action.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex pl-8 items-center py-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-1 animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-end">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-purple-400 bg-white resize-none min-h-[4.5em] max-h-[6.5em] overflow-y-auto"
                rows={3}
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                className={`p-2 ml-2 ${isLoading ? 'bg-purple-400' : 'bg-purple-600'} text-white rounded-md`}
                disabled={isLoading}
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