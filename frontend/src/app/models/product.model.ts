export interface Product {
  id?: number;
  creatorId: number;
  name?: string;
  type?: string;
  stage: string;      // development, test, launch
  devDone: boolean;
  testDone: boolean;
  launchDone: boolean;
  problemNotes?: string;
  revenue: number;
  customers: number;
  isLive: boolean;
}

export interface ChecklistItem {
  id?: number;
  productId: number;
  phase: string;
  text: string;
  done: boolean;
}
