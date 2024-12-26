export interface UserCredits {
  dailyCredits: number;
  weeklyCredits: number;
  lastDailyReset: string;
  lastWeeklyReset: string;
  isPremium: boolean;
  premiumExpiry?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  phone?: string;
  credits: UserCredits;
  createdAt: string;
}