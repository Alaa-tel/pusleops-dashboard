export interface IncomingCall {
  id: string
  callerName: string
  phoneNumber: string
  clientId: string
  likelyReason: string
  relatedCaseId?: string
  riskFlags: string[]
  timestamp: Date
}

export interface ActiveCall extends IncomingCall {
  callStartTime: Date
  notes: string
}
