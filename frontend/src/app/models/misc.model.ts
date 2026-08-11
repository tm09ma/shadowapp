export interface Settings {
  id: number;
  fuFirstDays: number;
  fuSecondDays: number;
  fuThirdEnabled: boolean;
  fuThirdDays: number;
  leadsPerDay: number;
  rejectAfterDays: number;
  whopApiKey?: string;
  darkMode: boolean;
  language: string;
}

export interface DailyGoal {
  id?: number;
  type: string;       // dms, engagement, followups, journal, custom
  label: string;
  autoTracked: boolean;
  sortOrder: number;
}

export interface Call {
  id?: number;
  creatorId: number;
  callNumber: number;
  label?: string;
  scheduledAt?: string;
  completed: boolean;
  notes?: string;
}

export interface JournalEntry {
  id?: number;
  title?: string;
  body?: string;
  wentWell?: string;
  blocked?: string;
  tomorrow?: string;
  entryDate?: string;
}

export interface ChatMessage {
  id?: number;
  role: string;
  content: string;
  createdAt?: string;
}
