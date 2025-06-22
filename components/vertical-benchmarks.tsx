"use client"

interface VerticalBenchmarksProps {
  vertical: any
  verticalKey: string
}

export function VerticalBenchmarks({ vertical, verticalKey }: VerticalBenchmarksProps) {
  const isParticipating = vertical.yourRank !== "N/A"

  const benchmarkCategories = {
    fintech: [
      {
        category: "Transaction Processing",
        weight: 25,
        yourScore: 92,
        industryAvg: 78.4,
        topPerformer: 95,
        metrics: [
          { name: "Processing Speed", your: "145ms", avg: "234ms", top: "98ms", unit: "milliseconds" },
          { name: "Success Rate", your: "99.7%", avg: "97.8%", top: "99.9%", unit: "percentage" },
          { name: "Throughput", your: "2,847/s", avg: "1,456/s", top: "3,200/s", unit: "requests/sec" },
          { name: "Error Rate", your: "0.8%", avg: "1.9%", top: "0.3%", unit: "percentage" },
        ],
      },
      {
        category: "Security & Compliance",
        weight: 30,
        yourScore: 96,
        industryAvg: 84.2,
        topPerformer: 98,
        metrics: [
          { name: "Security Score", your: "96/100", avg: "84/100", top: "98/100", unit: "score" },
          { name: "Compliance Rate", your: "98%", avg: "89%", top: "100%", unit: "percentage" },
          { name: "Audit Pass Rate", your: "100%", avg: "92%", top: "100%", unit: "percentage" },
          { name: "Incident Response", your: "15min", avg: "45min", top: "8min", unit: "minutes" },
        ],
      },
      {
        category: "Customer Experience",
        weight: 20,
        yourScore: 88,
        industryAvg: 76.8,
        topPerformer: 94,
        metrics: [
          { name: "App Rating", your: "4.8/5", avg: "4.2/5", top: "4.9/5", unit: "rating" },
          { name: "Support Response", your: "2.3min", avg: "8.7min", top: "1.8min", unit: "minutes" },
          { name: "Onboarding Time", your: "3.2min", avg: "12.4min", top: "2.1min", unit: "minutes" },
          { name: "Customer Satisfaction", your: "94%", avg: "82%", top: "97%", unit: "percentage" },
        ],
      },
      {
        category: "Innovation & Technology",
        weight: 15,
        yourScore: 85,
        industryAvg: 71.3,
        topPerformer: 91,
        metrics: [
          { name: "API Coverage", your: "95%", avg: "78%", top: "98%", unit: "percentage" },
          { name: "Feature Velocity", your: "2.3/week", avg: "1.1/week", top: "2.8/week", unit: "releases" },
          { name: "Tech Debt Ratio", your: "12%", avg: "28%", top: "8%", unit: "percentage" },
          { name: "Innovation Index", your: "87/100", avg: "64/100", top: "93/100", unit: "score" },
        ],
      },
      {
        category: "Business Performance",
        weight: 10,
        yourScore: 91,
        industryAvg: 73.6,
        topPerformer: 96,
        metrics: [
          { name: "Revenue Growth", your: "28.7%", avg: "18.2%", top: "34.5%", unit: "percentage" },
          { name: "Customer Growth", your: "23.4%", avg: "15.8%", top: "29.1%", unit: "percentage" },
          { name: "Market Share", your: "2.1%", avg: "0.8%", top: "4.7%", unit: "percentage" },
          { name: "Profitability", your: "18.5%", avg: "12.3%", top: "22.8%", unit: "percentage" },
        ],
      },
    ],
    ecommerce: [
      {
        category: "Platform Performance",
        weight: 30,
        yourScore: 84,
        industryAvg: 72.1,
        topPerformer: 91,
        metrics: [
          { name: "Page Load Speed", your: "1.8s", avg: "2.4s", top: "1.2s", unit: "seconds" },
          { name: "Uptime", your: "99.91%", avg: "99.76%", top: "99.98%", unit: "percentage" },
          { name: "Mobile Performance", your: "94/100", avg: "78/100", top: "97/100", unit: "score" },
          { name: "API Response Time", your: "178ms", avg: "267ms", top: "134ms", unit: "milliseconds" },
        ],
      },
      {
        category: "Conversion & Sales",
        weight: 25,
        yourScore: 79,
        industryAvg: 68.4,
        topPerformer: 87,
        metrics: [
          { name: "Conversion Rate", your: "3.8%", avg: "2.9%", top: "4.7%", unit: "percentage" },
          { name: "Cart Abandonment", your: "67.2%", avg: "71.4%", top: "58.9%", unit: "percentage" },
          { name: "Average Order Value", your: "$127", avg: "$98", top: "$156", unit: "dollars" },
          { name: "Checkout Success", your: "98.7%", avg: "94.2%", top: "99.3%", unit: "percentage" },
        ],
      },
      {
        category: "Customer Experience",
        weight: 20,
        yourScore: 82,
        industryAvg: 74.8,
        topPerformer: 89,
        metrics: [
          { name: "Customer Satisfaction", your: "4.6/5", avg: "4.1/5", top: "4.8/5", unit: "rating" },
          { name: "Return Rate", your: "8.2%", avg: "12.7%", top: "6.1%", unit: "percentage" },
          { name: "Support Response", your: "4.2min", avg: "12.8min", top: "2.7min", unit: "minutes" },
          { name: "Personalization Score", your: "87/100", avg: "64/100", top: "94/100", unit: "score" },
        ],
      },
      {
        category: "Security & Compliance",
        weight: 15,
        yourScore: 76,
        industryAvg: 71.2,
        topPerformer: 93,
        metrics: [
          { name: "Security Score", your: "89/100", avg: "78/100", top: "96/100", unit: "score" },
          { name: "PCI Compliance", your: "89%", avg: "82%", top: "100%", unit: "percentage" },
          { name: "Data Protection", your: "92%", avg: "85%", top: "98%", unit: "percentage" },
          { name: "Fraud Detection", your: "97.8%", avg: "93.4%", top: "99.2%", unit: "percentage" },
        ],
      },
      {
        category: "Innovation & Growth",
        weight: 10,
        yourScore: 73,
        industryAvg: 65.9,
        topPerformer: 84,
        metrics: [
          { name: "Feature Adoption", your: "67%", avg: "54%", top: "78%", unit: "percentage" },
          { name: "Market Expansion", your: "12%", avg: "8%", top: "18%", unit: "percentage" },
          {
