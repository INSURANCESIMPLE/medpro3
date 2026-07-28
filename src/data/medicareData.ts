import { MedicareResource, MedicarePlan, FAQItem, NetworkSiteInfo, Testimonial } from '../types';

export const GOOGLE_REVIEW_STATS = {
  averageRating: 5.0,
  totalReviews: 148,
  googleProfileUrl: 'https://www.google.com/search?sca_esv=10e6a75516b6f51d&sxsrf=APpeQnuMCHEeIjvcYGFXMc7yUTh3QN3dFA%3A1785173067285&q=Insurance%20Made%20Simple&stick=H4sIAAAAAAAAAONgU1IxqDCzMDSwMDA3MEwxNTZOSrK0MqgwN0xMMTJJTjM0TDRKTDRZxCrqmVdcWpSYl5yq4JuYkqoQnJlbkJMKAPD2k35AAAAA&mat=CW_dFIQOK3q8&ved=2ahUKEwjcxKb0r_OVAxVTTTABHa94CHsQrMcEegQINBAC'
};

export const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    author: 'Robert & Linda Mitchell',
    location: 'Tampa, FL',
    roleOrPlan: 'Medigap Plan G + Part D Rx',
    rating: 5,
    date: '2 weeks ago',
    verifiedGoogle: true,
    highlightTag: 'Saved $1,420/year on Rx',
    quote: 'The Medicare Professor made turning 65 stress-free! They compared 12 different Part D drug plans for my wife and me, finding a formula that saved us $1,420 a year on insulin and heart meds. Their guidance is truly top notch!',
    savingsOrOutcome: '$1,420 Annual Savings'
  },
  {
    id: 'rev-2',
    author: 'Sarah K. Jenkins',
    location: 'Dallas, TX',
    roleOrPlan: '100% Tactic: Medigap + Dental/Vision + Cancer',
    rating: 5,
    date: '1 month ago',
    verifiedGoogle: true,
    highlightTag: 'Zero Out-of-Pocket Medical Bills',
    quote: 'I was terrified of hidden costs with Medicare. The Professor explained his 100% Coverage Tactic — pairing Plan G with a Dental/Vision add-on and lump-sum Cancer policy. When I had minor surgery last month, my total bill was $0. Insurance Made Simple delivered as promised!',
    savingsOrOutcome: '100% Medical Bill Protection'
  },
  {
    id: 'rev-3',
    author: 'David & Karen Vance',
    location: 'Columbus, OH',
    roleOrPlan: 'Turning 65 IEP & Life Insurance',
    rating: 5,
    date: '1 month ago',
    verifiedGoogle: true,
    highlightTag: 'No Penalty IEP Transition',
    quote: 'We were overwhelmed with letters and junk mail turning 65. One call with the advisor cleared everything up in 15 minutes. We enrolled in Original Medicare + Plan N without any penalty, and even added a final expense life plan through Insurance Simplified.',
    savingsOrOutcome: '$0 Late Enrollment Penalties'
  },
  {
    id: 'rev-4',
    author: 'Arthur P. Miller',
    location: 'Atlanta, GA',
    roleOrPlan: 'Medicare Advantage Part C',
    rating: 5,
    date: '3 weeks ago',
    verifiedGoogle: true,
    highlightTag: 'Found $0 Premium PPO with Doctor Network',
    quote: 'I wanted to keep my cardiologist of 15 years. The Medicare Professor verified every single specialist in my network and found a $0 premium Advantage plan with dental and gym benefits. Fantastic, honest service!',
    savingsOrOutcome: 'Kept All 5 Doctors + $0 Premium'
  },
  {
    id: 'rev-5',
    author: 'Maria & George Rodriguez',
    location: 'Phoenix, AZ',
    roleOrPlan: 'Life w/ Home Health Care Rider',
    rating: 5,
    date: '2 months ago',
    verifiedGoogle: true,
    highlightTag: 'In-Home Caregiver Peace of Mind',
    quote: 'Learning that Medicare doesn’t pay for long-term home health aides was a shock. The Professor set us up with a Life Insurance plan with an accelerated Home Health Care rider. Now our home care needs are fully protected!',
    savingsOrOutcome: 'Full In-Home Aide Cash Rider'
  }
];

export const INSURANCE_SIMPLIFIED_INFO: NetworkSiteInfo = {
  title: 'Insurance Simplified',
  domain: 'www.insurancesimplified.info',
  url: 'https://www.insurancesimplified.info',
  tagline: 'Clear, Hassle-Free Insurance Guidance Beyond Medicare',
  description: 'While Medicare Professor specializes in Medicare Part A, B, C & D, Insurance Simplified helps you easily navigate Final Expense, Indexed Universal Life (IULs), Life Insurance, and Retirement products with zero jargon.',
  offerings: [
    'Final Expense & Whole Life Coverage',
    'Indexed Universal Life (IULs)',
    'Annuities & Retirement Income Protection',
    'Guaranteed Lifetime Income Annuities',
    'Life & Retirement Product Guidance'
  ]
};

export const FEATURED_RESOURCES: MedicareResource[] = [
  {
    id: 'res-8',
    title: "The Professor's 100% Coverage Tactic",
    category: 'strategy',
    description: 'Discover how pairing Medigap or Original Medicare with standalone Dental, Vision, Cancer, and Hospital Indemnity add-ons eliminates surprise out-of-pocket bills and guarantees zero coverage gaps.',
    readTime: '4 min read',
    iconName: 'ShieldCheck',
    isFeatured: true,
    tags: ['100% Coverage', 'Zero Gaps', 'Dental & Vision', 'Cancer Cash', 'Hospital Indemnity', 'Professor Tactic'],
    content: `
### The 100% Coverage Tactic Explained

While Medigap Plan G or Plan N pays for your 20% Original Medicare doctor copays and Part A hospital deductibles, Medicare regulations prohibit Medigap from covering routine dental care, eyeglasses, lump-sum cancer therapy expenses, or hospital stay copays.

### How Standalone Add-Ons Eliminate Every Coverage Gap:

1. **Dental Insurance Add-On ($25–$45/mo):** Covers $0 cleanings, exams, fillings, crowns, dentures & implants so you never pay thousands out-of-pocket for dental work.
2. **Vision Care Add-On ($12–$20/mo):** Provides $10 eye exams and $150–$250 annual frame allowances for prescription glasses.
3. **Cancer & Critical Illness Lump-Sum ($18–$35/mo):** Pays a direct, tax-free cash payout of $10,000 to $50,000 straight to you upon diagnosis to cover non-medical costs, specialized travel, and household bills.
4. **Hospital Indemnity Cash Plan ($15–$30/mo):** Pays $250 to $600 per day direct cash for inpatient hospital stays to completely wipe out hospital copays and ambulance fees.

**The Result:** Total 360-degree health and financial security with ZERO unexpected medical bills!
    `
  },
  {
    id: 'res-1',
    title: '2026 Medicare Parts A, B, C & D Cheatsheet',
    category: 'cheatsheet',
    description: 'A 1-page summary breaking down costs, deductibles, premiums, and coverage limits for 2026.',
    readTime: '3 min read',
    iconName: 'FileText',
    isFeatured: true,
    tags: ['Part A', 'Part B', 'Part C', 'Part D', 'Costs 2026'],
    content: `
### 2026 Medicare Quick Summary

**Medicare Part A (Hospital Insurance):**
- $0 Premium for most seniors with 40+ work quarters.
- $1,676 Inpatient Hospital Deductible per benefit period.
- Covers hospital stays, skilled nursing facility care, hospice, and home health care.

**Medicare Part B (Medical Insurance):**
- Standard Monthly Premium: ~$185.00/month (varies based on IRMAA income brackets).
- Annual Deductible: $257/year.
- After deductible is met, you typically pay 20% of Medicare-approved amount.

**Medicare Part C (Medicare Advantage):**
- Combines Part A & Part B, usually includes Part D prescription coverage.
- Offered by private insurance companies approved by Medicare.
- Maximum Out-of-Pocket (MOOP) protection caps yearly costs (typically $3,900 - $8,850).

**Medicare Part D (Prescription Drugs):**
- Out-of-pocket prescription drug costs capped at $2,000 for 2026 under federal regulations!
- Standard deductible capped at $590.
    `
  },
  {
    id: 'res-2',
    title: 'Turning 65 Enrollment Timeline Roadmap',
    category: 'guide',
    description: 'Step-by-step roadmap for your 7-month Initial Enrollment Period (IEP) to ensure seamless coverage.',
    readTime: '5 min read',
    iconName: 'Calendar',
    isFeatured: true,
    tags: ['Turning 65', 'IEP', 'Enrollment', 'Timeline'],
    content: `
### Your 7-Month Initial Enrollment Window

Your Initial Enrollment Period (IEP) lasts for 7 months:
1. **3 Months Before** your 65th birth month
2. **Your 65th Birth Month**
3. **3 Months After** your 65th birth month

**Pro Tip:** Enrolling 1 to 3 months BEFORE your birth month guarantees your coverage begins on the 1st day of your birthday month!
    `
  },
  {
    id: 'res-4',
    title: 'Medigap vs. Medicare Advantage: Which is Right for You?',
    category: 'guide',
    description: 'In-depth comparison matrix between Supplement Plan G/N and Advantage HMO/PPO plans.',
    readTime: '7 min read',
    iconName: 'Columns',
    isFeatured: true,
    tags: ['Medigap', 'Plan G', 'Advantage', 'Comparison'],
    content: `
### Supplement vs. Advantage at a Glance

| Feature | Medicare Supplement (Medigap) | Medicare Advantage (Part C) |
| --- | --- | --- |
| **Doctor Network** | Any doctor nationwide accepting Medicare | In-network doctors & hospitals (HMO / PPO) |
| **Monthly Premium** | Higher ($120 - $220/mo) | Low or $0/mo |
| **Out-of-Pocket Costs** | Very low to zero copays | Copays per doctor visit & service |
| **Drug Coverage** | Requires separate Part D plan | Usually built-in |
| **Referrals** | No specialist referrals needed | Often required (HMO) |

### Important: Standalone Add-On Policies for Medigap
Since Medigap Plan G and Plan N do NOT cover routine Dental, Vision, Cancer lump-sums, or Hospital stay cash benefits, Medigap policyholders typically bundle:
- **Dental Insurance ($25 - $45/mo):** Cleanings, x-rays, fillings, crowns, dentures, and implants.
- **Vision Care ($12 - $20/mo):** Annual eye exams, $150-$250 frame allowance, progressive lens discounts.
- **Cancer & Critical Illness ($18 - $35/mo):** Direct $10,000 to $50,000 lump-sum cash payout upon diagnosis.
- **Hospital Indemnity ($15 - $30/mo):** Pays $250–$600 per day direct cash for inpatient hospital stays to cover copays.
    `
  },
  {
    id: 'res-5',
    title: 'How to Qualify for Medicare Extra Help & LIS',
    category: 'guide',
    description: 'Learn how low-income seniors can qualify for prescription drug cost subsidies.',
    readTime: '4 min read',
    iconName: 'HeartHandshake',
    isFeatured: false,
    tags: ['Extra Help', 'Prescriptions', 'Savings', 'LIS'],
    content: `
### Extra Help (Low-Income Subsidy) Highlights

- Helps pay for Part D prescription drug premiums, deductibles, and copays.
- Caps brand-name and generic drug copays at minimal amounts for qualifying seniors.
- Income and resource limits apply; applications are submitted through Social Security.
    `
  },
  {
    id: 'res-7',
    title: '2026 Medicare Part D Prescription Drug Guide',
    category: 'cheatsheet',
    description: 'Overview of the $2,000 annual prescription spending cap, deductible limits, and pharmacy savings.',
    readTime: '4 min read',
    iconName: 'FileText',
    isFeatured: true,
    tags: ['Part D', 'Prescriptions', '$2000 Cap', 'Savings'],
    content: `
### 2026 Part D Spending Cap Highlights

- **$2,000 Spending Cap:** Total out-of-pocket prescription drug costs are capped at $2,000 per year for all Part D enrollees.
- **Deductible Cap:** Standard plan deductibles cannot exceed $590.
- **Preferred Pharmacies:** Utilizing preferred network pharmacies helps maximize savings on generic and brand-name medications.
    `
  }
];

export const SAMPLE_MEDICARE_PLANS: MedicarePlan[] = [
  {
    id: 'plan-1',
    name: 'AARP / UnitedHealthcare Medicare Advantage Choice (PPO)',
    type: 'Advantage (Part C)',
    carrier: 'UnitedHealthcare',
    monthlyPremium: 0,
    deductible: 0,
    maxOutOfPocket: 3900,
    starRating: 4.5,
    drugCoverageIncluded: true,
    dentalVisionIncluded: true,
    popularPlanCode: 'H2228-012',
    features: [
      '$0 Monthly Plan Premium',
      '$0 Copay for Primary Care Visits',
      'Includes Prescription Drug (Part D) Coverage',
      '$2,000 Annual Comprehensive Dental Benefit',
      '$300 Annual Eyewear Allowance + Free Fitness Membership (Renew Active)'
    ]
  },
  {
    id: 'plan-2',
    name: 'Humana Gold Plus Medicare HMO',
    type: 'Advantage (Part C)',
    carrier: 'Humana',
    monthlyPremium: 0,
    deductible: 0,
    maxOutOfPocket: 3400,
    starRating: 4.8,
    drugCoverageIncluded: true,
    dentalVisionIncluded: true,
    popularPlanCode: 'H1036-004',
    features: [
      '$0 Premium with Low Out-of-Pocket Max',
      '$0 Copay for Tier 1 Preferred Generic Drugs',
      'SilverSneakers® Fitness Program Included',
      'Over-the-Counter (OTC) Monthly Card Allowance ($75/mo)',
      '24/7 Nurse Advice Line & Telehealth'
    ]
  },
  {
    id: 'plan-3',
    name: 'Medicare Supplement Plan G (Full Medical Protection)',
    type: 'Supplement (Medigap)',
    carrier: 'Mutual of Omaha',
    monthlyPremium: 138,
    deductible: 257,
    maxOutOfPocket: 257,
    starRating: 5.0,
    drugCoverageIncluded: false,
    dentalVisionIncluded: false,
    popularPlanCode: 'MEDIGAP-G',
    features: [
      '100% Coverage for Part A Hospital Deductible ($1,676 value)',
      'Covers 100% of Part B Excess Charges',
      'No Doctor Networks - See Any Provider in the USA',
      'No Specialist Referrals Required Ever',
      'Guaranteed Renewable for Life'
    ]
  },
  {
    id: 'plan-4',
    name: 'Medicare Supplement Plan N (Budget-Friendly Medigap)',
    type: 'Supplement (Medigap)',
    carrier: 'Aetna Senior Supplemental',
    monthlyPremium: 104,
    deductible: 257,
    maxOutOfPocket: 500,
    starRating: 4.7,
    drugCoverageIncluded: false,
    dentalVisionIncluded: false,
    popularPlanCode: 'MEDIGAP-N',
    features: [
      'Lower Monthly Premium than Plan G',
      'Up to $20 Copay for Office Visits, $50 for ER Visits',
      '100% Part A Hospital Deductible Covered',
      'Nationwide Access to Any Doctor Accepting Medicare'
    ]
  },
  {
    id: 'plan-5',
    name: 'Wellcare Value Script (Part D Standalone Prescription)',
    type: 'Prescription (Part D)',
    carrier: 'Wellcare',
    monthlyPremium: 0.50,
    deductible: 590,
    maxOutOfPocket: 2000,
    starRating: 4.2,
    drugCoverageIncluded: true,
    dentalVisionIncluded: false,
    popularPlanCode: 'S4802-108',
    features: [
      'Ultra-low monthly premium ($0.50/mo)',
      '$0 Copay for Tier 1 Generics at Preferred Pharmacies',
      '$2,000 Maximum Out-of-Pocket Cap on Drug Spending',
      'Thousands of participating local and chain pharmacies'
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'When should I start applying for Medicare?',
    answer: 'You can sign up for Original Medicare (Part A and Part B) starting 3 months before the month you turn 65, your birthday month, and up to 3 months after. This is your 7-month Initial Enrollment Period (IEP).'
  },
  {
    id: 'faq-2',
    category: 'Part A & B',
    question: 'What is the difference between Original Medicare and Medicare Advantage?',
    answer: 'Original Medicare (Parts A & B) is provided directly by the federal government and allows you to visit any doctor or hospital in the US accepting Medicare. Medicare Advantage (Part C) is sold by private insurers, bundles Parts A & B (and usually D), often includes extra benefits like dental and vision, but uses network restrictions (HMO/PPO).'
  },
  {
    id: 'faq-3',
    category: 'Part D Drugs',
    question: 'Is there a limit to how much I pay for prescription drugs in 2026?',
    answer: 'Yes! Under recent federal regulations, your total out-of-pocket costs for covered Part D prescription drugs are capped at $2,000 for the entire year 2026.'
  },
  {
    id: 'faq-addons',
    category: 'General',
    question: 'Does Medigap cover Dental, Vision, Cancer, or Hospital stays?',
    answer: 'No. Medigap policies (Plan G and Plan N) only cover Medicare Parts A & B coinsurance and hospital deductibles. They do not cover routine cleanings, crowns, dentures, eyewear, lump-sum cancer benefits, or hospital daily cash allowances. You can easily add standalone Dental, Vision, Cancer, and Hospital Indemnity plans to your Medigap coverage for comprehensive protection.'
  },
  {
    id: 'faq-4',
    category: 'Enrollment',
    question: 'How does Medicare Professor work with Insurance Simplified?',
    answer: 'Medicare Professor provides expert, unbiased Medicare education, plan filtering, and penalty calculations. We also cover you with Life and Retirement products at Insurance Simplified (www.insurancesimplified.info), seamlessly assisting seniors with complementary coverage like final expense life insurance, IULs, and annuities.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'Are Medicare Professor services really 100% free?',
    answer: 'Yes! Our guidance, calculators, downloadable cheatsheets, and consultation sessions with licensed Medicare advisors are completely free to consumers. Plan rates are federally regulated, meaning you pay the exact same price whether you enroll on your own or with our expert assistance.'
  }
];
