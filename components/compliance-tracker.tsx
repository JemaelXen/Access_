"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, AlertTriangle, XCircle, Clock, FileText, Award } from "lucide-react"

interface ComplianceTrackerProps {
  vertical: any
  verticalKey: string
}

export function ComplianceTracker({ vertical, verticalKey }: ComplianceTrackerProps) {
  const isParticipating = vertical.yourRank !== "N/A"

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-green-300"
    if (compliance >= 85) return "text-yellow-300"
    if (compliance >= 70) return "text-orange-300"
    return "text-red-300"
  }

  const getComplianceIcon = (compliance: number) => {
    if (compliance >= 95) return <CheckCircle className="w-4 h-4 text-green-400" />
    if (compliance >= 85) return <AlertTriangle className="w-4 h-4 text-yellow-400" />
    if (compliance >= 70) return <Clock className="w-4 h-4 text-orange-400" />
    return <XCircle className="w-4 h-4 text-red-400" />
  }

  const complianceDetails = {
    fintech: {
      "PCI DSS": {
        description: "Payment Card Industry Data Security Standard",
        requirements: ["Secure network", "Cardholder data protection", "Vulnerability management", "Access control"],
        lastAudit: "2024-01-15",
        nextAudit: "2024-07-15",
        certificationLevel: "Level 1",
        auditor: "QSA Certified",
      },
      SOX: {
        description: "Sarbanes-Oxley Act compliance for financial reporting",
        requirements: ["Internal controls", "Financial reporting", "Audit trails", "Executive certification"],
        lastAudit: "2023-12-31",
        nextAudit: "2024-12-31",
        certificationLevel: "Full Compliance",
        auditor: "Big Four Firm",
      },
      GDPR: {
        description: "General Data Protection Regulation for EU data privacy",
        requirements: ["Data consent", "Right to erasure", "Data portability", "Privacy by design"],
        lastAudit: "2024-01-20",
        nextAudit: "2025-01-20",
        certificationLevel: "Certified",
        auditor: "Privacy Specialist",
      },
      PSD2: {
        description: "Payment Services Directive 2 for open banking",
        requirements: ["Strong authentication", "API standards", "Customer consent", "Fraud monitoring"],
        lastAudit: "2024-01-10",
        nextAudit: "2024-07-10",
        certificationLevel: "Compliant",
        auditor: "Financial Authority",
      },
      "Basel III": {
        description: "International banking regulations for capital adequacy",
        requirements: ["Capital ratios", "Liquidity coverage", "Risk management", "Stress testing"],
        lastAudit: "2023-11-30",
        nextAudit: "2024-11-30",
        certificationLevel: "Advisory",
        auditor: "Risk Consultant",
      },
    },
    ecommerce: {
      "PCI DSS": {
        description: "Payment Card Industry Data Security Standard",
        requirements: ["Secure payment processing", "Data encryption", "Network security", "Regular testing"],
        lastAudit: "2024-01-12",
        nextAudit: "2024-07-12",
        certificationLevel: "Level 2",
        auditor: "QSA Certified",
      },
      GDPR: {
        description: "General Data Protection Regulation for customer data",
        requirements: ["Customer consent", "Data processing records", "Breach notification", "DPO appointment"],
        lastAudit: "2024-01-18",
        nextAudit: "2025-01-18",
        certificationLevel: "Certified",
        auditor: "Privacy Consultant",
      },
      CCPA: {
        description: "California Consumer Privacy Act compliance",
        requirements: ["Privacy notices", "Consumer rights", "Data deletion", "Opt-out mechanisms"],
        lastAudit: "2024-01-08",
        nextAudit: "2025-01-08",
        certificationLevel: "Compliant",
        auditor: "Legal Specialist",
      },
      "Consumer Protection": {
        description: "Consumer protection laws and regulations",
        requirements: ["Fair pricing", "Clear terms", "Dispute resolution", "Refund policies"],
        lastAudit: "2024-01-05",
        nextAudit: "2024-07-05",
        certificationLevel: "Certified",
        auditor: "Consumer Affairs",
      },
      "Tax Compliance": {
        description: "Multi-jurisdiction tax compliance",
        requirements: ["Sales tax collection", "VAT compliance", "Tax reporting", "Nexus management"],
        lastAudit: "2023-12-31",
        nextAudit: "2024-12-31",
        certificationLevel: "Compliant",
        auditor: "Tax Advisor",
      },
    },
  }

  const upcomingDeadlines = [
    { framework: "PCI DSS", deadline: "2024-07-15", daysLeft: 45, priority: "High" },
    { framework: "SOX", deadline: "2024-12-31", daysLeft: 234, priority: "Medium" },
    { framework: "GDPR", deadline: "2025-01-20", daysLeft: 254, priority: "Low" },
  ]

  const complianceGaps = [
    {
      framework: "Basel III",
      gap: "Stress testing documentation",
      impact: "Medium",
      effort: "High",
      deadline: "2024-06-30",
    },
    {
      framework: "PSD2",
      gap: "API monitoring enhancements",
      impact: "Low",
      effort: "Medium",
      deadline: "2024-05-15",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Regulatory Compliance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vertical.regulatoryFrameworks.map((framework: any, index: number) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getComplianceIcon(framework.compliance)}
                    <h3 className="font-medium text-white">{framework.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {framework.required && (
                      <Badge className="bg-red-500/20 border-red-400 text-red-300 text-xs">Required</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Compliance Level</span>
                    <span className={`font-medium ${getComplianceColor(framework.compliance)}`}>
                      {framework.compliance === 0 ? "Not Applicable" : `${framework.compliance}%`}
                    </span>
                  </div>

                  {framework.compliance > 0 && (
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          framework.compliance >= 95
                            ? "bg-green-500"
                            : framework.compliance >= 85
                              ? "bg-yellow-500"
                              : framework.compliance >= 70
                                ? "bg-orange-500"
                                : "bg-red-500"
                        }`}
                        style={{ width: `${framework.compliance}%` }}
                      />
                    </div>
                  )}
                </div>

                {framework.compliance > 0 && (
                  <Button size="sm" variant="outline" className="w-full mt-3 border-blue-400 text-blue-300">
                    View Details
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Compliance Status */}
      {isParticipating && complianceDetails[verticalKey as keyof typeof complianceDetails] && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Detailed Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(complianceDetails[verticalKey as keyof typeof complianceDetails]).map(
                ([framework, details]: [string, any]) => (
                  <div key={framework} className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{framework}</h3>
                        <p className="text-sm text-gray-400">{details.description}</p>
                      </div>
                      <Badge className="bg-green-500/20 border-green-400 text-green-300">
                        <Award className="w-3 h-3 mr-1" />
                        {details.certificationLevel}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-blue-300 mb-2">Key Requirements</h4>
                        <ul className="space-y-1">
                          {details.requirements.map((req: string, reqIndex: number) => (
                            <li key={reqIndex} className="text-sm text-gray-300 flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Last Audit:</span>
                          <span className="text-sm text-white">{details.lastAudit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Next Audit:</span>
                          <span className="text-sm text-white">{details.nextAudit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Auditor:</span>
                          <span className="text-sm text-white">{details.auditor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-400 text-green-300">
                        <FileText className="w-3 h-3 mr-1" />
                        View Certificate
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-400 text-blue-300">
                        <Clock className="w-3 h-3 mr-1" />
                        Schedule Audit
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Deadlines */}
      {isParticipating && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Compliance Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        deadline.priority === "High"
                          ? "bg-red-400"
                          : deadline.priority === "Medium"
                            ? "bg-yellow-400"
                            : "bg-green-400"
                      }`}
                    />
                    <div>
                      <h3 className="font-medium text-white">{deadline.framework}</h3>
                      <p className="text-sm text-gray-400">Due: {deadline.deadline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{deadline.daysLeft} days</p>
                    <Badge
                      className={
                        deadline.priority === "High"
                          ? "bg-red-500/20 border-red-400 text-red-300"
                          : deadline.priority === "Medium"
                            ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                            : "bg-green-500/20 border-green-400 text-green-300"
                      }
                    >
                      {deadline.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Gaps */}
      {isParticipating && complianceGaps.length > 0 && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Compliance Gaps & Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceGaps.map((gap, index) => (
                <div key={index} className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-white">{gap.framework}</h3>
                      <p className="text-sm text-gray-300">{gap.gap}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        className={
                          gap.impact === "High"
                            ? "bg-red-500/20 border-red-400 text-red-300"
                            : gap.impact === "Medium"
                              ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                              : "bg-green-500/20 border-green-400 text-green-300"
                        }
                      >
                        {gap.impact} Impact
                      </Badge>
                      <Badge
                        className={
                          gap.effort === "High"
                            ? "bg-red-500/20 border-red-400 text-red-300"
                            : gap.effort === "Medium"
                              ? "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                              : "bg-green-500/20 border-green-400 text-green-300"
                        }
                      >
                        {gap.effort} Effort
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Target Date: {gap.deadline}</span>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      Create Action Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Industry Compliance Benchmarks */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            Industry Compliance Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-300 mb-3">Top Performers</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-green-500/10 rounded">
                  <span className="text-white">Average Compliance Score</span>
                  <span className="text-green-300">96.8%</span>
                </div>
                <div className="flex justify-between p-2 bg-green-500/10 rounded">
                  <span className="text-white">Audit Pass Rate</span>
                  <span className="text-green-300">98.2%</span>
                </div>
                <div className="flex justify-between p-2 bg-green-500/10 rounded">
                  <span className="text-white">Time to Compliance</span>
                  <span className="text-green-300">3.2 months</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-blue-300 mb-3">Industry Average</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-blue-500/10 rounded">
                  <span className="text-white">Average Compliance Score</span>
                  <span className="text-blue-300">89.4%</span>
                </div>
                <div className="flex justify-between p-2 bg-blue-500/10 rounded">
                  <span className="text-white">Audit Pass Rate</span>
                  <span className="text-blue-300">91.7%</span>
                </div>
                <div className="flex justify-between p-2 bg-blue-500/10 rounded">
                  <span className="text-white">Time to Compliance</span>
                  <span className="text-blue-300">5.8 months</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
