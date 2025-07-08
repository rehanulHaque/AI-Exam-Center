"use client"
import { MCQData } from '@/type/questionTypes'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Loader2, BookOpen, Link2, User } from 'lucide-react'

export default function UpdateQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const [, setId] = useState("")
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<MCQData>()
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getData = async () => {
    try {
      setLoading(true)
      const resolved = await params
      setId(resolved.id)
      const response = await axios.get(`/api/admin/update?id=${resolved.id}`)
      setQuiz(response.data.quiz)
      const url = `${process.env.MODE === "development" ? process.env.NEXT_PUBLIC_URL : "/"}/test?id=${response.data.token}`
      setShareUrl(url)
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Mouse Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
          style={{
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-12 text-white">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Update Quiz</h1>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-400" /> Admin: <span className="text-white">{quiz?.adminName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" /> Topic: <span className="text-white capitalize">{quiz?.topic}</span>
                </p>
                {shareUrl && (
                  <p className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-green-400" /> Share Link:
                    <span
                      onClick={handleCopy}
                      className="text-blue-400 underline cursor-pointer hover:text-blue-300"
                    >
                      {shareUrl.slice(0, 60)}...
                    </span>
                    {copied && <span className="text-green-400 text-sm ml-2">Copied!</span>}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quiz?.questions.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 transition hover:bg-white/10"
            >
              <h2 className="text-xl font-semibold">
                {index + 1}. {item.question}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                {Object.entries(item.options).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.answer === key}
                      readOnly
                      className="form-checkbox h-5 w-5 text-purple-500"
                    />
                    <span className="text-white font-medium">{key}:</span>
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
