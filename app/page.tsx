// Landing Page
// Introduction to the system with clear value proposition

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Sentinel</h1>
            </div>
            
            {/* Login button */}
            <Link href="/login">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Demo badge */}
            <div className="mb-6 flex justify-center">
              <span className="demo-badge">Prototype Demo</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Victim<br />Well-being Monitoring
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 leading-relaxed">
              Continuous, explainable early-warning support for victims throughout the case lifecycle
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button variant="primary" size="lg" fullWidth>
                  Get Support
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg" fullWidth>
                  How It Works
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visual Workflow Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Check-in</h3>
              <p className="text-base text-gray-600">
                Victims complete periodic well-being check-ins through simple questions
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-base text-gray-600">
                AI analyzes responses to detect distress signals and calculate risk scores
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Human Support</h3>
              <p className="text-base text-gray-600">
                Counsellors and authorities receive alerts and provide targeted interventions
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Problem Statement Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Continuous Monitoring?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Victims of atrocities often experience prolonged psychological and emotional distress during investigation, trial, and rehabilitation. Traditional case management systems track legal progress but may not detect worsening victim well-being.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Sentinel</strong> bridges this gap by providing continuous well-being intelligence alongside case management, enabling early intervention when victims need support most.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Dynamic Distress Tracking
              </h3>
              <p className="text-base text-gray-600">
                Track distress levels over time to identify escalating risk patterns
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Explainable AI Analysis
              </h3>
              <p className="text-base text-gray-600">
                Understand why alerts are generated with clear explanations
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Early Warning System
              </h3>
              <p className="text-base text-gray-600">
                Detect escalation risk before crisis situations develop
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Human-in-the-Loop
              </h3>
              <p className="text-base text-gray-600">
                AI assists, humans decide. All interventions require human review
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Targeted Interventions
              </h3>
              <p className="text-base text-gray-600">
                Connect victims with appropriate support services when needed
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Privacy & Responsible AI
              </h3>
              <p className="text-base text-gray-600">
                Designed with privacy and ethical AI principles at the core
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Important Notice Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Important Notice
            </h3>
            <ul className="space-y-2 text-base text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>This is a prototype demonstration for SIH 2026</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>AI-generated insights assist authorized personnel but do not replace professional judgment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Distress indicators are not medical diagnoses</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>All high-risk cases require human review and decision-making</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to See How It Works?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore the prototype with demo data for each role
          </p>
          <Link href="/login">
            <Button variant="secondary" size="lg">
              Start Demo
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base">
            Sentinel - SIH 2026 Prototype
          </p>
          <p className="text-sm text-gray-400 mt-2">
            AI-Powered Dynamic Mental Health Monitoring and Distress Prediction System
          </p>
        </div>
      </footer>
    </div>
  );
}
