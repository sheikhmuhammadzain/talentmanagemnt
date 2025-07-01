import React, { useState } from 'react';
import { Bot, X, Send, RotateCcw, ExternalLink, FileText, ListChecks, Link2 } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! Welcome back, Ali Hamza 👋\nHow can I assist you today? Here are the HR services I can help with:',
      timestamp: 'Thursday 11:44am'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickActions = [
    { text: 'Post a Job', icon: <FileText className="w-5 h-5 text-purple-600" /> },
    { text: 'Shortlist Candidates', icon: <ListChecks className="w-5 h-5 text-purple-600" /> }, 
    { text: 'Hire a Candidate', icon: <Link2 className="w-5 h-5 text-purple-600" /> }
  ];

  const handleQuickAction = (action: string) => {
    setMessages(prev => [...prev, {
      type: 'user',
      content: action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, {
        type: 'user',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setInputValue('');
    }
  };

  return (
    <>
      {/* Chat Bot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-white hover:bg-gray-50 text-purple-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 border-2 border-purple-600"
      >
        <Bot className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-80 sm:w-96 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] h-[500px] sm:h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-white">Chat bot</h3>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <ExternalLink className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* General Scenario Bar */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-700">General Scenario</p>
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
                  </div>
                </div>

                {/* Quick Actions - only show after first bot message */}
                {message.type === 'bot' && index === 0 && (
                  <div className="mt-4 space-y-3">
                    {quickActions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => handleQuickAction(action.text)}
                        className="w-full flex items-center gap-4 p-3 border border-purple-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 bg-white shadow-sm"
                      >
                        {action.icon}
                        <span className="text-gray-700 text-sm font-medium">{action.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Message"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
              <button 
                onClick={handleSendMessage}
                className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200"
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