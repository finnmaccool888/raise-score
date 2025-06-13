export type QuestionType = "multiple-choice" | "text" | "dropdown"

export interface QuizOption {
  text: string
  value: string | number // For multiple-choice value or dropdown value
  score?: number // Score for this specific option if applicable
}

export interface QuizQuestion {
  id: number
  questionText: string
  type: QuestionType
  category:
    | "Stage & Progress"
    | "Problem & Solution"
    | "Market & Business Model"
    | "Team"
    | "Competitive Advantage"
    | "Funding Needs"
  options?: QuizOption[] // For multiple-choice and dropdown
  placeholder?: string // For text inputs
  characterLimit?: number // For text inputs
  rows?: number // For textarea
  maxCategoryRawScore?: number // Max raw score for this question's category contribution
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionText: "What stage is your startup currently in?",
    type: "multiple-choice",
    category: "Stage & Progress",
    maxCategoryRawScore: 10,
    options: [
      { text: "Idea", value: "idea", score: 2 },
      { text: "Prototype", value: "prototype", score: 4 },
      { text: "MVP (Minimum Viable Product)", value: "mvp", score: 6 },
      { text: "Launched (Early Users/Revenue)", value: "launched", score: 8 },
      { text: "Scaling (Consistent Growth)", value: "scaling", score: 10 },
    ],
  },
  {
    id: 2,
    questionText: "What problem does your startup solve? (2-3 sentences)",
    type: "text",
    category: "Problem & Solution",
    placeholder:
      "e.g., We help remote teams overcome communication silos by providing an integrated async collaboration platform...",
    characterLimit: 300,
    rows: 3,
  },
  {
    id: 3,
    questionText: "Who is your target customer? (1-2 sentences)",
    type: "text",
    category: "Problem & Solution",
    placeholder: "e.g., Our target customers are mid-sized SaaS companies struggling with high churn rates...",
    characterLimit: 200,
    rows: 2,
  },
  {
    id: 4,
    questionText: "What is your product or service? (2-3 sentences)",
    type: "text",
    category: "Problem & Solution",
    placeholder: "e.g., We offer a subscription-based web application that uses AI to analyze customer feedback...",
    characterLimit: 300,
    rows: 3,
  },
  {
    id: 5,
    questionText: "What traction have you achieved?",
    type: "multiple-choice",
    category: "Stage & Progress",
    maxCategoryRawScore: 10,
    options: [
      { text: "None / Pre-launch", value: "none", score: 0 },
      { text: "<100 Users / Sign-ups", value: "users_lt_100", score: 4 },
      { text: "$1K - $10K in Revenue (or equivalent significant user metric)", value: "rev_1k_10k", score: 7 },
      { text: ">$10K in Revenue (or equivalent strong user metric)", value: "rev_gt_10k", score: 10 },
    ],
  },
  {
    id: 6,
    questionText: "Who is on your founding team? (List names and key skills/experience)",
    type: "text",
    category: "Team",
    placeholder: "e.g., Jane Doe (CEO, 10 yrs product mgmt), John Smith (CTO, ex-Google engineer)...",
    characterLimit: 400,
    rows: 4,
  },
  {
    id: 7,
    questionText: "How do you plan to make money?",
    type: "dropdown",
    category: "Market & Business Model",
    maxCategoryRawScore: 5,
    options: [
      { text: "Select Model...", value: "", score: 0 },
      { text: "Subscription (SaaS)", value: "subscription", score: 5 },
      { text: "Transaction Fees / Commission", value: "transaction", score: 5 },
      { text: "Freemium (with Paid Tiers)", value: "freemium", score: 5 },
      { text: "Marketplace", value: "marketplace", score: 5 },
      { text: "Advertising", value: "advertising", score: 3 }, // Slightly lower as can be harder
      { text: "Hardware Sales", value: "hardware", score: 5 },
      { text: "Services / Consulting", value: "services", score: 4 },
      { text: "Other / Not Sure Yet", value: "other", score: 1 },
    ],
  },
  {
    id: 8,
    questionText: "What is your estimated market size (TAM)?",
    type: "multiple-choice",
    category: "Market & Business Model",
    maxCategoryRawScore: 10,
    options: [
      { text: "< $10 Million", value: "tam_lt_10m", score: 3 },
      { text: "$10M - $100 Million", value: "tam_10m_100m", score: 7 },
      { text: "> $100 Million", value: "tam_gt_100m", score: 10 },
      { text: "Unsure / Not Researched", value: "tam_unsure", score: 0 },
    ],
  },
  {
    id: 9,
    questionText: "What sets you apart from competitors? (1-2 sentences)",
    type: "text",
    category: "Competitive Advantage",
    placeholder: "e.g., Our unique AI algorithm provides 50% more accurate predictions than existing solutions...",
    characterLimit: 200,
    rows: 2,
  },
  {
    id: 10,
    questionText: "How much capital are you seeking (if any)?",
    type: "multiple-choice",
    category: "Funding Needs",
    maxCategoryRawScore: 5,
    options: [
      { text: "< $100K (Pre-Seed / Angel)", value: "seek_lt_100k", score: 5 },
      { text: "$100K - $500K (Seed)", value: "seek_100k_500k", score: 5 },
      { text: "> $500K (Seed+ / Series A)", value: "seek_gt_500k", score: 5 },
      { text: "Not actively raising right now", value: "not_raising", score: 0 }, // Not raising is fine, but for "Raise Score" it means less immediate need for this score's purpose
    ],
  },
]

export const MAX_RAW_SCORE = quizQuestions.reduce((sum, q) => {
  if (q.type === "multiple-choice" || q.type === "dropdown") {
    const maxOptionScore = q.options?.reduce((max, opt) => Math.max(max, opt.score || 0), 0) || 0
    return sum + (maxOptionScore || 0)
  }
  return sum
}, 0) // This will be 10+10+5+10+5 = 40

export interface CategoryScore {
  score: number
  maxScore: number
  name: QuizQuestion["category"]
}

export const calculateCategoryScores = (
  answers: (string | number | null)[],
  questions: QuizQuestion[],
): CategoryScore[] => {
  const categoryData: Record<string, { current: number; max: number }> = {
    "Stage & Progress": { current: 0, max: 0 },
    "Problem & Solution": { current: 0, max: 0 }, // Not directly scored automatically
    "Market & Business Model": { current: 0, max: 0 },
    Team: { current: 0, max: 0 }, // Not directly scored automatically
    "Competitive Advantage": { current: 0, max: 0 }, // Not directly scored automatically
    "Funding Needs": { current: 0, max: 0 },
  }

  questions.forEach((q, index) => {
    if (q.type === "multiple-choice" || q.type === "dropdown") {
      const selectedValue = answers[index]
      const selectedOption = q.options?.find((opt) => opt.value === selectedValue)
      const score = selectedOption?.score || 0
      const maxOptionScore = q.options?.reduce((max, opt) => Math.max(max, opt.score || 0), 0) || 0

      if (categoryData[q.category]) {
        categoryData[q.category].current += score
        categoryData[q.category].max += maxOptionScore
      }
    }
    // For text questions, we don't add to automated score but acknowledge category
    else if (categoryData[q.category] && categoryData[q.category].max === 0) {
      // This indicates a text-only category, we can mark its max as 'N/A' or similar later
    }
  })

  return Object.entries(categoryData)
    .filter((entry) => entry[1].max > 0) // Only include categories that have scorable questions
    .map(([name, data]) => ({
      name: name as QuizQuestion["category"],
      score: data.current,
      maxScore: data.max,
    }))
}

export const getRaiseScoreInterpretation = (score: number): string => {
  if (score < 40) {
    return "You're at the foundational stage. Significant development across multiple areas will be key to unlocking investor interest."
  } else if (score < 60) {
    return "There's emerging potential! Focusing on strengthening your traction and market positioning will make a big difference."
  } else if (score < 80) {
    return "You're building a solid case. Refining your narrative and demonstrating clear differentiators can elevate you to the next level."
  } else {
    return "Strong fundability signals! Continue to execute and fine-tune your strategy to maintain momentum with investors."
  }
}

export const getTopTips = (categoryScores: CategoryScore[]): string[] => {
  const tips: string[] = []
  const sortedCategories = [...categoryScores].sort((a, b) => a.score / a.maxScore - b.score / b.maxScore)

  // Tip 1: Focus on the weakest scorable category
  if (sortedCategories.length > 0) {
    const weakest = sortedCategories[0]
    if (weakest.name === "Stage & Progress") {
      tips.push("Focus on achieving clear milestones for your current stage and demonstrating tangible traction.")
    } else if (weakest.name === "Market & Business Model") {
      tips.push("Deepen your market research and refine your business model for clarity and scalability.")
    } else if (weakest.name === "Funding Needs") {
      tips.push("Clearly articulate your funding requirements and how they tie to specific growth objectives.")
    } else {
      tips.push("Review your responses in the lowest scoring category to identify areas for improvement.")
    }
  } else {
    tips.push("Ensure all scorable sections of the quiz are completed to get tailored advice.")
  }

  // Tip 2: General advice
  tips.push("Craft a compelling narrative around your problem, solution, and team. Storytelling is key!")

  // Tip 3: Another general advice or based on second weakest
  if (sortedCategories.length > 1) {
    const secondWeakest = sortedCategories[1]
    if (secondWeakest.name === "Stage & Progress" && !tips.some((t) => t.includes("traction"))) {
      tips.push("Show, don't just tell. Quantify your progress with metrics wherever possible.")
    } else if (secondWeakest.name === "Market & Business Model" && !tips.some((t) => t.includes("market research"))) {
      tips.push("Validate your revenue model with early customer interactions or pilot programs.")
    } else {
      tips.push("Seek feedback on your pitch and business plan from mentors or advisors.")
    }
  } else {
    tips.push("Continuously validate your assumptions with real customer feedback and market data.")
  }

  // Ensure 3 tips
  const generalTips = [
    "Clearly define your unique value proposition and competitive advantages.",
    "Build a strong, complementary founding team with relevant experience.",
    "Develop a detailed financial model and understand your key metrics.",
  ]
  let tipIdx = 0
  while (tips.length < 3 && tipIdx < generalTips.length) {
    if (!tips.includes(generalTips[tipIdx])) {
      tips.push(generalTips[tipIdx])
    }
    tipIdx++
  }

  return tips.slice(0, 3)
}
