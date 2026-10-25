import { jsPDF } from 'jspdf';

export interface GuideSection {
  heading: string;
  items: string[];
}

export interface HubGuideDefinition {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  subtitle: string;
  readTime: string;
  description: string;
  highlights: string[];
  sections: GuideSection[];
  proTip: string;
  advisorQuote: string;
}

export const HUB_GUIDES: Record<string, HubGuideDefinition> = {
  '100-percent-tactic': {
    id: '100-percent-tactic',
    title: "The Professor's 100% Coverage Tactic: Senior Zero-Gap Strategy",
    shortTitle: "The Professor's 100% Coverage Tactic",
    category: 'Featured Strategy',
    subtitle: 'Eliminate surprise out-of-pocket bills by bundling Medigap with 5 essential standalone protections',
    readTime: '4 min read',
    description: 'Medicare alone leaves major gaps for routine dental, vision, lump-sum cancer therapy, and private in-home care. Learn how standalone add-ons provide 360-degree financial protection.',
    highlights: [
      'Covers 100% of gaps excluded by Medicare Part A and Part B',
      'No restrictive HMO networks or pre-authorization delays',
      'Direct lump-sum tax-free cash payouts paid straight to you',
      'Guarantees predictable healthcare expenses for seniors'
    ],
    sections: [
      {
        heading: 'Why Medicare & Medigap Alone Leave Coverage Gaps',
        items: [
          'Original Medicare (Part A & B) does not cover routine dental cleanings, crowns, implants, eyeglasses, or hearing aids.',
          'Medigap plans (like Plan G and Plan N) pay your 20% Medicare coinsurance and hospital deductibles, but federal law forbids them from paying for dental, vision, cancer cash, or long-term private caregivers.',
          'A single dental implant or major cancer diagnosis can cost a senior between $5,000 and $30,000 in unexpected out-of-pocket bills without add-on protection.'
        ]
      },
      {
        heading: 'The 5 Core Pillars of the 100% Coverage Tactic',
        items: [
          '1. Dental Insurance Add-On ($25–$45/mo): 100% preventive coverage ($0 cleanings & exams), plus up to $3,000/yr for fillings, crowns, root canals, dentures, and implants.',
          '2. Vision Care Add-On ($12–$20/mo): $10 annual comprehensive eye exams, plus $150–$250 annual allowances for designer frames, lenses, and bifocals.',
          '3. Lump-Sum Cancer & Critical Illness ($18–$35/mo): Pays $10,000 to $50,000 direct tax-free cash upon diagnosis to cover non-medical costs, experimental therapies, travel, and mortgage.',
          '4. Hospital Indemnity Cash Plan ($15–$30/mo): Pays $250 to $600 per day cash for inpatient hospital stays to wipe out admission copays, ambulance rides, and emergency room bills.',
          '5. Life with Accelerated Home Health Care: Tax-free living benefit rider that pays cash for private in-home caregivers, preventing early nursing home placement.'
        ]
      },
      {
        heading: 'Recommended Action Plan for 2027',
        items: [
          'Step 1: Secure baseline medical protection (Original Medicare + Medigap Plan G or Plan N).',
          'Step 2: Add standalone Dental & Vision during your enrollment window without medical underwriting.',
          'Step 3: Pair a $20,000 Lump-Sum Cancer policy and Hospital Indemnity rider based on your family health history.',
          'Step 4: Review total monthly investment (typically $180–$250/mo total) to guarantee zero surprise bills for life.'
        ]
      }
    ],
    proTip: 'Always apply for standalone Dental and Vision before undergoing planned dental work to satisfy standard waiting periods.',
    advisorQuote: '"Our 100% Coverage Tactic gives you the peace of mind knowing that whether you need a routine tooth crown, new glasses, or advanced cancer treatment, your savings are 100% safeguarded." — Jason York, Medicare Professor'
  },

  'parts-cheatsheet': {
    id: 'parts-cheatsheet',
    title: '2027 Medicare Parts A, B, C & D Beneficiary Cheatsheet',
    shortTitle: '2027 Medicare Parts A, B, C & D Cheatsheet',
    category: 'Cheatsheet',
    subtitle: 'The definitive 1-page guide to projected 2027 deductibles, premiums, copays, and out-of-pocket caps',
    readTime: '3 min read',
    description: 'Complete breakdown of Medicare Part A (Hospital), Part B (Medical), Part C (Advantage), and Part D (Prescription Drugs) updated for 2027 CMS regulations.',
    highlights: [
      'Projected 2027 Part B Monthly Premium: ~$193.60/month',
      'Projected 2027 Part B Annual Deductible: $268/year',
      'Part D Out-of-Pocket Rx Spending Cap active under Inflation Reduction Act',
      'Medicare Prescription Payment Plan (M3P) allows 12-month interest-free installment spreading'
    ],
    sections: [
      {
        heading: 'Medicare Part A (Hospital Insurance)',
        items: [
          'Monthly Premium: $0/month for 99% of seniors with 40+ Social Security work credits.',
          'Inpatient Hospital Deductible: Projected $1,736 per benefit period (not per calendar year).',
          'Hospital Days 1–60: $0 copay per day after deductible.',
          'Hospital Days 61–90: $434 per day coinsurance.',
          'Hospital Days 91–150: $868 per day lifetime reserve days.',
          'Skilled Nursing Facility: Days 1–20 $0 copay; Days 21–100 $217/day coinsurance.'
        ]
      },
      {
        heading: 'Medicare Part B (Medical Insurance)',
        items: [
          'Standard Monthly Premium: Projected ~$193.60/mo (deducted from monthly Social Security check).',
          'Annual Medical Deductible: Projected $268/year before Medicare pays.',
          'Coinsurance: 80/20 Split. Medicare pays 80% of approved amounts; you are responsible for 20% with NO out-of-pocket maximum on Original Medicare!',
          'High Earners (IRMAA): Beneficiaries with modified adjusted gross income over $106,000 (single) or $212,000 (joint) pay an Income-Related Monthly Adjustment Amount surcharge.'
        ]
      },
      {
        heading: 'Medicare Part C (Medicare Advantage)',
        items: [
          'Replaces Original Medicare with a private HMO or PPO network.',
          'Often features $0/month plan premiums plus bundled prescription, basic dental, and gym benefits.',
          'Mandatory Maximum Out-of-Pocket (MOOP) cap between $3,900 and $9,350/year in network copays.',
          'Requires network doctors and pre-authorizations for specialist procedures.'
        ]
      },
      {
        heading: 'Medicare Part D (Prescription Drug Plans)',
        items: [
          'Federal Spending Cap: Strict annual out-of-pocket prescription cap protects seniors from catastrophic drug expenses.',
          'Standard Deductible Cap: Maximum deductible is $615/year.',
          'Medicare Prescription Payment Plan (M3P): Opt-in program allowing seniors to spread high pharmacy costs into 12 monthly interest-free payments.'
        ]
      }
    ],
    proTip: 'Because Part B has no yearly limit on your 20% coinsurance, seniors should strongly consider a Medigap policy or Medicare Advantage plan to cap financial exposure.',
    advisorQuote: '"Never navigate Medicare without understanding your 20% coinsurance exposure. A $50,000 outpatient surgery leaves you owing $10,000 on Original Medicare without supplemental coverage." — Jason York'
  },

  'enrollment-timeline': {
    id: 'enrollment-timeline',
    title: 'Turning 65 Medicare Enrollment Timeline & Penalty Prevention Guide',
    shortTitle: 'Turning 65 Enrollment Timeline Roadmap',
    category: 'Enrollment Roadmap',
    subtitle: 'The 7-month roadmap to secure Day 1 coverage and permanently avoid lifetime Medicare late penalties',
    readTime: '5 min read',
    description: 'Clear schedule for when and how to enroll in Medicare Parts A, B, and D, with guidelines for working past 65 and avoiding lifetime penalties.',
    highlights: [
      '7-Month Initial Enrollment Period (IEP) breakdown',
      'How to start coverage on the 1st day of your 65th birthday month',
      'Rules for working past 65 with employer group coverage (20+ employees)',
      'Avoiding the 10% Part B lifetime penalty and 1% Part D penalty'
    ],
    sections: [
      {
        heading: 'The 7-Month Initial Enrollment Period (IEP)',
        items: [
          'Months -3, -2, -1 (Before Birthday Month): The optimal enrollment window. Applying during this window guarantees your Part A and Part B start on Day 1 of your birth month.',
          'Birthday Month: Enrolling during your birth month pushes your coverage start date to the first of the following month.',
          'Months +1, +2, +3 (After Birthday Month): Final 3 months of your IEP. Enrolling here causes delayed coverage and potential gaps in doctor access.'
        ]
      },
      {
        heading: 'Working Past Age 65: When Can You Delay?',
        items: [
          'Employer Has 20+ Employees: You may safely delay Part B without penalty as long as you are actively employed and covered by creditable employer group health insurance.',
          'Employer Has Under 20 Employees: You MUST enroll in Part B at age 65. Medicare is primary; employer coverage becomes secondary and may deny claims if Part B is missing.',
          'COBRA & Retiree Insurance: COBRA and retiree health plans do NOT count as active employer coverage and will trigger lifetime late enrollment penalties!'
        ]
      },
      {
        heading: 'Permanent Late Enrollment Penalties to Avoid',
        items: [
          'Part B Penalty: A permanent 10% surcharge added to your monthly premium for every full 12-month period you could have had Part B but did not enroll.',
          'Part D Penalty: A permanent 1% penalty of the national base beneficiary premium multiplied by the number of uncovered months without creditable drug coverage.',
          'Special Enrollment Period (SEP): When you finally leave active employer group coverage, you have an 8-month window to enroll in Part B without penalty.'
        ]
      }
    ],
    proTip: 'If your 65th birthday falls on the 1st day of any month, your Medicare coverage begins on the 1st of the previous month! Plan your application accordingly.',
    advisorQuote: '"Medicare penalties follow you for the rest of your life. Contacting us 60 to 90 days before you turn 65 ensures your paperwork is processed accurately and penalty-free." — Jason York'
  },

  'medigap-vs-advantage': {
    id: 'medigap-vs-advantage',
    title: 'Medigap vs. Medicare Advantage 2027 Decision Matrix',
    shortTitle: 'Medigap vs. Medicare Advantage: Which is Right for You?',
    category: 'Comparison Matrix',
    subtitle: 'Side-by-side comparison of Supplement Plan G/N vs. Advantage HMO/PPO networks and costs',
    readTime: '6 min read',
    description: 'Decide with confidence between private network Advantage plans and comprehensive nationwide Medigap supplement coverage.',
    highlights: [
      'Doctor network freedom vs. restricted HMO/PPO networks',
      'Upfront monthly premiums vs. pay-as-you-go hospital and copay costs',
      'Prior authorization rules and specialist referral requirements',
      'The essential standalone Dental, Vision, and Cancer pairing for Medigap'
    ],
    sections: [
      {
        heading: 'Comprehensive Comparison Table',
        items: [
          'Doctor Access: Medigap allows you to visit ANY doctor, hospital, or specialist in the US that accepts Medicare (approx. 93% of doctors). Advantage restricts you to HMO/PPO local provider networks.',
          'Monthly Premium: Medigap Plan G averages $120–$220/mo depending on age and state. Medicare Advantage plans are frequently $0/mo premium.',
          'Out-of-Pocket Doctor Bills: Medigap Plan G covers 100% of doctor copays after the $268 Part B deductible. Advantage requires $20–$50 copays per specialist, $300–$400/day hospital copays, up to the MOOP ($3,900–$9,350/yr).',
          'Referrals & Prior Authorizations: Medigap requires zero prior authorizations; if Medicare covers it, Medigap pays. Advantage plans require prior authorization for MRIs, chemotherapy, surgeries, and skilled nursing stays.'
        ]
      },
      {
        heading: 'Medigap Plan G vs. Plan N: Which Supplement to Choose?',
        items: [
          'Medigap Plan G: The gold standard for comprehensive coverage. You pay only your annual Part B deductible ($268 in 2027), then 100% of all Medicare-approved medical bills are covered.',
          'Medigap Plan N: Budget-conscious alternative with $30–$60 lower monthly premiums. In exchange, you pay up to a $20 copay per doctor visit and $50 for ER visits that do not lead to hospital admission.'
        ]
      },
      {
        heading: 'Why Medigap Enrollees Need Standalone Add-Ons',
        items: [
          'Medigap policies do NOT include routine Dental, Vision, Hearing, or Cancer lump-sum cash.',
          'By bundling Medigap Plan G with standalone Dental & Vision ($35/mo) and a Cancer lump-sum policy ($20/mo), seniors achieve total 360-degree coverage without network restrictions.'
        ]
      }
    ],
    proTip: 'Take advantage of your 6-month Medigap Open Enrollment Period (starting the first month you have Part B at 65+). Insurance companies cannot deny you or charge extra for pre-existing conditions during this window!',
    advisorQuote: '"If you travel frequently, see top regional medical specialists, or despise dealing with prior authorization denials, Medigap Plan G or N is the premier choice." — Jason York'
  },

  'extra-help-lis': {
    id: 'extra-help-lis',
    title: 'Medicare Extra Help & Low-Income Subsidy (LIS) 2027 Eligibility Guide',
    shortTitle: 'How to Qualify for Medicare Extra Help & LIS',
    category: 'Financial Assistance',
    subtitle: 'How qualifying seniors can save up to $5,300/year on Part D prescription premiums, deductibles, and copays',
    readTime: '4 min read',
    description: 'Detailed criteria and application steps to receive federal assistance with prescription medication costs under the expanded Extra Help program.',
    highlights: [
      'Saves seniors an average of $5,300 annually on prescriptions',
      '$0 Part D monthly plan premium & $0 prescription deductible',
      'Generic drug copays capped at minimal rates (approx. $4.90 generic / $12.15 brand)',
      'No late enrollment penalty for Part D if you qualify for Extra Help'
    ],
    sections: [
      {
        heading: 'What is Medicare Extra Help (LIS)?',
        items: [
          'Extra Help is a federal program that helps Medicare beneficiaries with limited income and resources pay for Medicare prescription drug program costs (premiums, deductibles, and coinsurance).',
          'Under recent federal expansions, all qualifying applicants receive full Extra Help benefits rather than partial subsidies.'
        ]
      },
      {
        heading: 'Income & Resource Limits for 2027',
        items: [
          'Individual Income Limit: Up to approximately $23,000/year (150% of the federal poverty level, adjusted annually).',
          'Married Couple Income Limit: Up to approximately $31,000/year.',
          'Asset/Resource Limits: Approximately $17,500 for an individual and $35,000 for a married couple (includes savings, stocks, and bonds; DOES NOT include your primary residence, one vehicle, personal effects, or life insurance policies).'
        ]
      },
      {
        heading: 'Dual Eligible Special Needs Plans (D-SNP)',
        items: [
          'If you qualify for both Medicare and full Medicaid, you are eligible for a Dual Eligible Special Needs Plan (D-SNP).',
          'D-SNPs frequently provide $0 copays, monthly food/grocery card allowances ($150–$300/mo), comprehensive dental including implants, and free non-emergency medical transportation.'
        ]
      }
    ],
    proTip: 'Even if you are slightly above the income limit, certain expenses (such as medical bills and dependent support) can be deducted from your gross income during evaluation.',
    advisorQuote: '"Many seniors assume they do not qualify for Extra Help because they own a home. Your home and car do not count as assets for Extra Help. Let us run your numbers today." — Jason York'
  },

  'part-d-rx-guide': {
    id: 'part-d-rx-guide',
    title: '2027 Medicare Part D Prescription Drug Guide & Spending Cap',
    shortTitle: '2027 Medicare Part D Prescription Drug Guide',
    category: 'Prescription Guide',
    subtitle: 'Maximize pharmacy savings with the federal spending cap, M3P installment plans, and preferred network pharmacies',
    readTime: '4 min read',
    description: 'Master the federal prescription drug spending cap, formulary tier structures, and strategies to lower medication costs in 2027.',
    highlights: [
      'Federal Out-of-Pocket Prescription Spending Cap strictly protects enrollees',
      'Elimination of the traditional "Donut Hole" coverage gap',
      'Medicare Prescription Payment Plan (M3P) spreads drug bills across 12 monthly payments',
      'Preferred network pharmacies can reduce copays by up to 75%'
    ],
    sections: [
      {
        heading: 'Key Elements of Part D for 2027',
        items: [
          'Annual Out-of-Pocket Cap: Once your out-of-pocket costs on covered Part D medications reach the federal cap, you pay $0 for the remainder of the calendar year.',
          'The Donut Hole is GONE: The confusing "coverage gap" phase where seniors paid 25% of drug costs has been replaced by a streamlined 3-stage model (Deductible -> Initial Coverage -> $0 Catastrophic).',
          'Maximum Deductible: Capped at $615 for 2027; many preferred plans offer $0 deductibles on Tier 1 and Tier 2 medications.'
        ]
      },
      {
        heading: 'The Medicare Prescription Payment Plan (M3P)',
        items: [
          'What It Is: An opt-in program created by federal law allowing seniors to spread expensive medication costs across equal monthly payments instead of paying large sums at the pharmacy counter in January and February.',
          'Cost to Join: $0 fees and 0% interest.',
          'Who Benefits: Anyone taking expensive brand-name medications (e.g. Eliquis, Jardiance, Ozempic, Keytruda) who faces steep early-year deductibles.'
        ]
      },
      {
        heading: 'How to Choose the Best Part D Plan',
        items: [
          'Never pick a plan based on premium alone; an ultra-cheap $0.50/mo plan might not cover your specific heart or arthritis medication on its formulary.',
          'Input your exact dosages into Medicare Professor\'s plan analyzer to identify the carrier with the lowest TOTAL annual spend (premium + copays).'
        ]
      }
    ],
    proTip: 'Every autumn during the Annual Enrollment Period (Oct 15 - Dec 7), review your Part D plan. Drug companies alter formularies and tier classifications annually.',
    advisorQuote: '"Our office compares every single medication you take across all licensed carriers in your county to make sure you pay the lowest possible out-of-pocket pharmacy bills." — Jason York'
  },

  'medicare-faq-handbook': {
    id: 'medicare-faq-handbook',
    title: 'Medicare Professor Senior FAQ & Master Advisory Handbook',
    shortTitle: 'Medicare Frequently Asked Questions & Handbook',
    category: 'Advisory Handbook',
    subtitle: 'Clear answers to the most common questions seniors ask regarding enrollment, costs, networks, and rights',
    readTime: '7 min read',
    description: 'Comprehensive senior handbook addressing Medicare timing, doctor networks, pre-existing conditions, working past 65, and complementary coverages.',
    highlights: [
      'Top 10 most critical senior Medicare questions answered with zero jargon',
      'Rules for keeping your preferred doctors, hospitals, and specialists',
      'How Medicare works alongside Insurance Simplified life & annuity products',
      'Why licensed Medicare advisor services are 100% free of charge'
    ],
    sections: [
      {
        heading: 'Core Frequently Asked Questions',
        items: [
          'Q: When should I start applying for Medicare? A: 3 months before your 65th birthday month. Your Initial Enrollment Period (IEP) lasts 7 months total.',
          'Q: Can I keep my doctor? A: With Original Medicare + Medigap, yes—any doctor in the country accepting Medicare. With Medicare Advantage, you must verify your doctor is an in-network provider.',
          'Q: Are Medicare Professor services really free? A: Yes, 100% free! Insurance carriers pay independent advisory commissions established by federal guidelines. You pay the exact same regulated rate whether you enroll alone or with our expert guidance.',
          'Q: What if I have pre-existing conditions? A: During your 6-month Medigap Open Enrollment Period at 65, you cannot be denied or charged extra for any pre-existing health conditions. Guarantee your right to coverage by enrolling on time.'
        ]
      },
      {
        heading: 'Medicare + Insurance Simplified Sister Guidance',
        items: [
          'While Medicare Professor focuses on Part A, B, C & D medical protection, our sister site Insurance Simplified (www.insurancesimplified.info) guides seniors through:',
          '1. Final Expense Whole Life Coverage: Permanent policies to cover funeral, memorial, and burial expenses with zero medical exams.',
          '2. Indexed Universal Life (IUL): Tax-free wealth accumulation and transfer for children and grandchildren.',
          '3. Fixed Indexed Annuities: Protect retirement nest eggs from market loss while generating guaranteed lifetime income.'
        ]
      }
    ],
    proTip: 'Save this guide and keep our phone number (800) 732-7248 on your refrigerator. We serve as your dedicated Medicare advocates year-round!',
    advisorQuote: '"You spent 40+ years working and earning your Medicare benefits. You deserve clear, honest, unbiased guidance to protect what you have built." — Jason York'
  },

  'insurance-simplified-guide': {
    id: 'insurance-simplified-guide',
    title: 'Senior Life, Final Expense & Retirement Protection Guide',
    shortTitle: 'Beyond Medicare: Life & Retirement Guide',
    category: 'Sister Resource',
    subtitle: 'Protect your family and retirement savings with Final Expense, IULs, and Guaranteed Annuities',
    readTime: '5 min read',
    description: 'Explore essential senior financial products beyond Medicare through Insurance Simplified (www.insurancesimplified.info).',
    highlights: [
      'Final Expense Whole Life protection without invasive medical exams',
      'Indexed Universal Life (IUL) for tax-free legacy building',
      'Fixed Indexed Annuities for guaranteed lifetime retirement paychecks',
      'Accelerated living benefits for long-term home health care'
    ],
    sections: [
      {
        heading: 'Beyond Medicare: Protecting Your Family & Legacy',
        items: [
          'Medicare covers medical care, but it leaves your family vulnerable to funeral costs, unpaid final bills, and market downturns in retirement.',
          'Through our sister portal Insurance Simplified (www.insurancesimplified.info), seniors can access clear, hassle-free life and retirement solutions.'
        ]
      },
      {
        heading: 'Key Product Solutions for Seniors',
        items: [
          'Final Expense Insurance: Simplified issue whole life policies ($5,000–$35,000) that lock in level premiums for life, guaranteeing your loved ones are never burdened by funeral costs.',
          'Fixed Indexed Annuities: 100% principal protection with zero stock market risk, plus guaranteed annual interest growth and options for lifetime income streams you cannot outlive.',
          'Home Health Care Life Riders: Living benefit riders on life insurance policies that advance cash to pay for private in-home aides if you need assistance with activities of daily living.'
        ]
      }
    ],
    proTip: 'Visit www.insurancesimplified.info or ask Jason York during your Medicare review to explore bundled options.',
    advisorQuote: '"Comprehensive retirement security means protecting both your health with Medicare and your family\'s legacy with life and retirement tools." — Jason York'
  }
};

/**
 * Match a resource title from the UI to one of the HUB_GUIDES definitions
 */
export function getGuideByTitleOrId(identifier: string | null | undefined): HubGuideDefinition {
  if (!identifier) return HUB_GUIDES['parts-cheatsheet'];

  const lower = identifier.toLowerCase();
  
  if (lower.includes('100%') || lower.includes('tactic') || lower.includes('dental') || lower.includes('zero gap')) {
    return HUB_GUIDES['100-percent-tactic'];
  }
  if (lower.includes('parts a, b') || lower.includes('cheatsheet') || lower.includes('parts a/b') || lower.includes('part a')) {
    return HUB_GUIDES['parts-cheatsheet'];
  }
  if (lower.includes('timeline') || lower.includes('turning 65') || lower.includes('iep') || lower.includes('roadmap')) {
    return HUB_GUIDES['enrollment-timeline'];
  }
  if (lower.includes('medigap vs') || lower.includes('advantage') || lower.includes('decision matrix') || lower.includes('plan g')) {
    return HUB_GUIDES['medigap-vs-advantage'];
  }
  if (lower.includes('extra help') || lower.includes('lis') || lower.includes('low-income') || lower.includes('subsidy')) {
    return HUB_GUIDES['extra-help-lis'];
  }
  if (lower.includes('part d') || lower.includes('prescription') || lower.includes('rx') || lower.includes('m3p')) {
    return HUB_GUIDES['part-d-rx-guide'];
  }
  if (lower.includes('faq') || lower.includes('question') || lower.includes('handbook')) {
    return HUB_GUIDES['medicare-faq-handbook'];
  }
  if (lower.includes('simplified') || lower.includes('final expense') || lower.includes('retirement') || lower.includes('life')) {
    return HUB_GUIDES['insurance-simplified-guide'];
  }

  // Check direct ID match
  if (HUB_GUIDES[identifier]) {
    return HUB_GUIDES[identifier];
  }

  return HUB_GUIDES['parts-cheatsheet'];
}

/**
 * Generate a genuine binary PDF using jsPDF
 */
export function downloadGuideAsPdf(guide: HubGuideDefinition, leadInfo?: { fullName?: string; email?: string; phone?: string; zipCode?: string }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  // Header Banner Background
  doc.setFillColor(6, 78, 59); // Emerald-900
  doc.rect(0, 0, pageWidth, 85, 'F');

  // Brand Name & Tagline
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('THE MEDICARE PROFESSOR', margin, 32);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(209, 250, 229); // Emerald-100
  doc.text('Independent Medicare & Senior Protection Advisory | Insurance Made Simple', margin, 46);

  // Official 2027 Badge
  doc.setFillColor(245, 158, 11); // Amber-500
  doc.roundedRect(pageWidth - margin - 110, 20, 110, 24, 4, 4, 'F');
  doc.setTextColor(15, 23, 42); // Slate-950
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('2027 OFFICIAL GUIDE', pageWidth - margin - 105, 36);

  // Advisor Contact in header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Advisor: Jason York | (800) 732-7248 | jason@medicare-professor.com', margin, 68);

  y = 105;

  // Prepared for banner if lead name is available
  if (leadInfo?.fullName) {
    doc.setFillColor(241, 245, 249); // Slate-100
    doc.setDrawColor(203, 213, 225); // Slate-300
    doc.roundedRect(margin, y, contentWidth, 24, 4, 4, 'FD');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    const preparedText = `PREPARED EXCLUSIVELY FOR: ${leadInfo.fullName.toUpperCase()}${leadInfo.zipCode ? ` (ZIP: ${leadInfo.zipCode})` : ''} | Dispatched to: jason@medicare-professor.com`;
    doc.text(preparedText, margin + 8, y + 15);
    y += 34;
  }

  // Guide Title
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  const titleLines = doc.splitTextToSize(guide.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 18 + 4;

  // Subtitle
  doc.setTextColor(71, 85, 105); // Slate-600
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const subtitleLines = doc.splitTextToSize(guide.subtitle, contentWidth);
  doc.text(subtitleLines, margin, y);
  y += subtitleLines.length * 13 + 10;

  // Key Highlights Box
  doc.setFillColor(236, 253, 245); // Emerald-50
  doc.setDrawColor(167, 243, 208); // Emerald-200
  const highlightHeight = 18 + guide.highlights.length * 13;
  doc.roundedRect(margin, y, contentWidth, highlightHeight, 4, 4, 'FD');

  doc.setTextColor(6, 78, 59); // Emerald-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('KEY EXECUTIVE TAKEAWAYS (2027 STANDARDS):', margin + 8, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(4, 120, 87); // Emerald-700
  guide.highlights.forEach((hl, i) => {
    doc.text(`* ${hl}`, margin + 12, y + 24 + i * 13);
  });

  y += highlightHeight + 14;

  // Sections
  guide.sections.forEach((sec) => {
    // Check page break
    if (y > pageHeight - 110) {
      doc.addPage();
      y = margin;
    }

    doc.setFillColor(248, 250, 252); // Slate-50
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.roundedRect(margin, y - 4, contentWidth, 18, 3, 3, 'FD');

    doc.setTextColor(30, 41, 59); // Slate-800
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(sec.heading.toUpperCase(), margin + 6, y + 8);
    y += 20;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85); // Slate-700

    sec.items.forEach((item) => {
      const itemLines = doc.splitTextToSize(`*  ${item}`, contentWidth - 10);
      if (y + itemLines.length * 11 > pageHeight - 70) {
        doc.addPage();
        y = margin;
      }
      doc.text(itemLines, margin + 4, y);
      y += itemLines.length * 11 + 4;
    });

    y += 6;
  });

  // Pro Tip Box
  if (y > pageHeight - 90) {
    doc.addPage();
    y = margin;
  }

  doc.setFillColor(254, 243, 199); // Amber-100
  doc.setDrawColor(251, 191, 36); // Amber-400
  const proTipLines = doc.splitTextToSize(`PRO TIP: ${guide.proTip}`, contentWidth - 16);
  const tipHeight = proTipLines.length * 12 + 10;
  doc.roundedRect(margin, y, contentWidth, tipHeight, 4, 4, 'FD');
  doc.setTextColor(120, 53, 15); // Amber-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(proTipLines, margin + 8, y + 11);
  y += tipHeight + 12;

  // Advisor Signature Footer
  if (y > pageHeight - 80) {
    doc.addPage();
    y = margin;
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('HAVE QUESTIONS? SCHEDULE YOUR 100% FREE MEDICARE CONSULTATION', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Advisor: Jason York | Email: jason@medicare-professor.com | Phone: (800) 732-7248', margin, y + 11);
  doc.text('Website: www.themedicare-professor.com | Sister Network: www.insurancesimplified.info', margin, y + 21);
  doc.text('Plan rates are federally regulated. You never pay a penny extra for expert advisory.', margin, y + 31);

  // Save the PDF
  const safeFilename = `${guide.shortTitle.replace(/[^a-zA-Z0-9]/g, '_')}_2027_Guide.pdf`;
  doc.save(safeFilename);
}
