"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  quizQuestions,
  getRaiseScoreInterpretation,
  calculateCategoryScores,
  getTopTips,
  MAX_RAW_SCORE,
  validateTextAnswer,
} from "@/lib/quiz-data"
import type { QuizQuestion, CategoryScore, TextQualityResult } from "@/lib/quiz-data"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // RadioGroupItem is used internally by Label
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, RotateCcw, Mail, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function InteractiveQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(string | number | null)[]>(new Array(quizQuestions.length).fill(null))
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [finalRaiseScore, setFinalRaiseScore] = useState(0)
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([])
  const [topTips, setTopTips] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [showEmailStep, setShowEmailStep] = useState(false)
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [textQualityIssues, setTextQualityIssues] = useState<string[]>([])
  const [hasLowQualityText, setHasLowQualityText] = useState(false)

  const currentQuestion: QuizQuestion = quizQuestions[currentQuestionIndex]
  const progressValue = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  const accentButtonClass =
    "bg-accent text-accent-foreground hover:bg-opacity-80 border border-accent transition-all duration-300 text-xs uppercase tracking-widest py-3 px-6"
  const outlineButtonClass =
    "bg-transparent text-background hover:bg-background/10 border border-background transition-all duration-300 text-xs uppercase tracking-widest py-3 px-6"

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      processQuizCompletion()
    }
  }

  const processQuizCompletion = () => {
    const rawScoresPerQuestion = answers.map((answer, index) => {
      const question = quizQuestions[index]
      if (question.type === "multiple-choice" || question.type === "dropdown") {
        const selectedOption = question.options?.find((opt) => opt.value === answer)
        return selectedOption?.score || 0
      } else if (question.type === "text" && question.textMaxScore) {
        const textAnswer = answer as string || ""
        const textQuality = validateTextAnswer(textAnswer, question)
        return textQuality.score
      }
      return 0
    })

    // Check for low quality text answers
    const textQualityResults: TextQualityResult[] = []
    let hasLowQuality = false
    let gibberishCount = 0
    
    answers.forEach((answer, index) => {
      const question = quizQuestions[index]
      if (question.type === "text" && question.textMaxScore) {
        const textAnswer = answer as string || ""
        const textQuality = validateTextAnswer(textAnswer, question)
        textQualityResults.push(textQuality)
        if (textQuality.isLowQuality) {
          hasLowQuality = true
        }
        // Count gibberish and empty responses specifically
        if (textQuality.issues.some(issue => issue.includes("gibberish") || issue.includes("placeholder") || issue.includes("No response provided"))) {
          gibberishCount++
        }
      }
    })

    setHasLowQualityText(hasLowQuality)
    if (hasLowQuality) {
      setTextQualityIssues(["Text-based answers did not provide enough data for optimal scoring"])
    }

    const totalRawScore = rawScoresPerQuestion.reduce((sum, score) => sum + score, 0)
    let scaledScore = MAX_RAW_SCORE > 0 ? Math.round((totalRawScore / MAX_RAW_SCORE) * 100) : 0
    
    // If 2 or more gibberish answers detected, set score to 0
    if (gibberishCount >= 2) {
      scaledScore = 0
      setTextQualityIssues(["Multiple low-quality responses detected - score set to 0"])
    }
    
    setFinalRaiseScore(Math.min(Math.max(scaledScore, 0), 100)) // Ensure score is between 0-100

    const catScores = calculateCategoryScores(answers, quizQuestions)
    setCategoryScores(catScores)
    setTopTips(getTopTips(catScores))
    setShowEmailStep(true)
  }

  const handleAnswerSelect = (value: string | number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = value
    setAnswers(newAnswers)

    if (currentQuestion.type === "multiple-choice" || currentQuestion.type === "dropdown") {
      setTimeout(() => {
        handleNextQuestion()
      }, 200)
    }
  }

  const handleTextChange = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = value
    setAnswers(newAnswers)
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      alert("PLEASE ENTER YOUR EMAIL.")
      return
    }
    setIsSubmittingEmail(true)
    console.log("Submitting Quiz Data:", {
      email,
      finalRaiseScore,
      answers: answers.map((ans, idx) => ({ question: quizQuestions[idx].questionText, answer: ans })),
      categoryScores,
      topTips,
    })
    await new Promise((resolve) => setTimeout(resolve, 700))
    setIsSubmittingEmail(false)
    setQuizCompleted(true)
    setShowEmailStep(false)
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers(new Array(quizQuestions.length).fill(null))
    setQuizCompleted(false)
    setShowEmailStep(false)
    setEmail("")
    setFinalRaiseScore(0)
    setCategoryScores([])
    setTopTips([])
    setTextQualityIssues([])
    setHasLowQualityText(false)
  }

  const [animatedText, setAnimatedText] = useState("SYSTEM ONLINE. AWAITING INPUT...")
  useEffect(() => {
    if (quizCompleted || showEmailStep) return
    const texts = [
      "ANALYZING YOUR RESPONSES...",
      "CALCULATING POTENTIAL...",
      "EVALUATING FUNDABILITY FACTORS...",
      "CROSS-REFERENCING BEST PRACTICES...",
      "GENERATING YOUR RAISE SCORE™...",
    ]
    setAnimatedText(texts[currentQuestionIndex % texts.length])
  }, [currentQuestionIndex, quizCompleted, showEmailStep])

  if (quizCompleted) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 md:p-10 bg-foreground text-background rounded-none shadow-2xl border border-background/30">
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-7xl font-black text-accent mb-1 tracking-tightest">
            {finalRaiseScore}
            <span className="text-4xl md:text-5xl text-background/70">/100</span>
          </h2>
          <p className="text-lg text-background/80 mb-2 uppercase tracking-wider">YOUR RAISE SCORE™</p>
          <p className="text-sm text-background/70 mb-6">{getRaiseScoreInterpretation(finalRaiseScore)}</p>
        </div>

        <div className="bg-background/5 p-4 md:p-6 rounded-none mb-6 border-y border-background/20">
          <h3 className="text-base font-semibold text-accent mb-3 uppercase tracking-wider">Category Insights:</h3>
          {categoryScores.map((cat) => (
            <div key={cat.name} className="mb-2">
              <div className="flex justify-between text-xs uppercase tracking-wider text-background/80 mb-1">
                <span>{cat.name}</span>
                <span>
                  {cat.score}/{cat.maxScore > 0 ? cat.maxScore : "N/A"}{" "}
                  <span className="text-background/60">{cat.maxScore > 0 ? "raw pts" : ""}</span>
                </span>
              </div>
              {cat.maxScore > 0 && (
                <Progress
                  value={(cat.score / cat.maxScore) * 100}
                  className="h-1.5 bg-background/20 [&>div]:bg-accent"
                />
              )}
            </div>
          ))}
          <p className="text-xs text-background/60 mt-3 italic">
            Note: Text-based answers now contribute to your automated score for enhanced accuracy.
          </p>
          {hasLowQualityText && (
            <p className="text-xs text-background/50 mt-2 italic">
              {textQualityIssues.join(". ")}
            </p>
          )}
        </div>

        <div className="bg-background/5 p-4 md:p-6 rounded-none mb-8 border-y border-background/20">
          <h3 className="text-base font-semibold text-accent mb-4 uppercase tracking-wider">
            Top 3 Tips to Boost Your Score:
          </h3>
          <ul className="space-y-2 text-background/90">
            {topTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="w-3 h-3 text-accent mr-2 mt-1 flex-shrink-0" />
                <span className="text-xs uppercase tracking-wide">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-lg font-bold text-accent mb-2 uppercase tracking-wider">Ready for a Deeper Dive?</h3>
          <p className="text-sm text-background/80 mb-4">
            Unlock your full 40-Point Startup Audit & Personalized Roadmap.
          </p>
          <Button asChild size="lg" className={`${accentButtonClass} w-full sm:w-auto group text-sm py-4 mb-3`}>
            <Link href="/contact?service=audit150&serviceName=150%20Audit%20%26%20Roadmap">
              GET MY $150 AUDIT & ROADMAP{" "}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="text-xs text-background/70 mb-1">Or,</p>
          <Button
            asChild
            variant="link"
            className="text-accent hover:text-accent/80 text-xs uppercase tracking-wider p-0 h-auto"
          >
            <Link href="/contact?service=strategistCall15Min&serviceName=Free%2015-Min%20Strategist%20Call">
              Book a Free 15-Min Strategist Call
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            variant="outline"
            size="lg"
            onClick={resetQuiz}
            className={`${outlineButtonClass} w-full sm:w-auto group text-sm py-4`}
          >
            <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-[-90deg] transition-transform" /> RETAKE QUIZ
          </Button>
        </div>
        <div className="flex items-start text-xs text-background/60 p-3 bg-background/5 border border-background/10 rounded-none">
          <Info className="w-5 h-5 mr-2 mt-0.5 text-accent flex-shrink-0" />
          <span>
            Your quiz answers are confidential and used only to generate your Raise Score™. For deeper engagements, NDAs
            are available.
          </span>
        </div>
      </div>
    )
  }

  if (showEmailStep) {
    return (
      <div className="w-full max-w-md mx-auto p-6 md:p-10 bg-foreground text-background rounded-none shadow-2xl border border-background/30">
        <h2 className="text-2xl font-black text-center text-accent mb-2 uppercase tracking-wider">FINAL STEP</h2>
        <p className="text-center text-background/80 mb-6 text-sm">
          ENTER EMAIL TO VIEW YOUR RAISE SCORE™ & GET INSIGHTS.
        </p>
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="sr-only">
              EMAIL
            </Label>
            <div className="relative">
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-background text-background placeholder:text-background/50 focus:ring-accent focus:border-accent block w-full pl-10 pr-3 py-3 text-sm uppercase tracking-wider rounded-none"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-background/50" />
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className={`${accentButtonClass} w-full group text-sm py-4`}
            disabled={isSubmittingEmail}
          >
            {isSubmittingEmail ? "CALCULATING..." : "VIEW MY SCORE & INSIGHTS"}{" "}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
        <p className="text-xs text-background/50 text-center mt-4 uppercase tracking-wider">
          YOUR PRIVACY IS RESPECTED. SCORE IS CONFIDENTIAL.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 bg-foreground text-background rounded-none shadow-xl border-x border-b border-background/30">
      <div className="mb-6 md:mb-8 text-center">
        <p className="text-xs uppercase tracking-widest text-accent mb-2">
          QUESTION {currentQuestionIndex + 1} / {quizQuestions.length}
        </p>
        <Progress value={progressValue} className="h-1 bg-background/20 [&>div]:bg-accent" />
        <p className="text-xs text-background/60 mt-2 h-4 uppercase tracking-wider">{animatedText}</p>
      </div>
      <h3 className="text-xl md:text-3xl font-bold text-center text-background mb-8 md:mb-10 min-h-[3em] uppercase tracking-wide leading-tight">
        {currentQuestion.questionText}
      </h3>

      {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
        <RadioGroup
          onValueChange={(value) => handleAnswerSelect(value)}
          value={answers[currentQuestionIndex] as string | undefined}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
        >
          {currentQuestion.options.map((option, index) => {
            if (!option || typeof option.value === "undefined" || typeof option.text === "undefined") {
              if (process.env.NODE_ENV === "development") {
                console.error(`Invalid option found at index ${index} for question ID ${currentQuestion.id}:`, option)
              }
              return null
            }
            return (
              <Label
                key={option.value.toString()}
                htmlFor={`q${currentQuestion.id}-o${option.value}`}
                className={cn(
                  "flex flex-col items-center justify-center p-4 md:p-5 min-h-[80px] border border-background/30 rounded-none cursor-pointer transition-all duration-150 ease-in-out", // Adjusted min-h
                  "text-xs uppercase tracking-wider font-medium text-center", // Ensure text is centered
                  answers[currentQuestionIndex] === option.value
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-transparent text-background/80 hover:bg-background/10 hover:border-background/50",
                )}
              >
                <RadioGroupItem // This is the actual radio button, hidden by sr-only but still part of the label
                  value={option.value.toString()}
                  id={`q${currentQuestion.id}-o${option.value}`}
                  className="sr-only"
                />
                <span // This span is for the main option text
                  className={cn(
                    "font-semibold",
                    answers[currentQuestionIndex] === option.value ? "text-accent-foreground" : "text-background",
                  )}
                >
                  {option.text}
                </span>
                {option.subtitle && (
                  <span // This span is for the subtitle text
                    className={cn(
                      "text-xs mt-2 leading-relaxed",
                      answers[currentQuestionIndex] === option.value 
                        ? "text-accent-foreground/70" 
                        : "text-background/70",
                    )}
                  >
                    {option.subtitle}
                  </span>
                )}
              </Label>
            )
          })}
        </RadioGroup>
      )}

      {currentQuestion.type === "text" && (
        <div className="space-y-4">
          <Textarea
            placeholder={currentQuestion.placeholder}
            value={(answers[currentQuestionIndex] as string) || ""}
            onChange={(e) => handleTextChange(e.target.value)}
            maxLength={currentQuestion.characterLimit}
            rows={currentQuestion.rows || 3}
            className="bg-transparent border-background/50 text-background placeholder:text-background/50 focus:ring-accent focus:border-accent w-full p-3 text-sm rounded-none"
          />
          {currentQuestion.characterLimit && (
            <p className="text-xs text-right text-background/60">
              {((answers[currentQuestionIndex] as string) || "").length} / {currentQuestion.characterLimit} characters
            </p>
          )}
          <Button onClick={handleNextQuestion} className={`${accentButtonClass} w-full sm:w-auto group text-sm`}>
            Next <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}

      {currentQuestion.type === "dropdown" && currentQuestion.options && (
        <div className="flex flex-col items-center space-y-4">
          <Select
            onValueChange={(value) => handleAnswerSelect(value)}
            value={answers[currentQuestionIndex] as string | undefined}
          >
            <SelectTrigger className="w-full max-w-xs bg-transparent border-background/50 text-background placeholder:text-background/50 focus:ring-accent focus:border-accent rounded-none text-sm uppercase tracking-wider py-3">
              <SelectValue placeholder={currentQuestion.options[0]?.text || "Select an option"} />
            </SelectTrigger>
            <SelectContent className="bg-foreground border-background/50 text-background rounded-none">
              {currentQuestion.options
                .filter((opt) => opt.value !== "")
                .map((option) => (
                  <SelectItem
                    key={option.value.toString()}
                    value={option.value.toString()}
                    className="hover:bg-accent/20 focus:bg-accent/30 text-sm uppercase tracking-wider"
                  >
                    {option.text}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-xs text-background/50 uppercase tracking-wider">
          {currentQuestion.type === "text" ? "Click Next to proceed." : "Select an option to proceed."}
        </p>
      </div>
    </div>
  )
}
