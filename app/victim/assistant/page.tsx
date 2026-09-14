// AI Assistant - ChatGPT/Gemini Style
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export default function AIAssistantPage() {
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
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognition, setRecognition] = useState<any>(null);
  
  // Voice recognition setup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WindowWithSpeech = window as any;
    const SpeechRecognition = WindowWithSpeech.SpeechRecognition || WindowWithSpeech.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognitionInstance.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
      setIsRecording(false);
    };
    
    recognitionInstance.onend = () => {
      setIsListening(false);
      setIsRecording(false);
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setIsRecording(false);
    };
    
    setRecognition(recognitionInstance);
  }, []);
  
  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      isVoice: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: 'Thank you for sharing that with me. I\'m here to listen without judgment. Is there anything specific you\'d like to talk about or any support you need right now?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Voice input not supported in this browser');
      return;
    }
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      setIsListening(false);
    } else {
      setIsRecording(true);
      setIsListening(true);
      recognition.start();
    }
  };
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.VICTIM.name}
      userRole="Victim"
      navItems={VICTIM_NAV_ITEMS}
    >
      {/* Full height with flex - Messages scroll, input fixed */}
      <div className="h-screen flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
        
        {/* SCROLLABLE chat messages - ONLY THIS AREA SCROLLS */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          <div className="max-w-4xl mx-auto w-full">
            
            {/* Watermark */}
            {messages.filter(m => m.sender === 'user').length === 0 && (
              <div className="flex items-center justify-center min-h-[60vh] opacity-20">
                <div className="text-center">
                  <div className="text-8xl mb-4">💬</div>
                  <h2 className="text-4xl font-bold text-gray-600">AI Well-being Assistant</h2>
                  <p className="text-gray-500 mt-2 text-lg">Your safe, confidential space</p>
                </div>
              </div>
            )}
            
            {/* Messages */}
            <div className="space-y-6 py-4">{messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* AI Avatar - Left side */}
                  {message.sender === 'ai' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0">
                      AI
                    </div>
                  )}
                  
                  {/* Message bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] rounded-2xl px-3 sm:px-4 md:px-5 py-2 sm:py-3 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {message.isVoice && ' 🎤'}
                    </p>
                  </div>
                  
                  {/* User Avatar - Right side */}
                  {message.sender === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold ml-3 flex-shrink-0">
                      D
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold mr-3">
                    AI
                  </div>
                  <div className="bg-gray-100 border border-gray-200 rounded-2xl px-5 py-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        
        {/* FIXED INPUT - Compact, at bottom, no padding issues */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 w-full">
            
            {/* Listening indicator */}
            {isListening && (
              <div className="mb-1 p-1.5 bg-red-50 border border-red-300 rounded-lg text-center text-xs text-red-700 font-semibold">
                🎤 Listening...
              </div>
            )}
            
            {/* Input row */}
            <div className="flex items-end gap-2">
              {/* Textarea */}
              <div className="flex-1 min-w-0">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AI Assistant..."
                  rows={1}
                  className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base text-gray-900 placeholder-gray-400"
                  style={{ minHeight: '40px', maxHeight: '100px' }}
                  disabled={isTyping || isListening}
                />
              </div>
              
              {/* Mic button */}
              <button
                onClick={handleVoiceInput}
                disabled={isTyping}
                className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
                } disabled:opacity-50`}
                title="Voice input"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping || isListening}
                className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all disabled:opacity-50 flex-shrink-0"
                title="Send"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            
            {/* Helper text */}
            <p className="text-xs text-gray-500 text-center mt-1">
              Enter to send • Shift+Enter
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
