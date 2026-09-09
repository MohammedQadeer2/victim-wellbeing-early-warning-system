// ============================================================================
// AI ASSISTANT PAGE - Mental Health Chat Interface
// ============================================================================
// This page provides a safe chat interface for victims to share their feelings
// Features: Text input, Voice input (Web Speech API), AI responses
// ============================================================================

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Message {
  id: string;
  sender: 'ai' | 'user';        // Who sent the message
  content: string;               // Message text
  timestamp: Date;               // When it was sent
  isVoice?: boolean;            // Was it sent via voice input?
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AIAssistantPage() {
  
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  
  // Chat messages array - stores all conversation messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Hello! 👋 I\'m here to listen and support you. Everything you share is confidential. How have you been feeling lately?',
      timestamp: new Date(),
    },
  ]);
  
  // Input field text value
  const [inputValue, setInputValue] = useState('');
  
  // Loading states
  const [isTyping, setIsTyping] = useState(false);      // AI is typing response
  const [isRecording, setIsRecording] = useState(false); // Mic button clicked
  const [isListening, setIsListening] = useState(false); // Browser is listening
  
  // Refs for DOM elements
  const messagesEndRef = useRef<HTMLDivElement>(null);        // For auto-scroll
  const inputRef = useRef<HTMLTextAreaElement>(null);         // For auto-focus
  
  // Voice recognition instance (Web Speech API)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognition, setRecognition] = useState<any>(null);
  
  // ========================================
  // VOICE RECOGNITION SETUP
  // ========================================
  
  useEffect(() => {
    // Only run in browser (not during server-side rendering)
    if (typeof window === 'undefined') return;
    
    // Check if browser supports Web Speech API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WindowWithSpeech = window as any;
    const SpeechRecognition = WindowWithSpeech.SpeechRecognition || WindowWithSpeech.webkitSpeechRecognition;
    
    if (!SpeechRecognition) return; // Voice not supported in this browser
    
    // Create speech recognition instance
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;        // Stop after one phrase
    recognitionInstance.interimResults = false;    // Only give final result
    recognitionInstance.lang = 'en-US';           // Set language
    
    // EVENT: When speech is successfully recognized
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognitionInstance.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);  // Put recognized text in input field
      setIsListening(false);
      setIsRecording(false);
    };
    
    // EVENT: When recognition stops
    recognitionInstance.onend = () => {
      setIsListening(false);
      setIsRecording(false);
    };
    
    // EVENT: When an error occurs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
      setIsRecording(false);
      alert('Voice input error. Please try again or type your message.');
    };
    
    setRecognition(recognitionInstance);
  }, []);
  
  // ========================================
  // AUTO-SCROLL & AUTO-FOCUS EFFECTS
  // ========================================
  
  // Scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input field after AI finishes typing
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);
  
  // ========================================
  // EVENT HANDLERS
  // ========================================
  
  // FUNCTION: Handle voice input button click
  const handleVoiceInput = () => {
    // Check if voice recognition is available
    if (!recognition) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    if (isRecording) {
      // User clicked to stop recording
      recognition.stop();
      setIsRecording(false);
      setIsListening(false);
    } else {
      // User clicked to start recording
      setIsRecording(true);
      setIsListening(true);
      recognition.start();
    }
  };
  
  // FUNCTION: Send message (called when user clicks send or presses Enter)
  const handleSend = () => {
    if (!inputValue.trim()) return; // Don't send empty messages
    
    // Create user message object
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
      isVoice: isRecording,
    };
    
    // Add message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');              // Clear input field
    setIsTyping(true);              // Show "AI is typing..." indicator
    
    // Simulate AI response (with delay)
    // TODO: Replace with real backend API call in production
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);  // Hide typing indicator
    }, 1500);
  };
  
  // FUNCTION: Handle keyboard shortcuts in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter = Send, Shift+Enter = New line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // ========================================
  // AI RESPONSE GENERATION
  // ========================================
  
  // FUNCTION: Generate context-aware AI responses based on user input
  // This simulates AI analysis - in production, this would call backend API
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Pattern matching for different emotional states
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
    
    // Default empathetic response
    return '💙 Thank you for sharing that with me. I\'m here to listen without judgment. Is there anything specific you\'d like to talk about or any support you need right now?';
  };
  
  // ========================================
  // RENDER: Main UI
  // ========================================
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.VICTIM.name}
      userRole="Victim"
      navItems={VICTIM_NAV_ITEMS}
    >
      {/* ========================================
          MAIN CONTAINER - Full height layout
          ======================================== */}
      <div className="flex flex-col" style={{ height: 'calc(100vh - 180px)' }}>
        
        {/* ========================================
            HEADER SECTION - Title & Info
            ======================================== */}
        <div className="flex-shrink-0 mb-3">
          {/* Title row */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">💬 AI Well-being Assistant</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Your safe space to share and get support</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-gray-600">Online</span>
            </div>
          </div>
          
          {/* Privacy notice banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-2">
            <div className="flex items-start space-x-2">
              <span className="text-base sm:text-lg">🔒</span>
              <p className="text-xs sm:text-sm text-gray-700">
                <strong>Private & Confidential:</strong> Share your feelings safely. Type or use voice input 🎤
              </p>
            </div>
          </div>
        </div>
        
        {/* ========================================
            CHAT MESSAGES AREA - Scrollable
            ======================================== */}
        <div className="flex-1 overflow-hidden mb-3">
          <Card className="h-full" padding="none">
            <div className="h-full overflow-y-auto p-3 sm:p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
              
              {/* Loop through all messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {/* AI Avatar (shown on left for AI messages) */}
                  {message.sender === 'ai' && (
                    <div className="flex-shrink-0 mr-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md">
                        AI
                      </div>
                    </div>
                  )}
                  
                  {/* Message bubble */}
                  <div
                    className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    {/* Message text */}
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    
                    {/* Timestamp and voice indicator */}
                    <div className="flex items-center justify-between mt-1 sm:mt-2">
                      <p className={`text-xs ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {message.isVoice && (
                        <span className="text-xs ml-2" title="Sent via voice">🎤</span>
                      )}
                    </div>
                  </div>
                  
                  {/* User Avatar (shown on right for user messages) */}
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md">
                        {DEMO_USERS.VICTIM.name.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator (shown when AI is typing) */}
              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md">
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
              
              {/* Invisible div for auto-scroll target */}
              <div ref={messagesEndRef} />
            </div>
          </Card>
        </div>
        
        {/* ========================================
            INPUT AREA - Text & Voice Input
            ======================================== */}
        <div className="flex-shrink-0">
          <Card padding="none">
            <div className="p-3 sm:p-4">
              
              {/* Voice listening indicator (shown when recording) */}
              {isListening && (
                <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    <span className="text-xs sm:text-sm font-medium text-red-700">🎤 Listening... Speak now</span>
                  </div>
                </div>
              )}
              
              {/* Input row with textarea and buttons */}
              <div className="flex items-end space-x-2">
                
                {/* Textarea for typing */}
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows={2}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-gray-900 placeholder-gray-400 resize-none transition-all"
                    style={{ minHeight: '60px', maxHeight: '120px' }}
                    disabled={isTyping || isListening}
                  />
                </div>
                
                {/* Voice input button */}
                <button
                  onClick={handleVoiceInput}
                  disabled={isTyping}
                  className={`flex-shrink-0 p-2 sm:p-3 rounded-xl transition-all shadow-md ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                      : 'bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={isRecording ? 'Stop recording' : 'Start voice input'}
                  aria-label="Voice input"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Send button */}
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping || isListening}
                  className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
              
              {/* Helper text */}
              <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                <span>💡 Enter to send • Shift+Enter for new line</span>
                <span className="flex items-center space-x-1">
                  <span>🎤</span>
                  <span className="hidden sm:inline">Voice available</span>
                </span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* ========================================
            QUICK ACTIONS - Emergency buttons
            ======================================== */}
        <div className="flex-shrink-0 mt-2">
          <div className="grid grid-cols-3 gap-2">
            
            {/* Emergency button */}
            <button 
              className="bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg p-2 text-center transition-all"
              aria-label="Emergency support"
            >
              <div className="text-base sm:text-xl mb-1">🆘</div>
              <div className="text-xs font-medium text-red-700">Emergency</div>
            </button>
            
            {/* Counsellor button */}
            <button 
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-2 text-center transition-all"
              aria-label="Contact counsellor"
            >
              <div className="text-base sm:text-xl mb-1">👨‍⚕️</div>
              <div className="text-xs font-medium text-blue-700">Counsellor</div>
            </button>
            
            {/* Support services button */}
            <button 
              className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-2 text-center transition-all"
              aria-label="View support services"
            >
              <div className="text-base sm:text-xl mb-1">🤝</div>
              <div className="text-xs font-medium text-green-700">Support</div>
            </button>
          </div>
        </div>
        
      </div>
      {/* End of main container */}
    </DashboardLayout>
  );
}

// ============================================================================
// END OF COMPONENT
// ============================================================================
// The animate-fadeIn class is defined in globals.css for smooth message appearance
