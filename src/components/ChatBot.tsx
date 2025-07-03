import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, RotateCcw, ExternalLink, FileText, ListChecks, Link2, ChevronDown, ChevronUp } from 'lucide-react';
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
    { text: 'Post a Job', icon: <FileText className="w-5 h-5 text-purple-600" /> },
    { text: 'Shortlist Candidates', icon: <ListChecks className="w-5 h-5 text-purple-600" /> }, 
    { text: 'Hire a Candidate', icon: <Link2 className="w-5 h-5 text-purple-600" /> }
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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 bg-white hover:bg-gray-50 text-purple-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 border-2 border-purple-600"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-72 sm:w-80 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] h-[400px] sm:h-[450px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-3 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Bot className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="font-semibold text-white text-sm">Chat bot</h3>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* General Scenario Bar */}
          <div className="p-2 bg-white border-b border-gray-200">
            <div className="p-2 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-700">General Scenario</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-6">
                {message.type === 'bot' ? (
                  <div className="flex items-start gap-3">
                    <div className="text-xs text-gray-500 font-medium mt-1">
                      Chat Bot
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {message.timestamp}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end mb-2">
                    <div className="text-xs text-gray-500 font-medium">
                      You
                    </div>
                  </div>
                )}
                
                <div className={`${message.type === 'bot' ? 'text-left' : 'flex justify-end'}`}>
                  <div className={`
                    ${message.type === 'bot' 
                      ? 'bg-white text-gray-800 max-w-[85%]' 
                      : 'bg-purple-600 text-white max-w-[70%]'
                    } 
                    rounded-2xl px-4 py-3 shadow-sm
                  `}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                    
                    {message.showJobDescription && !showCanvas && (
                      <div 
                        className="mt-3 pt-3 border-t border-gray-200 text-blue-600 text-sm cursor-pointer"
                        onClick={() => {
                          setShowCanvas(true);
                          setCurrentJustification(message.justification || null);
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>View job description</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions - only show after first bot message */}
                {message.type === 'bot' && index === 0 && (
                  <div className="mt-4 space-y-3">
                    {quickActions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => handleQuickAction(action.text)}
                        className="w-full flex items-center gap-2 p-2 border border-purple-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 bg-white shadow-sm"
                      >
                        {action.icon}
                        <span className="text-gray-700 text-xs font-medium">{action.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center items-center py-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-1 animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Message"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 resize-none max-h-20 min-h-[3em]"
                rows={3}
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                className={`p-2 self-end ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-full transition-colors duration-200`}
                disabled={isLoading}
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;