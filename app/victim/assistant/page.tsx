// AI Assistant Page
// Chat interface for victims to share feelings and concerns

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Hello! I\'m here to listen and help you share how you\'re feeling. Everything you tell me is confidential and will help us provide you with the right support. How have you been feeling lately?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending message
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
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
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Generate simulated AI response
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('scared') || input.includes('afraid') || input.includes('fear')) {
      return 'I understand you\'re feeling scared. That\'s a very natural response to what you\'re going through. Would you feel comfortable telling me more about what\'s making you feel this way?';
    }
    
    if (input.includes('safe') || input.includes('safety')) {
      return 'Safety is very important. If you\'re feeling unsafe right now, we can connect you with protection services immediately. Are you currently in a safe location?';
    }
    
    if (input.includes('stress') || input.includes('anxious') || input.includes('worry')) {
      return 'It sounds like you\'re experiencing a lot of stress. That\'s understandable given the situation. Have you noticed any specific triggers or times when the stress feels worse?';
    }
    
    if (input.includes('sleep') || input.includes('tired')) {
      return 'Sleep difficulties are common when dealing with stress. Has this been affecting you for a while? Getting proper rest is important for your well-being.';
    }
    
    if (input.includes('help') || input.includes('support')) {
      return 'There are several support services available to you, including counselling, legal assistance, and financial support. Would you like me to help you connect with any of these services?';
    }
    
    // Default response
    return 'Thank you for sharing that with me. I\'m here to listen. Is there anything specific you\'d like to talk about or any support you need right now?';
  };
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.VICTIM.name}
      userRole="Victim"
      navItems={VICTIM_NAV_ITEMS}
    >
      <PageHeader
        title="AI Well-being Assistant"
        description="Share how you're feeling. This assistant helps identify signals that may need human support."
      />
      
      {/* Important notice */}
      <div className="mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>How this works:</strong> You can share your feelings and concerns here. The AI will listen and help identify if you need additional support.
            </p>
            <p>
              <strong>Remember:</strong> This is not a replacement for professional counselling. If you need immediate help, please contact support services or emergency services.
            </p>
          </div>
        </Card>
      </div>
      
      {/* Chat container */}
      <Card className="mb-6" padding="none">
        {/* Messages area */}
        <div className="h-[500px] overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
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
        
        {/* Input area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              variant="primary"
            >
              Send
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send
          </p>
        </div>
      </Card>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gray-50">
          <div className="text-center py-3">
            <p className="text-sm font-medium text-gray-900 mb-1">Need immediate help?</p>
            <Button variant="danger" size="sm" fullWidth>
              Emergency Support
            </Button>
          </div>
        </Card>
        
        <Card className="bg-gray-50">
          <div className="text-center py-3">
            <p className="text-sm font-medium text-gray-900 mb-1">Talk to a person</p>
            <Button variant="primary" size="sm" fullWidth>
              Request Counsellor
            </Button>
          </div>
        </Card>
        
        <Card className="bg-gray-50">
          <div className="text-center py-3">
            <p className="text-sm font-medium text-gray-900 mb-1">View support options</p>
            <Button variant="secondary" size="sm" fullWidth>
              Support Services
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
