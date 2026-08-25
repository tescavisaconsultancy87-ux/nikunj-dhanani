"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ShieldCheck,
  Globe,
  Check,
  Phone,
  User,
  Mail,
  AlertCircle,
  MessageSquare,
  Lock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LeafMotif from "@/components/LeafMotif";

interface StressQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type QuizLanguage = "en" | "hi" | "gu";

interface QuizOption {
  icon: string;
  badge: Record<QuizLanguage, string>;
  label: Record<QuizLanguage, string>;
  domain: "parenting" | "relationship" | "burnout" | "teen" | "anxiety";
  weight?: number;
  bgGradient: string;
}

interface QuestionDef {
  id: string;
  stepNum: number;
  category: Record<QuizLanguage, string>;
  question: Record<QuizLanguage, string>;
  subtitle: Record<QuizLanguage, string>;
  options: QuizOption[];
}

// ── FULL 6-QUESTION MULTILINGUAL BANK + MID-QUIZ LEAD CAPTURE (7 TOTAL STEPS) ──
const questionsList: QuestionDef[] = [
  // Q1 (Step 1)
  {
    id: "q1",
    stepNum: 1,
    category: {
      en: "Question 1 of 6 • Area of Primary Stress",
      hi: "प्रश्न 1 ऑफ 6 • मुख्य तनाव का क्षेत्र",
      gu: "પ્રશ્ન 1 માંથી 6 • મુખ્ય તણાવનું ક્ષેત્ર",
    },
    question: {
      en: "Where are you experiencing the highest emotional tension right now?",
      hi: "इस समय आपको सबसे अधिक मानसिक तनाव या परेशानी कहाँ महसूस हो रही है?",
      gu: "હાલમાં તમને સૌથી વધુ માનસિક તણાવ કે મુશ્કેલી ક્યાં અનુભવાય છે?",
    },
    subtitle: {
      en: "Select the primary area that needs immediate clarity:",
      hi: "वह क्षेत्र चुनें जहाँ आपको तुरंत स्पष्टता चाहिए:",
      gu: "તે ક્ષેત્ર પસંદ કરો જ્યાં તમને તરત સ્પષ્ટતા જોઈએ છે:",
    },
    options: [
      {
        icon: "👨‍👩‍👧‍👦",
        badge: { en: "Family & Parenting", hi: "परिवार एवं बच्चे", gu: "પરિવાર અને બાળકો" },
        label: {
          en: "Parenting struggles, child tantrums, or daily household burnout",
          hi: "बच्चों का पालन-पोषण, बच्चों की जिद या रोजमर्रा का घरेलू तनाव",
          gu: "બાળકોનું પાલન-પોષણ, બાળકોની જિદ્દ અથવા રોજિંદો ઘરનો તણાવ",
        },
        domain: "parenting",
        bgGradient: "from-[#FFF5EE] to-[#FFF0E6] border-[#C97B5B]/40 hover:border-[#C97B5B]",
      },
      {
        icon: "💑",
        badge: { en: "Couples & Marriage", hi: "दंपत्ति एवं विवाह", gu: "દંપતી અને લગ્નજીવન" },
        label: {
          en: "Communication gaps, repetitive arguments, or distance with spouse",
          hi: "जीवनसाथी के साथ बातचीत की कमी, बार-बार झगड़े या दूरी",
          gu: "જીવનસાથી સાથે વાતચીતનો અભાવ, વારંવાર ઝઘડા અથવા અંતર",
        },
        domain: "relationship",
        bgGradient: "from-[#F4F9F4] to-[#EAF4EA] border-[#6B7F62]/40 hover:border-[#6B7F62]",
      },
      {
        icon: "💼",
        badge: { en: "Work & Burnout", hi: "कार्यस्थल एवं तनाव", gu: "કામનું દબાણ અને બર્નઆઉટ" },
        label: {
          en: "Executive workplace pressure, decision fatigue, or career stress",
          hi: "काम का भारी दबाव, निर्णय लेने की थकान या करियर की चिंता",
          gu: "કામનું ભારે દબાણ, નિર્ણય લેવાનો થાક અથવા કરિયરની ચિંતા",
        },
        domain: "burnout",
        bgGradient: "from-[#FAF6F0] to-[#F2EBDC] border-[#1E2C24]/40 hover:border-[#1E2C24]",
      },
      {
        icon: "🎓",
        badge: { en: "Teenager Conflict", hi: "किशोर बच्चे", gu: "કિશોર બાળકો" },
        label: {
          en: "Teenager rebellion, smartphone screen battles, or exam fear",
          hi: "किशोर बच्चों के साथ खींचतान, मोबाइल स्क्रीन विवाद या पढ़ाई का डर",
          gu: "કિશોર બાળકો સાથે વિવાદ, મોબાઈલ સ્ક્રિન લડાઈ અથવા અભ્યાસનો ડર",
        },
        domain: "teen",
        bgGradient: "from-[#FFF8EE] to-[#FFF0DB] border-[#D98A2B]/40 hover:border-[#D98A2B]",
      },
      {
        icon: "🧘",
        badge: { en: "Personal Peace", hi: "व्यक्तिगत शांति", gu: "વ્યક્તિગત શાંતિ" },
        label: {
          en: "Personal emotional anxiety, overthinking, boundaries, or life transitions",
          hi: "व्यक्तिगत चिंता, ज्यादा सोचना (ओवरथिंकिंग) या जीवन में बदलाव",
          gu: "વ્યક્તિગત ચિંતા, વધુ પડતું વિચારવું (ઓવરથિંકિંગ) અથવા ફેરફાર",
        },
        domain: "anxiety",
        bgGradient: "from-[#F9F7FC] to-[#F0EBF8] border-[#8A7B9C]/40 hover:border-[#8A7B9C]",
      },
    ],
  },

  // Q2 (Step 2)
  {
    id: "q2",
    stepNum: 2,
    category: {
      en: "Question 2 of 6 • Daily Reactions",
      hi: "प्रश्न 2 ऑफ 6 • दैनिक असर",
      gu: "પ્રશ્ન 2 માંથી 6 • દૈનિક અસર",
    },
    question: {
      en: "How does this stress affect your day-to-day emotional reactions?",
      hi: "यह तनाव आपकी रोजमर्रा की भावनाओं पर कैसे असर डालता है?",
      gu: "આ તણાવ તમારી રોજિંદી લાગણીઓ પર કેવી રીતે અસર કરે છે?",
    },
    subtitle: {
      en: "Select what happens when stress peaks:",
      hi: "जब तनाव चरम पर होता है, तब क्या स्थिति बनती है:",
      gu: "જ્યારે તણાવ પરાકાષ્ઠાએ હોય, ત્યારે શું સ્થિતિ થાય છે:",
    },
    options: [
      {
        icon: "⚡",
        badge: { en: "Sharp Reactions", hi: "तीखी प्रतिक्रिया", gu: "તીવ્ર પ્રતિક્રિયા" },
        label: {
          en: "I lose patience quickly, yell, or react sharply to small triggers",
          hi: "धीरज जल्दी छूट जाता है, गुस्सा आ जाता है या छोटी बात पर बहस होती है",
          gu: "ધીરજ જલ્દી ખૂટી જાય છે, ગુસ્સો આવી જાય છે કે નાની વાતમાં વિવાદ થાય છે",
        },
        domain: "parenting",
        weight: 3,
        bgGradient: "from-[#FFF5EE] to-[#FFF0E6] border-[#C97B5B]/40 hover:border-[#C97B5B]",
      },
      {
        icon: "🧊",
        badge: { en: "Cold Silence", hi: "खामोशी और दूरी", gu: "શાંતિ અને અંતર" },
        label: {
          en: "We retreat into silent tension and walk on eggshells for days",
          hi: "हम खामोशी में चले जाते हैं और दिनों तक तनाव बना रहता है",
          gu: "અમે શાંત થઈ જઈએ છીએ અને દિવસો સુધી ખચકાટ રહે છે",
        },
        domain: "relationship",
        weight: 3,
        bgGradient: "from-[#F4F9F4] to-[#EAF4EA] border-[#6B7F62]/40 hover:border-[#6B7F62]",
      },
      {
        icon: "🌙",
        badge: { en: "Overthinking & Insomnia", hi: "अनिद्रा और चिंता", gu: "અનિદ્રા અને ચિંતા" },
        label: {
          en: "Severe overthinking keeps me awake or mentally exhausted",
          hi: "रात को नींद नहीं आती, अत्यधिक सोच के कारण दिमाग थक जाता है",
          gu: "રાત્રે ઊંઘ નથી આવતી, વધુ વિચારવાને લીધે મગજ થાકી જાય છે",
        },
        domain: "burnout",
        weight: 3,
        bgGradient: "from-[#FAF6F0] to-[#F2EBDC] border-[#1E2C24]/40 hover:border-[#1E2C24]",
      },
      {
        icon: "😔",
        badge: { en: "Guilt & Burden", hi: "अपराधबोध और थकान", gu: "દોષિત ભાવ અને થાક" },
        label: {
          en: "I feel guilty, misunderstood, and emotionally overburdened",
          hi: "मैं खुद को दोषी मानता/मानती हूं और मानसिक रूप से थक चुका/चुकी हूं",
          gu: "હું દોષિત અનુભવું છું અને લાગણીશીલ રીતે થાકી ગયો/ગઈ છું",
        },
        domain: "anxiety",
        weight: 2,
        bgGradient: "from-[#FFF8EE] to-[#FFF0DB] border-[#D98A2B]/40 hover:border-[#D98A2B]",
      },
    ],
  },

  // Q3 (Step 3)
  {
    id: "q3",
    stepNum: 3,
    category: {
      en: "Question 3 of 6 • Duration & Pattern",
      hi: "प्रश्न 3 ऑफ 6 • समय और अवधि",
      gu: "પ્રશ્ન 3 માંથી 6 • સમય અને અવધિ",
    },
    question: {
      en: "How long has this issue been disrupting your peace of mind?",
      hi: "यह समस्या कितने समय से आपकी मानसिक शांति भंग कर रही है?",
      gu: "આ સમસ્યા કેટલા સમયથી તમારી માનસિક શાંતિ બગાડી રહી છે?",
    },
    subtitle: {
      en: "Understanding the timeline helps tailor the right intervention:",
      hi: "समयकाल समझने से सही समाधान खोजने में आसानी होती है:",
      gu: "સમયગાળો સમજવાથી સાચો ઉકેલ શોધવામાં મદદ મળે છે:",
    },
    options: [
      {
        icon: "📅",
        badge: { en: "> 6 Months", hi: "6 महीने से ज्यादा", gu: "6 મહિનાથી વધુ" },
        label: {
          en: "Over 6 months — it feels like our new normal and we need guidance",
          hi: "6 महीने से अधिक — यह रोज की स्थिति बन चुकी है और मार्गदर्शन चाहिए",
          gu: "6 મહિનાથી વધુ — આ રોજની સ્થિતિ બની ગઈ છે અને મદદ જરૂરી છે",
        },
        domain: "parenting",
        weight: 3,
        bgGradient: "from-[#FFF5EE] to-[#FFF0E6] border-[#C97B5B]/40 hover:border-[#C97B5B]",
      },
      {
        icon: "🔄",
        badge: { en: "Repetitive Cycles", hi: "बार-बार का चक्र", gu: "વારંવારનું ચક્ર" },
        label: {
          en: "It comes in cycles — short temporary peace followed by arguments",
          hi: "यह चक्र में आता है — कुछ दिन शांति, फिर से वही पुराना झगड़ा",
          gu: "આ ચક્રમાં આવે છે — થોડા દિવસ શાંતિ, પછી એ જ જૂનો ઝઘડો",
        },
        domain: "relationship",
        weight: 3,
        bgGradient: "from-[#F4F9F4] to-[#EAF4EA] border-[#6B7F62]/40 hover:border-[#6B7F62]",
      },
      {
        icon: "📈",
        badge: { en: "Recent Escalation", hi: "हालिया तनाव", gu: "હાલનો તણાવ" },
        label: {
          en: "Recently escalated due to major life, school, or career shifts",
          hi: "हाल ही में जीवन, काम या स्कूल में बदलाव के कारण बढ़ा है",
          gu: "તાજેતરમાં ઘર, કામ કે શાળામાં ફેરફારને લીધે વધ્યો છે",
        },
        domain: "burnout",
        weight: 2,
        bgGradient: "from-[#FAF6F0] to-[#F2EBDC] border-[#1E2C24]/40 hover:border-[#1E2C24]",
      },
    ],
  },

  // Q4 (Step 5 - After Lead Form)
  {
    id: "q4",
    stepNum: 5,
    category: {
      en: "Question 4 of 6 • Overall Impact",
      hi: "प्रश्न 4 ऑफ 6 • रिश्तों पर प्रभाव",
      gu: "પ્રશ્ન 4 માંથી 6 • સંબંધો પર અસર",
    },
    question: {
      en: "How is this ongoing stress affecting your family bond or health?",
      hi: "यह तनाव आपके रिश्तों और मानसिक स्वास्थ्य पर क्या असर डाल रहा है?",
      gu: "આ તણાવ તમારા સંબંધો અને માનસિક સ્વાસ્થ્ય પર શું અસર પાડે છે?",
    },
    subtitle: {
      en: "Select the deepest impact you wish to heal:",
      hi: "वह सबसे बड़ा प्रभाव चुनें जिसे आप दूर करना चाहते हैं:",
      gu: "તે સૌથી મોટી અસર પસંદ કરો જેને તમે દૂર કરવા માંગો છો:",
    },
    options: [
      {
        icon: "🏠",
        badge: { en: "Home Atmosphere", hi: "घर का माहौल", gu: "ઘરનું વાતાવરણ" },
        label: {
          en: "It drains our home's warmth and leaves evenings feeling tense",
          hi: "घर का माहौल भारी रहता है और शामें तनाव में बीतती हैं",
          gu: "ઘરનું વાતાવરણ ભારે રહે છે અને સાંજ તણાવમાં વિતે છે",
        },
        domain: "parenting",
        weight: 3,
        bgGradient: "from-[#FFF5EE] to-[#FFF0E6] border-[#C97B5B]/40 hover:border-[#C97B5B]",
      },
      {
        icon: "💔",
        badge: { en: "Distance with Partner", hi: "साथी से दूरी", gu: "સાથીથી અંતર" },
        label: {
          en: "My partner and I feel emotionally isolated and unappreciated",
          hi: "हम दोनों के बीच भावनात्मक दूरी है और हम अकेलापन महसूस करते हैं",
          gu: "અમે બંને વચ્ચે લાગણીશીલ અંતર છે અને એકલતા અનુભવાય છે",
        },
        domain: "relationship",
        weight: 3,
        bgGradient: "from-[#F4F9F4] to-[#EAF4EA] border-[#6B7F62]/40 hover:border-[#6B7F62]",
      },
      {
        icon: "🔥",
        badge: { en: "Burnout Leakage", hi: "तनाव का रिसाव", gu: "તણાવની અસર" },
        label: {
          en: "Work stress leaks into family time, making me irritable at home",
          hi: "काम का तनाव घर में आता है, जिससे मैं बच्चों या साथी पर गुस्सा हो जाता/जाती हूं",
          gu: "કામનો તણાવ ઘરમાં આવે છે, જેનાથી હું બાળકો કે સાથી પર ગુસ્સે થાઉં છું",
        },
        domain: "burnout",
        weight: 3,
        bgGradient: "from-[#FAF6F0] to-[#F2EBDC] border-[#1E2C24]/40 hover:border-[#1E2C24]",
      },
    ],
  },

  // Q5 (Step 6)
  {
    id: "q5",
    stepNum: 6,
    category: {
      en: "Question 5 of 6 • Self-Help Obstacles",
      hi: "प्रश्न 5 ऑफ 6 • मुख्य बाधाएं",
      gu: "પ્રશ્ન 5 માંથી 6 • મુખ્ય મુશ્કેલીઓ",
    },
    question: {
      en: "When you try to resolve these struggles on your own, what happens?",
      hi: "जब आप इस समस्या को खुद सुलझाने का प्रयास करते हैं, तो क्या होता है?",
      gu: "જ્યારે તમે આ સમસ્યાને પોતે ઉકેલવાનો પ્રયત્ન કરો છો, ત્યારે શું થાય છે?",
    },
    subtitle: {
      en: "Understanding past roadblocks prevents repeating mistakes:",
      hi: "पुरानी गलतियों से बचना ही नए समाधान की शुरुआत है:",
      gu: "જૂની ભૂલોથી બચવું એ જ નવા ઉકેલની શરૂઆત છે:",
    },
    options: [
      {
        icon: "🔁",
        badge: { en: "Temporary Peace", hi: "अस्थायी शांति", gu: "અસ્થાયી શાંતિ" },
        label: {
          en: "We make temporary peace, but the root cause repeats again",
          hi: "कुछ समय शांति रहती है, पर मूल समस्या दोबारा सामने आ जाती है",
          gu: "થોડો સમય શાંતિ રહે છે, પણ મૂળ સમસ્યા ફરી સામે આવી જાય છે",
        },
        domain: "relationship",
        weight: 3,
        bgGradient: "from-[#F4F9F4] to-[#EAF4EA] border-[#6B7F62]/40 hover:border-[#6B7F62]",
      },
      {
        icon: "😶",
        badge: { en: "Suppressed Feelings", hi: "भावनाएं दबाना", gu: "લાગણીઓ દબાવવી" },
        label: {
          en: "I suppress my feelings to avoid conflict until I burn out sharply",
          hi: "मैं झगड़ा टालने के लिए चुप रहता/रहती हूं, जब तक धैर्य खत्म न हो जाए",
          gu: "હું ઝઘડો ટાળવા શાંત રહું છું, જ્યાં સુધી ધીરજ ખૂટી ન જાય",
        },
        domain: "anxiety",
        weight: 3,
        bgGradient: "from-[#FAF6F0] to-[#F2EBDC] border-[#1E2C24]/40 hover:border-[#1E2C24]",
      },
      {
        icon: "🗣️",
        badge: { en: "Heated Arguments", hi: "बहस में उलझना", gu: "વાદ-વિવાદ થવો" },
        label: {
          en: "Conversations turn into defensive shouting matches without a solution",
          hi: "बातचीत बिना किसी नतीजे के केवल बहस बनकर खत्म होती है",
          gu: "વાતચીત કોઈ ઉકેલ વગર માત્ર વાદ-વિવાદ બનીને રહે છે",
        },
        domain: "teen",
        weight: 3,
        bgGradient: "from-[#FFF8EE] to-[#FFF0DB] border-[#D98A2B]/40 hover:border-[#D98A2B]",
      },
    ],
  },

  // Q6 (Step 7)
  {
    id: "q6",
    stepNum: 7,
    category: {
      en: "Question 6 of 6 • Desired Relief Goal",
      hi: "प्रश्न 6 ऑफ 6 • अपेक्षित समाधान",
      gu: "પ્રશ્ન 6 માંથી 6 • અપેક્ષિત ઉકેલ",
    },
    question: {
      en: "What outcome would bring you the greatest relief right now?",
      hi: "किस परिणाम या बदलाव से आपको सबसे अधिक मानसिक शांति मिलेगी?",
      gu: "કયા પરિણામ કે ફેરફારથી તમને સૌથી વધુ માનસિક શાંતિ મળશે?",
    },
    subtitle: {
      en: "Choose your primary goal for guidance:",
      hi: "परामर्श का अपना मुख्य लक्ष्य चुनें:",
      gu: "માર્ગદર્શનનો તમારો મુખ્ય ધ્યેય પસંદ કરો:",
    },
    options: [
      {
        icon: "✨",
        badge: { en: "Calm Routines", hi: "शांत दिनचर्या", gu: "શાંત દિનચર્યા" },
        label: {
          en: "Practical behavioral scripts & predictable, peaceful family routines",
          hi: "बच्चों के लिए स्पष्ट नियम और शांत पारिवारिक माहौल",
          gu: "બાળકો માટે સ્પષ્ટ નિયમો અને શાંત કૌટુંબિક વાતાવરણ",
        },
        domain: "parenting",
        weight: 4,
        bgGradient: "from-[#FFF5EE] to-[#FFF0E6] border-[#C97B5B]/40 hover:border-[#C97B5B]",
      },
      {
        icon: "❤️",
        badge: { en: "Rebuild Trust", hi: "विश्वास दोबारा बनाएं", gu: "વિશ્વાસ ફરી બનાવો" },
        label: {
          en: "Breaking repetitive arguments & rebuilding warmth, trust, and intimacy",
          hi: "झगड़े रोकना और आपस में दोबारा प्यार, भरोसा और नज़दीकी कायम करना",
          gu: "ઝઘડા અટકાવવા અને પરસ્પર પ્રેમ, વિશ્વાસ તથા નિકટતા ફરી બનાવવી",
        },
        domain: "relationship",
        weight: 4,
        bgGradient: "from-[#F4F9F4] to-[#EAF4EA] border-[#6B7F62]/40 hover:border-[#6B7F62]",
      },
      {
        icon: "🌟",
        badge: { en: "Personal Clarity", hi: "व्यक्तिगत स्पष्टता", gu: "વ્યક્તિગત સ્પષ્ટતા" },
        label: {
          en: "1-on-1 confidential guidance for stress regulation & decision clarity",
          hi: "तनाव कम करने और निर्णय लेने के लिए 1-ऑन-1 व्यक्तिगत मार्गदर्शन",
          gu: "તણાવ ઘટાડવા અને નિર્ણય લેવા માટે 1-ઓન-1 વ્યક્તિગત માર્ગદર્શન",
        },
        domain: "burnout",
        weight: 4,
        bgGradient: "from-[#FAF6F0] to-[#F2EBDC] border-[#1E2C24]/40 hover:border-[#1E2C24]",
      },
    ],
  },
];

export default function StressQuizModal({ isOpen, onClose }: StressQuizModalProps) {
  const [lang, setLang] = useState<QuizLanguage | null>(null);
  
  // Steps Breakdown:
  // Step 0: Language Selection
  // Step 1: Q1
  // Step 2: Q2
  // Step 3: Q3
  // Step 4: Mid-Quiz Lead Details Form (Name, 10-digit Phone, Email)
  // Step 5: Q4
  // Step 6: Q5
  // Step 7: Q6
  // Step 8: Final Diagnosis Card & WhatsApp Action
  const [stepIndex, setStepIndex] = useState<number>(0);

  const [answers, setAnswers] = useState<{
    domain: "parenting" | "relationship" | "burnout" | "teen" | "anxiety";
    weight: number;
  }[]>([]);

  // Lead Form
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "" });
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Background Scroll Locking Effect when Modal is Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentLanguage: QuizLanguage = lang || "en";
  const cleanPhone = leadForm.phone.replace(/\D/g, "");
  const isPhoneValid = cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone);
  const isNameValid = leadForm.name.trim().length >= 2;
  const isLeadFormValid = isNameValid && isPhoneValid;

  const handleSelectLanguage = (selectedLang: QuizLanguage) => {
    setLang(selectedLang);
    setStepIndex(1);
  };

  const handleSelectOption = (opt: QuizOption) => {
    setAnswers([...answers, { domain: opt.domain, weight: opt.weight || 1 }]);
    if (stepIndex === 3) {
      setStepIndex(4); // Move to Mid-Quiz Lead Details Form
    } else if (stepIndex === 7) {
      setStepIndex(8); // Move to Final Result Card
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLeadFormValid) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          phone: cleanPhone,
          email: leadForm.email || undefined,
          serviceType: "2-Min Stress Check-in Lead",
          message: `Language: ${currentLanguage.toUpperCase()} | Self-Assessment in progress`,
        }),
      });
    } catch (err) {
      console.error("Lead submission notice:", err);
    } finally {
      setIsSubmitting(false);
      setStepIndex(5); // Proceed to Q4
    }
  };

  const handleGoBack = () => {
    if (stepIndex > 1) {
      if (stepIndex === 4) {
        setStepIndex(3);
      } else {
        setStepIndex(stepIndex - 1);
        if (stepIndex !== 4 && answers.length > 0) {
          setAnswers(answers.slice(0, answers.length - 1));
        }
      }
    } else if (stepIndex === 1) {
      setStepIndex(0);
    }
  };

  const handleReset = () => {
    setLang(null);
    setStepIndex(0);
    setAnswers([]);
    setLeadForm({ name: "", phone: "", email: "" });
    setPhoneTouched(false);
  };

  const getQuestionForStep = (step: number): QuestionDef | null => {
    if (step >= 1 && step <= 3) return questionsList[step - 1]; // Q1, Q2, Q3
    if (step >= 5 && step <= 7) return questionsList[step - 2]; // Q4, Q5, Q6
    return null;
  };

  const computeRecommendation = () => {
    const counts: Record<string, number> = { parenting: 0, relationship: 0, burnout: 0, teen: 0, anxiety: 0 };
    answers.forEach((ans) => {
      counts[ans.domain] = (counts[ans.domain] || 0) + ans.weight;
    });

    let topDomain = "parenting";
    let maxVal = -1;
    Object.entries(counts).forEach(([dom, val]) => {
      if (val > maxVal) {
        maxVal = val;
        topDomain = dom;
      }
    });

    const localizedTitles: Record<string, Record<QuizLanguage, string>> = {
      parenting: {
        en: "Parenting & Family Dynamics Coaching",
        hi: "पेरेंटिंग एवं पारिवारिक परामर्श",
        gu: "પેરેન્ટિંગ અને કૌટુંબિક માર્ગદર્શન",
      },
      relationship: {
        en: "Relationship Repair & Couples Counseling",
        hi: "संबंध सुधार एवं दंपत्ति परामर्श",
        gu: "સંબંધ સુધારણા અને દંપતી કાઉન્સેલિંગ",
      },
      burnout: {
        en: "Executive Burnout & Life Coaching",
        hi: "एग्जीक्यूटिव बर्नआउट एवं लाइफ कोचिंग",
        gu: "એક્ઝિક્યુટિવ બર્નઆઉટ અને લાઈફ કોચિંગ",
      },
    };

    const localizedDesc: Record<string, Record<QuizLanguage, string>> = {
      parenting: {
        en: "Your responses indicate parenting friction, child behavior stress, or family disconnect. Guided 1-on-1 sessions with me will equip you with calm routine structures, behavioral scripts, and peaceful home frameworks.",
        hi: "आपके उत्तर बच्चों के पालन-पोषण में तनाव और पारिवारिक मतभेद दर्शाते हैं। निकुंज धानाणी के साथ 1-ऑन-1 परामर्श से आपको शांत दिनचर्या, बच्चों से बातचीत के तरीके और पारिवारिक शांति के उपाय मिलेंगे।",
        gu: "તમારા જવાબો બાળકોના પાલન-પોષણમાં તણાવ અને કૌટુંબિક મતભેદ દર્શાવે છે. નિકુંજ ધાનાણી સાથે 1-ઓન-1 માર્ગદર્શનથી તમને શાંત દિનચર્યા, બાળકો સાથે વાતચીતના રસ્તા અને કૌટુંબિક શાંતિ મળશે।",
      },
      relationship: {
        en: "Your assessment highlights misaligned communication cycles or emotional distance with your spouse. My structured couples framework helps break repetitive arguments and rebuild mutual warmth, trust, and intimacy.",
        hi: "आपके उत्तर जीवनसाथी के साथ बातचीत की कमी और भावनात्मक दूरी दर्शाते हैं। निकुंज धानाणी का विशेष ढांचा बार-बार के झगड़ों को रोककर आपसी प्यार और विश्वास दोबारा कायम करने में मदद करता है।",
        gu: "તમારા જવાબો જીવનસાથી સાથે વાતચીતનો અભાવ અને અંતર દર્શાવે છે. નિકુંજ ધાનાણીનું વિશેષ માળખું વારંવારના ઝઘડા અટકાવીને પરસ્પર પ્રેમ અને વિશ્વાસ ફરી બનાવવામાં મદદ કરે છે.",
      },
      burnout: {
        en: "Your answers indicate executive decision fatigue, work-to-home stress leakage, or personal anxiety. 1-on-1 coaching with me provides evidence-based stress regulation tools to safeguard your mental peace and clarity.",
        hi: "आपका मूल्यांकन कार्यस्थल के तनाव, अनिद्रा या मानसिक थकान को दर्शाता है। 1-ऑन-1 परामर्श आपको मानसिक शांति, कार्य-जीवन संतुलन और निर्णय लेने की स्पष्टता प्रदान करता है।",
        gu: "તમારું મૂલ્યાંકન કામનો તણાવ, અનિદ્રા અથવા માનસિક થાક દર્શાવે છે. 1-ઓન-1 માર્ગદર્શન તમને માનસિક શાંતિ, કાર્ય-જીવન સંતુલન અને નિર્ણય લેવાની સ્પષ્ટતા આપે છે.",
      },
    };

    const serviceParams: Record<string, string> = {
      parenting: "Parenting Coaching",
      relationship: "Relationship Repair",
      burnout: "Counselling & Life Coaching",
    };

    const selKey = topDomain === "relationship" ? "relationship" : topDomain === "burnout" ? "burnout" : "parenting";

    return {
      title: localizedTitles[selKey][currentLanguage],
      desc: localizedDesc[selKey][currentLanguage],
      param: serviceParams[selKey],
    };
  };

  const recResult = computeRecommendation();
  const currentQuestionNode = getQuestionForStep(stepIndex);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E2C24]/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden border border-[#E6DEC8] my-auto text-[#2E2A26] flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#FAF6F0] px-5 py-3.5 border-b border-[#E6DEC8] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#6B7F62] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <LeafMotif className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif-display font-bold text-sm sm:text-base text-[#1E2C24] truncate">
                Stress & Clarity Check-in
              </h3>
              <span className="text-[10px] text-[#5E5852] truncate block -mt-0.5">
                {currentLanguage === "hi" ? "निकुंज धानाणी द्वारा संचालित" : currentLanguage === "gu" ? "નિકુંજ ધાનાણી દ્વારા સંચાલિત" : "By Nikunj Dhanani"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {lang && (
              <button
                onClick={() => setStepIndex(0)}
                className="px-2.5 py-1 rounded-full bg-[#EBF0E8] text-[#4A5A43] hover:bg-[#6B7F62] hover:text-white text-[11px] font-bold transition-all flex items-center space-x-1 border border-[#6B7F62]/20 shadow-2xs"
                title="Change Language"
              >
                <Globe className="w-3 h-3" />
                <span className="uppercase">{lang}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#8C847C] hover:text-[#1E2C24] hover:bg-[#EBF0E8] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar for 7 Total Steps */}
        {stepIndex > 0 && stepIndex < 8 && (
          <div className="w-full bg-[#E6DEC8]/40 h-1.5 shrink-0">
            <div
              className="bg-[#C97B5B] h-1.5 transition-all duration-300 ease-out"
              style={{ width: `${(stepIndex / 7) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Modal Scrollable Container */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* STEP 0: LANGUAGE SELECTION */}
          {stepIndex === 0 && (
            <div className="space-y-5 text-center animate-fade-in py-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EBF0E8] to-[#D5E2D1] text-[#6B7F62] flex items-center justify-center mx-auto border border-[#6B7F62]/30 shadow-xs">
                <Globe className="w-7 h-7 text-[#6B7F62]" />
              </div>

              <div className="space-y-1.5">
                <span className="px-3 py-0.5 rounded-full bg-[#C97B5B]/15 text-[#C97B5B] text-[11px] font-extrabold uppercase tracking-wider inline-block">
                  Language • भाषा • ભાષા
                </span>
                <h4 className="text-2xl font-serif-display font-bold text-[#1E2C24]">
                  Select your language:
                </h4>
                <p className="text-xs text-[#5E5852]">
                  Choose your preferred language for a clear self-assessment:
                </p>
              </div>

              <div className="space-y-3 max-w-md mx-auto pt-1">
                <button
                  onClick={() => handleSelectLanguage("en")}
                  className="w-full p-3.5 rounded-2xl border-2 border-[#E6DEC8] hover:border-[#6B7F62] bg-[#FAF6F0] hover:bg-[#FFFDF9] transition-all flex items-center justify-between group text-left shadow-2xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div>
                      <span className="font-bold text-sm text-[#1E2C24] block group-hover:text-[#6B7F62] transition-colors">
                        English
                      </span>
                      <span className="text-[11px] text-[#8C847C]">Take assessment in English</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#EBF0E8] group-hover:bg-[#6B7F62] group-hover:text-white text-[#6B7F62] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                <button
                  onClick={() => handleSelectLanguage("hi")}
                  className="w-full p-3.5 rounded-2xl border-2 border-[#E6DEC8] hover:border-[#C97B5B] bg-[#FFF5EE] hover:bg-[#FFFDF9] transition-all flex items-center justify-between group text-left shadow-2xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🇮🇳</span>
                    <div>
                      <span className="font-bold text-sm text-[#1E2C24] block group-hover:text-[#C97B5B] transition-colors">
                        हिंदी (Hindi)
                      </span>
                      <span className="text-[11px] text-[#8C847C]">हिंदी में आसान सवाल-जवाब करें</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#F9EFEA] group-hover:bg-[#C97B5B] group-hover:text-white text-[#C97B5B] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                <button
                  onClick={() => handleSelectLanguage("gu")}
                  className="w-full p-3.5 rounded-2xl border-2 border-[#E6DEC8] hover:border-[#D98A2B] bg-[#FFF8EE] hover:bg-[#FFFDF9] transition-all flex items-center justify-between group text-left shadow-2xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🇮🇳</span>
                    <div>
                      <span className="font-bold text-sm text-[#1E2C24] block group-hover:text-[#D98A2B] transition-colors">
                        ગુજરાતી (Gujarati)
                      </span>
                      <span className="text-[11px] text-[#8C847C]">ગુજરાતીમાં સરળતાથી જવાબ આપો</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#FFF0DB] group-hover:bg-[#D98A2B] group-hover:text-white text-[#D98A2B] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* QUESTIONS STEPS (1-3, 5-7) */}
          {currentQuestionNode && (
            <div className="space-y-4 text-left animate-fade-in">
              <div className="flex items-center justify-between text-xs font-semibold text-[#5E5852]">
                <button
                  onClick={handleGoBack}
                  className="inline-flex items-center text-[#6B7F62] hover:text-[#C97B5B] transition-colors text-xs font-bold"
                >
                  <ChevronLeft className="w-4 h-4 mr-0.5" />
                  {currentLanguage === "hi" ? "पीछे" : currentLanguage === "gu" ? "પાછા" : "Back"}
                </button>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0E8] text-[#4A5A43] text-[11px] font-bold">
                  {currentQuestionNode.category[currentLanguage]}
                </span>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-serif-display font-bold text-[#1E2C24] leading-snug">
                  {currentQuestionNode.question[currentLanguage]}
                </h4>
                <p className="text-xs text-[#5E5852] mt-0.5">
                  {currentQuestionNode.subtitle[currentLanguage]}
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {currentQuestionNode.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 bg-gradient-to-r ${opt.bgGradient} hover:shadow-xs transition-all duration-200 flex items-start space-x-3 group`}
                  >
                    <span className="text-xl shrink-0 mt-0.5 p-1.5 rounded-xl bg-white shadow-2xs">
                      {opt.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-white/90 text-[#1E2C24] text-[10px] font-extrabold uppercase tracking-wider mb-1 border border-[#E6DEC8]/60">
                        {opt.badge[currentLanguage]}
                      </span>
                      <p className="text-xs font-semibold text-[#1E2C24] leading-relaxed group-hover:text-[#6B7F62] transition-colors">
                        {opt.label[currentLanguage]}
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/90 group-hover:bg-[#6B7F62] group-hover:text-white text-[#6B7F62] flex items-center justify-center shrink-0 self-center transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: MID-QUIZ LEAD CAPTURE FORM */}
          {stepIndex === 4 && (
            <div className="space-y-4 animate-fade-in text-left">
              <div className="flex items-center justify-between text-xs font-semibold text-[#5E5852]">
                <button
                  onClick={handleGoBack}
                  className="inline-flex items-center text-[#6B7F62] hover:text-[#C97B5B] transition-colors text-xs font-bold"
                >
                  <ChevronLeft className="w-4 h-4 mr-0.5" />
                  {currentLanguage === "hi" ? "पीछे" : currentLanguage === "gu" ? "પાછા" : "Back"}
                </button>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0E8] text-[#4A5A43] text-[11px] font-bold">
                  {currentLanguage === "hi" ? "चरण 4 ऑफ 7 • व्यक्तिगत विवरणी" : currentLanguage === "gu" ? "પગલું 4 ના 7 • વ્યક્તિગત વિગત" : "Step 4 of 7 • Personal Profile"}
                </span>
              </div>

              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E6DEC8] space-y-1.5">
                <div className="flex items-center space-x-1.5 text-[#C97B5B]">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {currentLanguage === "hi" ? "100% गोपनीय एवं सुरक्षित" : currentLanguage === "gu" ? "100% ખાનગી અને સુરક્ષિત" : "100% Confidential"}
                  </span>
                </div>
                <h4 className="text-xl font-serif-display font-bold text-[#1E2C24]">
                  {currentLanguage === "hi"
                    ? "परिणाम प्राप्त करने के लिए नाम और नंबर दर्ज करें:"
                    : currentLanguage === "gu"
                    ? "પરિણામ મેળવવા માટે નામ અને નંબર દાખલ કરો:"
                    : "Unlock Your Assessment Guidance:"}
                </h4>
                <p className="text-xs text-[#5E5852] leading-relaxed">
                  {currentLanguage === "hi"
                    ? "आपकी जानकारी सुरक्षित रहेगी और इसका उपयोग केवल निकुंज के साथ आपकी परामर्श रिपोर्ट जोड़ने में होगा:"
                    : currentLanguage === "gu"
                    ? "તમારી વિગત સુરક્ષિત રહેશે અને તેનો ઉપયોગ માત્ર માર્ગદર્શન રિપોર્ટ જોડવા માટે થશે:"
                    : "Your details remain strictly confidential and link directly to your assessment report:"}
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#1E2C24] mb-1 flex items-center justify-between">
                    <span>{currentLanguage === "hi" ? "पूरा नाम *" : currentLanguage === "gu" ? "પૂરું નામ *" : "Full Name *"}</span>
                    {isNameValid && <span className="text-[10px] text-[#6B7F62] font-bold flex items-center"><Check className="w-3 h-3 mr-0.5" /> OK</span>}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C847C] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder={currentLanguage === "hi" ? "उदा. राहुल शर्मा" : currentLanguage === "gu" ? "દા.ત. રાહુલ શર્મા" : "e.g. Ananya Sharma"}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#E6DEC8] text-xs focus:outline-none focus:border-[#6B7F62] bg-[#FAF6F0] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2C24] mb-1 flex items-center justify-between">
                    <span>{currentLanguage === "hi" ? "मोबाइल नंबर (10 अंक) *" : currentLanguage === "gu" ? "મોબાઈલ નંબર (10 અંક) *" : "WhatsApp Mobile (10 digits) *"}</span>
                    {isPhoneValid ? (
                      <span className="text-[10px] text-[#6B7F62] font-bold flex items-center bg-[#EBF0E8] px-2 py-0.5 rounded-full"><Check className="w-3 h-3 mr-0.5" /> 10 Digits Valid</span>
                    ) : phoneTouched && (
                      <span className="text-[10px] text-red-600 font-bold flex items-center"><AlertCircle className="w-3 h-3 mr-0.5" /> 10 digits required</span>
                    )}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C847C] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={leadForm.phone}
                      onBlur={() => setPhoneTouched(true)}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, "") })}
                      placeholder="e.g. 9925060609"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none bg-[#FAF6F0] transition-colors ${
                        isPhoneValid ? "border-[#6B7F62] ring-2 ring-[#6B7F62]/20" : phoneTouched ? "border-red-400" : "border-[#E6DEC8]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2C24] mb-1">
                    <span>{currentLanguage === "hi" ? "ईमेल पता (वैकल्पिक)" : currentLanguage === "gu" ? "ઈમેઈલ એડ્રેસ (વૈકલ્પિક)" : "Email Address (Optional)"}</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C847C] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#E6DEC8] text-xs focus:outline-none focus:border-[#6B7F62] bg-[#FAF6F0]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isLeadFormValid || isSubmitting}
                  className={`w-full py-3.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2 ${
                    isLeadFormValid && !isSubmitting
                      ? "bg-[#C97B5B] hover:bg-[#BD5C3D] text-white glow-btn"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <span>
                    {isSubmitting
                      ? "Processing..."
                      : currentLanguage === "hi"
                      ? "आकलन जारी रखें (प्रश्न 4)"
                      : currentLanguage === "gu"
                      ? "મૂલ્યાંકન આગળ ધપાવો (પ્રશ્ન 4)"
                      : "Continue Assessment (Question 4)"}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            </div>
          )}

          {/* STEP 8: FINAL DIAGNOSIS & DIRECT ACTION CARD */}
          {stepIndex === 8 && (
            <div className="text-center space-y-5 animate-fade-in py-1">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C97B5B] shadow-md relative">
                  <Image
                    src="/03.png"
                    alt="Nikunj Dhanani Counselor"
                    fill
                    className="object-cover object-[center_15%]"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#25D366] text-white p-1 rounded-full border-2 border-white shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#EBF0E8] text-[#4A5A43] border border-[#6B7F62]/30">
                  ✨ 96% Match • {currentLanguage === "hi" ? "मूल्यांकन रिपोर्ट" : currentLanguage === "gu" ? "મૂલ્યાંકન રિપોર્ટ" : "Report Ready"}
                </span>
                <h4 className="text-2xl font-serif-display font-bold text-[#1E2C24]">
                  {recResult.title}
                </h4>
              </div>

              <div className="bg-[#FAF6F0] p-4.5 rounded-2xl border border-[#E6DEC8] text-left space-y-3 shadow-2xs">
                <p className="text-xs text-[#5E5852] leading-relaxed">
                  {recResult.desc}
                </p>

                {leadForm.name && (
                  <div className="pt-2 border-t border-[#E6DEC8] text-xs text-[#1E2C24] font-semibold flex items-center justify-between">
                    <span>{leadForm.name}</span>
                    <span className="text-[#6B7F62] text-[11px] font-bold bg-white px-2 py-0.5 rounded-full border border-[#E6DEC8]">
                      📱 +91 {cleanPhone}
                    </span>
                  </div>
                )}
              </div>

              {/* Direct High-Converting Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                <a
                  href={`https://wa.me/919925060609?text=${encodeURIComponent(
                    `Hi Nikunj, I completed the stress assessment in ${currentLanguage.toUpperCase()}.\nName: ${leadForm.name || "Visitor"}\nPhone: ${cleanPhone}\nGuidance Goal: ${recResult.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  {currentLanguage === "hi" ? "व्हाट्सएप पर बात करें" : currentLanguage === "gu" ? "વોટ્સએપ પર વાત કરો" : "Send Report to Me on WhatsApp"}
                </a>

                <Link
                  href={`/contact?service=${encodeURIComponent(recResult.param)}&name=${encodeURIComponent(leadForm.name)}&phone=${encodeURIComponent(cleanPhone)}#booking`}
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-all shadow-md"
                >
                  {currentLanguage === "hi" ? "अपॉइंटमेंट बुक करें" : currentLanguage === "gu" ? "સત્ર બુક કરો" : `Book 1-on-1 Session`}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>

              <button
                onClick={handleReset}
                className="text-xs font-semibold text-[#8C847C] hover:text-[#1E2C24] underline pt-1 block mx-auto"
              >
                {currentLanguage === "hi" ? "पुनः टेस्ट शुरू करें" : currentLanguage === "gu" ? "ફરી ટેસ્ટ શરૂ કરો" : "Retake Assessment"}
              </button>

            </div>
          )}

        </div>

        {/* Security Footer */}
        <div className="px-5 py-2.5 bg-[#FAF6F0] border-t border-[#E6DEC8] text-center flex items-center justify-center space-x-1.5 text-[11px] text-[#8C847C] shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6B7F62]" />
          <span>
            {currentLanguage === "hi"
              ? "🔒 100% गोपनीय एवं नि:शुल्क आत्म-मूल्यांकन"
              : currentLanguage === "gu"
              ? "🔒 100% ખાનગી અને નિઃશુલ્ક આત્મ-મૂલ્યાંકન"
              : "🔒 100% Confidential & Free Assessment"}
          </span>
        </div>

      </div>
    </div>
  );
}
