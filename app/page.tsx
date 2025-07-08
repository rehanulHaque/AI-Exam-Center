"use client"
import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, CheckCircle, Clock, Target, Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const AIExamCenterLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI-Powered Question Generation",
      description: "Create intelligent MCQ questions instantly with our advanced AI system",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Smart Testing Platform",
      description: "Seamless test-taking experience with real-time analytics",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Easy User Management",
      description: "Share test links instantly and track student performance",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Questions Generated", icon: <BookOpen className="w-6 h-6" /> },
    { number: "500+", label: "Active Admins", icon: <Users className="w-6 h-6" /> },
    { number: "50K+", label: "Tests Completed", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "<5s", label: "Question Creation", icon: <Clock className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]"></div>
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
          style={{
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 p-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AI Exam Center</span>
          </div>
          
          <div className="flex space-x-4">
            <Link href={'/admin'}
              className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Admin Dashboard</span>
              </span>
            </Link>
            
            <Link href={'/admin/create'}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Create Exam</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">AI-Powered Testing Revolution</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Smart Exam
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Creation
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your testing experience with AI-generated questions. Create comprehensive MCQ exams 
              in seconds, share with ease, and track performance like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href={'/admin/create'}
                className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Start Creating</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link href={'/admin'}
                className="group px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/20 border border-white/20"
              >
                <span className="flex items-center space-x-2">
                  <span>View Dashboard</span>
                  <ChevronDown className="w-5 h-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose AI Exam Center?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of exam creation with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-purple-500 bg-white/10' : ''
                } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${700 + index * 200}ms` }}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${1000 + index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Testing?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of educators and administrators who are already creating smarter exams with AI
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href={'/admin/create'}
                className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <Brain className="w-6 h-6" />
                  <span>Create Your First Exam</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AI Exam Center</span>
          </div>
          <p className="text-gray-400">© 2025 AI Exam Center. Revolutionizing education through AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default AIExamCenterLanding;