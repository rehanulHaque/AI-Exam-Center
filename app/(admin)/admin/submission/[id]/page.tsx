"use client"

import { Button } from '@/components/ui/button'
import { SubmissionResponseTypes } from '@/type/submissionTypes'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Users, CheckCircle, XCircle } from 'lucide-react'

export default function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const [paramsId, setParamsId] = useState("")
  const [submittedData, setSubmittedData] = useState<SubmissionResponseTypes[]>()
  const [, setLoading] = useState(false)
  const [, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const getData = async () => {
    try {
      setLoading(true)
      const resolvedParams = await params
      setParamsId(resolvedParams.id)
      const response = await axios.get(`/api/admin/submission?id=${resolvedParams.id}`)
      setSubmittedData(response.data.results || [])
    } catch (error: any) {
      console.error(error)
      toast.error("Failed to fetch submissions.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
          style={{
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
          }}
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 space-y-12">
        
        {/* Header */}
        <div className="flex justify-between items-center transition-all duration-1000 delay-200 
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Submissions</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/admin/update/${paramsId}`}>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105 transition">
                Update
              </Button>
            </Link>
            <p className="text-gray-300">
              Total: <span className="text-white font-semibold">{submittedData?.length || 0}</span>
            </p>
          </div>
        </div>

        {/* Submissions */}
        <div className="grid gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-300 
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
          {submittedData && submittedData.length > 0 ? (
            submittedData.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 shadow-md"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">{item.userName}</h2>
                  <p className="text-gray-300">
                    Correct Answers: <span className="text-white font-medium">{item.correctAnswers}</span> / {item.totalQuestions}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Button variant="default" className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Accept
                  </Button>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-gray-300">
              No Submissions Found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
