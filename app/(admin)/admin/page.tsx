"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MCQData } from "@/type/questionTypes";
import Link from "next/link";
import { Search, Plus, BookOpen, User, ArrowRight, Brain, Sparkles, FileText } from "lucide-react";
import axios from "axios";

export default function page() {
  const [nameTitle, setnameTitle] = useState("")
  const [data, setData] = useState<MCQData[]>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const timer = setTimeout( async() => {
      if(nameTitle){
        const response = await axios.get("/api/admin", {params: {adminName: nameTitle}})
        setData(response.data.data || [])
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [nameTitle])

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
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-2 w-fit">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AI Exam Center</span>
          </Link>
        </div>
      </nav>

      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`flex gap-4 justify-between items-center mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300 mt-1">Manage your exams and track performance</p>
              </div>
            </div>
            <div>
              <Link href="/admin/create">
                <Button className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden border-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Create Exam</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Section */}
          <div className={`max-w-5xl mx-auto mb-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                value={nameTitle} 
                onChange={e => setnameTitle(e.target.value)} 
                placeholder="Search by admin name..." 
                className="pl-12 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col gap-6">
              {data && data.map((item, index) => (
                <Link 
                  href={`/admin/submission/${item._id}`} 
                  key={item._id}
                  className="group relative flex items-center justify-between w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isLoaded ? `slideInUp 0.6s ease-out ${index * 100}ms both` : 'none'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="w-4 h-4 text-purple-400" />
                        <p className="font-bold text-white text-lg">{item.adminName}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-300">{item.topic}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-full">
                      <span className="text-purple-300 text-sm font-medium">View Details</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
              
              {data && data.length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl w-16 h-16 mx-auto mb-4">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xl text-gray-300 mb-2">No exams found</p>
                  <p className="text-gray-400">Try searching for a different admin name</p>
                </div>
              )}
              
              {!data && nameTitle && (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl w-16 h-16 mx-auto mb-4 animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xl text-gray-300">Searching...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}