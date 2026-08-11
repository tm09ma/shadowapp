export interface Creator {
  id?: number;
  handle: string;
  niche: string;
  followers: number;
  stage: string;      // engage, dm_ready, dm_sent, replied, call_booked, won, lost, rejected
  inVault: boolean;
  dmVersion?: string;
  dmSentText?: string;
  dmSentAt?: string;
  replied: boolean;
  repliedAt?: string;
  fu1SentAt?: string;
  fu2SentAt?: string;
  fu3SentAt?: string;
  exchangeCount: number;
  lastExchangeAt?: string;
  addedAt: string;
}

export interface CreatorDto {
  handle: string;
  niche?: string;
  followers?: number;
}
