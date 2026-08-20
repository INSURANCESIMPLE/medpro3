export interface Testimonial {
  id: string;
  author: string;
  location: string;
  roleOrPlan: string;
  rating: number;
  date: string;
  verifiedGoogle: boolean;
  highlightTag: string;
  quote: string;
  savingsOrOutcome?: string;
}

export type ActiveTab = 'home' | 'plans' | 'resources' | 'timeline' | 'about' | 'schedule' | 'insurance-simplified' | 'contact';

export interface MedicareResource {
  id: string;
  title: string;
  category: 'guide' | 'cheatsheet' | 'calculator' | 'video' | 'faq' | 'strategy';
  description: string;
  readTime?: string;
  downloadUrl?: string;
  iconName: string;
  isFeatured?: boolean;
  content?: string;
  tags: string[];
}

export interface MedicarePlan {
  id: string;
  name: string;
  type: 'Advantage (Part C)' | 'Supplement (Medigap)' | 'Prescription (Part D)';
  carrier: string;
  monthlyPremium: number;
  deductible: number;
  maxOutOfPocket: number;
  starRating: number;
  drugCoverageIncluded: boolean;
  dentalVisionIncluded: boolean;
  popularPlanCode?: string;
  features: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Part A & B' | 'Part C Advantage' | 'Part D Drugs' | 'Enrollment';
}

export interface AdvisorConsultationForm {
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  turning65Soon: boolean;
  preferredContactMethod: 'phone' | 'email' | 'text';
  notes: string;
}

export interface NetworkSiteInfo {
  title: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  offerings: string[];
}
