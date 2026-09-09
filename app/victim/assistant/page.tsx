// AI Assistant Page
// Modern chat interface with voice input support
// Redesigned for better UX and accessibility

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';

// Message type definition
interface Message {
  id: string;
  sender: 'ai' | 'user';
  content: string;
  timestamp: Date;
  isVoice?: boolean;  // Track if message was sent via voice
}

export default function AIAssistantPage() {
  // State management
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Hello! 👋 I\'m here to listen and support you. Everything you share is confidential. How have you been feeling lately?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);  // Voice recording state
  const [isListening, setIsListening] = useState(false);  // Listening animation
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Voice recognition setup (Web Speech API)
  // TypeScript: Use generic type since SpeechRecognition isn't in standard TypeScript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognition, setRecognition] = useState<any>(null);
  
  // Initialize speech recognition on component mount
  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined') {
      // TypeScript: Cast window to access browser-specific APIs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const WindowWithSpeech = window as any;
      
      const SpeechRecognition = WindowWithSpeech.SpeechRecognition || WindowWithSpeech.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        // Create new recognition instance
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;  // Stop after one sentence
        recognitionInstance.interimResults = false;  // Only final results
        recognitionInstance.lang = 'en-US';  // Language (can be changed to regional)
        
        // When speech is recognized
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);  // Fill input with recognized text
          setIsListening(false);
          setIsRecording(false);
        };
        
        // When recognition ends
        recognitionInstance.onend = () => {
          setIsListening(false);
          setIsRecording(false);
        };
        
        // On error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event);
          setIsListening(false);
          setIsRecording(false);
          alert('Voice input error. Please try again or type your message.');
        };
        
        setRecognition(recognitionInstance);
      }
    }
  }, []);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Auto-focus input when typing stops
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);
  
  // Handle voice input
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    if (isRecording) {
      // Stop recording
      recognition.stop();
      setIsRecording(false);
      setIsListening(false);
    } else {
      // Start recording
      setIsRecording(true);
      setIsListening(true);
      recognition.start();
    }
  };
  
  // Handle sending message
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
      isVoice: isRecording,  // Track if it was voice input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    // In production, this would call the backend AI service
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Handle Enter key (Shift+Enter for new line, Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();  // Prevent new line
      handleSend();
    }
  };
  
  // Generate simulated AI response with emojis for warmth
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('scared') || input.includes('afraid') || input.includes('fear')) {
      return '💙 I understand you\'re feeling scared. That\'s a very natural response. Would you feel comfortable telling me more about what\'s making you feel this way? I\'m here to listen.';
    }
    
    if (input.includes('safe') || input.includes('safety')) {
      return '🛡️ Safety is very important. If you\'re feeling unsafe right now, we can connect you with protection services immediately. Are you currently in a safe location?';
    }
    
    if (input.includes('stress') || input.includes('anxious') || input.includes('worry')) {
      return '😌 It sounds like you\'re experiencing stress. That\'s completely understandable given your situation. Have you noticed any specific triggers or times when the stress feels worse?';
    }
    
    if (input.includes('sleep') || input.includes('tired') || input.includes('insomnia')) {
      return '😴 Sleep difficulties are common when dealing with stress. Has this been affecting you for a while? Getting proper rest is important for your well-being.';
    }
    
    if (input.includes('help') || input.includes('support') || input.includes('need')) {
      return '🤝 There are several support services available to you, including counselling, legal assistance, and financial support. Would you like me to help you connect with any of these services?';
    }
    
    if (input.includes('thank') || input.includes('thanks')) {
      return '💚 You\'re very welcome! I\'m here whenever you need to talk. Your well-being matters.';
    }
    
    if (input.includes('better') || input.includes('good') || input.includes('fine')) {
      return '😊 I\'m glad to hear that! It\'s important to acknowledge when things are going well. Is there anything you\'d like to talk about today?';
    }
    
    // Default response
    return '💙 Thank you for sharing that with me. I\'m here to listen without judgment. Is there anything specific you\'d like to talk about or any support you need right now?';
  };
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.VICTIM.name}
      userRole="Victim"
      navItems={VICTIM_NAV_ITEMS}
    >
      {/* Modern fixed-height chat container */}
      <div className="flex flex-col h-[calc(100vh-120px)]">
        
        {/* Header section - Fixed at top */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">💬 AI Well-being Assistant</h1>
              <p className="text-sm text-gray-600 mt-1">Your safe space to share and get support</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
          
          {/* Compact info banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <span className="text-lg">🔒</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <strong>Private & Confidential:</strong> Share your feelings safely. Type or use voice input 🎤
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat messages - Scrollable middle section */}
        <div className="flex-1 overflow-hidden">
          <Card className="h-full" padding="none">
            <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {/* AI Avatar */}
                  {message.sender === 'ai' && (
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        AI
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {message.isVoice && (
                        <span className="text-xs ml-2">🎤</span>
                      )}
                    </div>
                  </div>
                  
                  {/* User Avatar */}
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {DEMO_USERS.VICTIM.name.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      AI
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </Card>
        </div>
        
        {/* Input area - Fixed at bottom */}
        <div className="flex-shrink-0 mt-4">
          <Card padding="none">
            <div className="p-4">
              {/* Voice listening indicator */}
              {isListening && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    <span className="text-sm font-medium text-red-700">🎤 Listening... Speak now</span>
                  </div>
                </div>
              )}
              
              {/* Input row */}
              <div className="flex items-end space-x-2">
                {/* Text input with auto-resize */}
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Shift+Enter for new line)"
                    rows={1}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base resize-none transition-all"
                    style={{ minHeight: '50px', maxHeight: '120px' }}
                    disabled={isTyping || isListening}
                  />
                </div>
                
                {/* Voice input button */}
                <button
                  onClick={handleVoiceInput}
                  disabled={isTyping}
                  className={`flex-shrink-0 p-3 rounded-xl transition-all shadow-md ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                      : 'bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={isRecording ? 'Click to stop recording' : 'Click to use voice input'}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Send button */}
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping || isListening}
                  className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message (or press Enter)"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
              
              {/* Helper text */}
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>💡 Tip: Press Enter to send, Shift+Enter for new line</span>
                <span className="flex items-center space-x-1">
                  <span>🎤</span>
                  <span>Voice input available</span>
                </span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Quick actions - Fixed at bottom */}
        <div className="flex-shrink-0 mt-3">
          <div className="grid grid-cols-3 gap-2">
            <button className="bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg p-2 text-center transition-all">
              <div className="text-xl mb-1">🆘</div>
              <div className="text-xs font-medium text-red-700">Emergency</div>
            </button>
            
            <button className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-2 text-center transition-all">
              <div className="text-xl mb-1">👨‍⚕️</div>
              <div className="text-xs font-medium text-blue-700">Counsellor</div>
            </button>
            
            <button className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-2 text-center transition-all">
              <div className="text-xl mb-1">🤝</div>
              <div className="text-xs font-medium text-green-700">Support</div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Add custom CSS for fade-in animation (add this comment so styles can be referenced)
// The animate-fadeIn class is used for smooth message appearance
