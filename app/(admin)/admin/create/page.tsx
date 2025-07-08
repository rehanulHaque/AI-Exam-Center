"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Brain, Sparkles, Copy, Check, User,
  BookOpen, Link2, ArrowLeft, Loader2
} from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

export default function CreateExamPage() {
  const [adminName, setAdminName] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: any) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post("/api/admin/create", {
        adminName,
        title: title.toLowerCase()
      })
      const link = `${process.env.NEXT_PUBLIC_URL}/test?id=${response.data.token}`
      setShareUrl(link)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
          style={{
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 p-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AI Exam Center</span>
          </Link>
          <Link href="/admin" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-md mx-auto transition-all duration-1000 delay-300 space-y-10">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">AI Question Generator</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Create Smart{" "}
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-gray-300 text-lg">Generate 10 intelligent MCQs instantly</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="adminName" className="flex items-center gap-2 text-white font-medium mb-1">
                  <User className="w-5 h-5 text-purple-400" />
                  Admin Name
                </label>
                <Input
                  id="adminName"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-xl h-12 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="flex items-center gap-2 text-white font-medium mb-1">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Question Topic
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Math, Physics, History"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-xl h-12 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !adminName || !title}
              className="w-full group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</> : <><Brain className="w-5 h-5" /> Generate Questions</>}
              </span>
            </Button>
          </form>

          {/* Shareable Link */}
          {shareUrl && (
            <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-white font-medium">
                <Link2 className="w-5 h-5 text-green-400" />
                Test Link Generated!
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <p className="text-gray-300 text-sm break-all mb-2">{shareUrl}</p>
                <Button
                  onClick={handleCopy}
                  className="group relative px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Link</>}
                  </span>
                </Button>
              </div>
              <p className="text-gray-400 text-sm">Share this link with your students</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
