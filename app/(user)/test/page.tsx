"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MCQData } from '@/type/questionTypes'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader2, User, BookOpen, CheckCircle } from 'lucide-react'

export default function UserTestPage() {
  const [id, setId] = useState("")
  const [quiz, setQuiz] = useState<MCQData>()
  const [name, setName] = useState("")
  const [answer, setAnswer] = useState<{ question: string; answer: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [mousePos, ] = useState({ x: 0, y: 0 })

  useEffect(() => {
  const query = new URLSearchParams(window.location.search)
  const urlId = query.get("id")
  if (!urlId) return
  setId(urlId)

  const getData = async () => {
    try {
      const response = await axios.get(`/api/user/test?id=${urlId}`)
      setQuiz(response.data.data)
      setAnswer(response.data.data.questions.map((item: any) => ({
        question: item.question,
        answer: ""
      })))
    } catch (error: any) {
      toast.error("Failed to fetch quiz")
    }
  }

  getData()
}, [])


  const handelChange = (val: string, index: number) => {
    const newAnswer = [...answer]
    newAnswer[index].answer = val
    setAnswer(newAnswer)
  }

  const handelSubmit = async () => {
    if (!name || !quiz) {
      toast.error("Please enter your name and complete the test")
      return
    }
    try {
      setLoading(true)
      const response = await axios.post(`/api/user/test?id=${id}`, {
        name,
        answer,
        quizId: quiz._id
      })
      toast.success(response.data.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Submission failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden text-white">
      {/* Background glow */}
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
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Welcome to the Test</h1>
          <div className="text-gray-300 space-y-1">
            <p className="flex justify-center items-center gap-2">
              <User className="w-4 h-4 text-purple-400" /> Admin: <span className="text-white font-medium">{quiz?.adminName}</span>
            </p>
            <p className="flex justify-center items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" /> Topic: <span className="text-white font-medium">{quiz?.topic}</span>
            </p>
          </div>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-gray-300 font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" /> Your Name:
          </label>
          <Input
            placeholder="Enter your name"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-xl h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quiz?.questions.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition hover:bg-white/10 space-y-4"
            >
              <h2 className="text-lg font-semibold">
                {index + 1}. {item.question}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                {Object.entries(item.options).map(([key, value]) => (
                  <label
                    key={key}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                      answer[index].answer === key
                        ? "bg-purple-600 text-white border-purple-400"
                        : "bg-white/10 border-white/10 hover:bg-white/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox text-purple-500"
                      checked={answer[index].answer === key}
                      onChange={() => handelChange(key, index)}
                    />
                    <span className="font-medium">{key}:</span>
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-8">
          <Button
            onClick={handelSubmit}
            disabled={loading}
            className="w-full max-w-sm group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
              {loading ? "Submitting..." : "Submit Test"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
