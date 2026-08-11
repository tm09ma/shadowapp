export interface DmVersion {
  id: string;         // V1..V5 oder "personal"
  label: string;
  text: string;
  status: string;     // ready | review
  tip?: string;
}
export interface DmResponse {
  versions: DmVersion[];
  recommended: string;
  reason: string;
}
export interface DmRequest {
  handle: string;
  niche?: string;
  followers?: number;
  textContext?: string;
  screenshots?: string[];
}
