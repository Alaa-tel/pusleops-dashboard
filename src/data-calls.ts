import type { IncomingCall } from './types-call'

export const incomingCalls: IncomingCall[] = [
  {
    id: 'CALL-001',
    callerName: 'Amira Collins',
    phoneNumber: '+1 (555) 234-5601',
    clientId: 'CLI-4521',
    likelyReason: 'Contribution confirmation status',
    relatedCaseId: 'CASE-001',
    riskFlags: ['High Value Client', 'SLA Risk'],
    timestamp: new Date(),
  },
  {
    id: 'CALL-002',
    callerName: 'Daniel Wright',
    phoneNumber: '+1 (555) 567-8902',
    clientId: 'CLI-3847',
    likelyReason: 'Grant application follow-up',
    relatedCaseId: 'CASE-002',
    riskFlags: ['Overdue Documents'],
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: 'CALL-003',
    callerName: 'Sofia Ramirez',
    phoneNumber: '+1 (555) 890-1234',
    clientId: 'CLI-6789',
    likelyReason: 'Account update inquiry',
    riskFlags: [],
    timestamp: new Date(Date.now() - 15 * 60000),
  },
  {
    id: 'CALL-004',
    callerName: 'James Patterson',
    phoneNumber: '+1 (555) 345-6789',
    clientId: 'CLI-4412',
    likelyReason: 'Compliance review deadline',
    relatedCaseId: 'CASE-006',
    riskFlags: ['Compliance Flag', 'Regulatory Deadline'],
    timestamp: new Date(Date.now() - 30 * 60000),
  },
]
