// Victim Check-in Page
// Interactive questionnaire for periodic well-being assessment

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingOverlay } from '@/components/ui/LoadingState';
import { VICTIM_NAV_ITEMS, DEMO_USERS, RESPONSE_LEVELS } from '@/constants';
import { getCheckInQuestions, submitCheckIn } from '@/services/api';
import { ResponseLevel } from '@/types';

export default function CheckInPage() {
  const router = useRouter();
  // TypeScript: Using proper type for questions array instead of 'any'
  // Each question has an id, question text, description, and weight
  const [questions, setQuestions] = useState<Array<{
    id: string;
    question: string;
    description: string;
    weight: number;
  }>>([]);
  const [responses, setResponses] = useState<Record<string, ResponseLevel>>({});
  const [textResponse, setTextResponse] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Load questions
  useEffect(() => {
    async function loadQuestions() {
      try {
        const questionData = await getCheckInQuestions();
        setQuestions(questionData);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadQuestions();
  }, []);
  
  // Handle response selection
  const handleResponse = (questionId: string, response: ResponseLevel) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response,
    }));
  };
  
  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentStep];
    return responses[currentQuestion?.id] !== undefined;
  };
  
  // Navigate to next question
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Navigate to previous question
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Submit check-in
  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // Format responses for submission
      const formattedResponses = questions.map(q => ({
        questionId: q.id,
        question: q.question,
        response: responses[q.id] || 'NOT_AT_ALL',
        weight: q.weight,
      }));
      
      // Submit check-in
      const result = await submitCheckIn({
        victimId: DEMO_USERS.VICTIM.id,
        responses: formattedResponses,
        textResponse,
      });
      
      // Navigate to result page with data
      // For demo, we'll redirect to a results page
      router.push('/victim/check-in/result');
    } catch (error) {
      console.error('Error submitting check-in:', error);
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout
        userName={DEMO_USERS.VICTIM.name}
        userRole="Victim"
        navItems={VICTIM_NAV_ITEMS}
      >
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading check-in questions...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  // Show text input section
  if (currentStep === questions.length) {
    return (
      <DashboardLayout
        userName={DEMO_USERS.VICTIM.name}
        userRole="Victim"
        navItems={VICTIM_NAV_ITEMS}
      >
        {submitting && <LoadingOverlay message="Analyzing your responses..." />}
        
        {/* Using &apos; to escape apostrophe in description */}
        <PageHeader
          title="Additional Information"
          description="Share anything else you&apos;d like us to know (optional)"
        />
        
        <Card>
          <div className="mb-6">
            {/* Using &apos; for apostrophes to avoid JSX escape errors */}
            <label className="block text-base font-medium text-gray-900 mb-3">
              Is there anything else you&apos;d like to tell us about how you&apos;re feeling?
            </label>
            <textarea
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="You can describe your feelings, concerns, or anything that's on your mind..."
            />
            <p className="text-sm text-gray-600 mt-2">
              This information helps us better understand your situation and provide appropriate support.
            </p>
          </div>
          
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={handlePrevious}>
              ← Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Check-in'}
            </Button>
          </div>
        </Card>
      </DashboardLayout>
    );
  }
  
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / (questions.length + 1)) * 100;
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.VICTIM.name}
      userRole="Victim"
      navItems={VICTIM_NAV_ITEMS}
    >
      <PageHeader
        title="Well-being Check-in"
        description="Please answer the following questions honestly. Your responses are confidential."
      />
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Question Card */}
      <Card className="mb-6">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {currentQuestion.question}
          </h2>
          <p className="text-base text-gray-600">
            {currentQuestion.description}
          </p>
        </div>
        
        {/* Response options */}
        <div className="space-y-3">
          {Object.values(RESPONSE_LEVELS).map((level) => {
            const isSelected = responses[currentQuestion.id] === level.value;
            
            return (
              <button
                key={level.value}
                onClick={() => handleResponse(currentQuestion.id, level.value as ResponseLevel)}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all
                  ${isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    {level.label}
                  </span>
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}
                  `}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          ← Previous
        </Button>
        
        <Button
          variant="primary"
          onClick={currentStep === questions.length - 1 ? () => setCurrentStep(questions.length) : handleNext}
          disabled={!isCurrentQuestionAnswered()}
        >
          {currentStep === questions.length - 1 ? 'Continue →' : 'Next →'}
        </Button>
      </div>
      
      {/* Help text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Your responses help us understand your well-being and provide appropriate support.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          All information is confidential and will only be accessed by authorized support personnel.
        </p>
      </div>
    </DashboardLayout>
  );
}
