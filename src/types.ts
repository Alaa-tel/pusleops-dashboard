export type CaseStatus = 'New' | 'In progress' | 'Waiting on client' | 'Waiting on internal team' | 'Escalated' | 'Ready to close'

export type CaseType = 'Contribution issue' | 'Grant request' | 'Account update' | 'Document review' | 'Advisor follow-up' | 'Compliance review' | 'Donor question'

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'none'

export interface Case {
  id: string
  clientName: string
  clientId: string
  caseType: CaseType
  status: CaseStatus
  slaHours: number
  hoursRemaining: number
  lastActivity: string
  lastActivityTime: string
  riskLevel: RiskLevel
  recommendedAction: string
  notes?: string
  priority: number
  reopened: boolean
  highValue: boolean
  complianceFlag: boolean
  noActivityDays: number
}

export interface MorningBriefMetric {
  label: string
  value: number | string
  change?: number
  trend?: 'up' | 'down' | 'stable'
}

export interface Communication {
  id: string
  type: 'email' | 'note'
  from: string
  subject: string
  timestamp: string
  unread: boolean
  relatedCaseId?: string
}

export interface WorkloadMetric {
  status: CaseStatus
  count: number
}
