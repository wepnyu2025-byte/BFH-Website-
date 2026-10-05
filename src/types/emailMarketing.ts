export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
  source: string;
  status: 'ACTIVE' | 'UNSUBSCRIBED';
}

export interface BroadcastPayload {
  subject: string;
  previewText?: string;
  headline?: string;
  body: string;
  imageUrl?: string;
  buttonLabel?: string;
  buttonLink?: string;
}

export interface BroadcastRecord {
  id: string;
  subject: string;
  recipientCount: number;
  sentAt: string;
  status: 'SENT' | 'FAILED' | 'TEST';
  testRecipient?: string;
  error?: string;
}
