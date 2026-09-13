// ============================================================================
// LANDING PAGE - Modern, Attractive Design
// ============================================================================
// Enhanced with gradients, animations, and modern UI while maintaining UX
// ============================================================================

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation - Modern with backdrop blur */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo - Enhanced with gradient */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white text-xl sm:text-2xl font-bold">S</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Sentinel
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">AI-Powered Care</p>
              </div>
            </div>
            
            {/* Login button - Enhanced */}
            <Link href="/login">
              <Button variant="primary" size="lg">
                <span className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <span className="text-lg">→</span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section - Enhanced with floating elements */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Demo badge - Enhanced with animation */}
            <div className="mb-6 flex justify-center animate-fadeIn">
              <span className="demo-badge inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-semibold shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>Prototype Demo</span>
              </span>
            </div>
            
            {/* Main heading - Enhanced with gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fadeIn">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Victim
              </span>
              <br />
              <span className="text-gray-900">Well-being Monitoring</span>
            </h1>
            
            {/* Subtitle - Enhanced */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto animate-fadeIn">
              Continuous, explainable early-warning support for victims throughout the case lifecycle
            </p>
            
            {/* Feature tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fadeIn">
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
                🤖 AI-Powered
              </span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
                🔒 Private & Secure
              </span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
                ⚡ Real-time Monitoring
              </span>
            </div>
            
            {/* CTA buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
              <Link href="/login">
                <Button variant="primary" size="lg" fullWidth>
                  <span className="flex items-center justify-center space-x-2 px-6">
                    <span>Get Support Now</span>
                    <span className="text-xl">→</span>
                  </span>
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg" fullWidth>
                  <span className="flex items-center justify-center space-x-2 px-6">
                    <span>How It Works</span>
                    <span className="text-xl">↓</span>
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visual Workflow Section - Enhanced with cards */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple three-step process powered by AI and human expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 - Enhanced card */}
            <div className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📝</span>
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Check-in</h3>
                <p className="text-base text-gray-600 text-center leading-relaxed">
                  Victims complete periodic well-being check-ins through simple, compassionate questions
                </p>
              </div>
            </div>
            
            {/* Step 2 - Enhanced card */}
            <div className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">AI Analysis</h3>
                <p className="text-base text-gray-600 text-center leading-relaxed">
                  AI analyzes responses to detect distress signals and calculate risk scores with explainability
                </p>
              </div>
            </div>
            
            {/* Step 3 - Enhanced card */}
            <div className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl">👨‍⚕️</span>
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Human Support</h3>
                <p className="text-base text-gray-600 text-center leading-relaxed">
                  Counsellors and authorities receive alerts and provide targeted, compassionate interventions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Problem Statement Section - Enhanced with gradient */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Continuous Monitoring?
              </h2>
              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-blue-50 leading-relaxed">
                  Victims of atrocities often experience prolonged psychological and emotional distress during investigation, trial, and rehabilitation. Traditional case management systems track legal progress but may not detect worsening victim well-being.
                </p>
                <p className="text-lg sm:text-xl text-white leading-relaxed font-medium">
                  <span className="bg-white/20 px-2 py-1 rounded">Sentinel</span> bridges this gap by providing continuous well-being intelligence alongside case management, enabling early intervention when victims need support most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Enhanced with icons and hover effects */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful capabilities designed with care and responsibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 - Enhanced card */}
            <div className="group p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Dynamic Distress Tracking
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Track distress levels over time to identify escalating risk patterns
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group p-6 sm:p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-indigo-100">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Explainable AI Analysis
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Understand why alerts are generated with clear explanations
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Early Warning System
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Detect escalation risk before crisis situations develop
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="group p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Human-in-the-Loop
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                AI assists, humans decide. All interventions require human review
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="group p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Targeted Interventions
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Connect victims with appropriate support services when needed
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="group p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Privacy & Responsible AI
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Designed with privacy and ethical AI principles at the core
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Important Notice Section - Enhanced */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                Important Notice
              </h3>
            </div>
            <ul className="space-y-3 text-base text-gray-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 text-lg font-bold">✓</span>
                <span>This is a prototype demonstration for SIH 2026</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 text-lg font-bold">✓</span>
                <span>AI-generated insights assist authorized personnel but do not replace professional judgment</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 text-lg font-bold">✓</span>
                <span>Distress indicators are not medical diagnoses</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 text-lg font-bold">✓</span>
                <span>All high-risk cases require human review and decision-making</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Enhanced with gradient */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to See How It Works?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Explore the prototype with demo data for each role and experience the full system
          </p>
          <Link href="/login">
            <Button variant="secondary" size="lg">
              <span className="flex items-center justify-center space-x-3 px-8">
                <span className="text-lg">🚀</span>
                <span>Start Demo Experience</span>
                <span className="text-xl">→</span>
              </span>
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer - Enhanced */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <h3 className="text-2xl font-bold">Sentinel</h3>
            </div>
            
            <p className="text-lg text-gray-300 mb-2">
              SIH 2026 Prototype
            </p>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              AI-Powered Dynamic Mental Health Monitoring and Distress Prediction System
            </p>
            
            {/* Divider */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Built with care for those who need support most
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
