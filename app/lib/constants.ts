import { Plan } from "./types";

export const nav_items = [
  {
    id: "home",
    name: "Home",
    href: "/",
  },
  {
    id: "how-it-works",
    name: "How it works",
    href: "/how-it-works",
  },
  {
    id: "pricing",
    name: "Pricing",
    href: "/pricing",
  },
];
export const features = [
  {
    id: 1,
    name: "Live, Real-Time Phone Calls",
  },
  {
    id: 2,
    name: "Personalized Conversations",
  },
  {
    id: 3,
    name: "Magical Caller ID: “Santa&lsquo;s House”",
  },
  {
    id: 4,
    name: "On-Demand Scheduling",
  },
  {
    id: 5,
    name: "Speak with Other Characters",
  },
  {
    id: 6,
    name: "Recording Add-On Option",
  },
  {
    id: 7,
    name: "Affordable Pricing",
  },
  {
    id: 8,
    name: "Real-Time Magic Experience",
  },
  {
    id: 9,
    name: "Exclusive Christmas Eve Calls",
  },
  {
    id: 10,
    name: "No Waiting in Line",
  },
  {
    id: 11,
    name: "COVID-Safe Option",
  },
];
export const SantaPhoneCalls = [
  {
    id: 1,
    name: "(AI-Powered, Dynamic)",
  },
  {
    id: 2,
    name: "(Child&lsquo;s Details Adapted)",
  },
  {
    id: 3,
    name: "",
  },
  {
    id: 4,
    name: "Anytime",
  },
  {
    id: 5,
    name: "(Elevs, Mrs.Claus)",
  },
  {
    id: 6,
    name: "(4.95)",
  },
  {
    id: 7,
    name: "($9.99)",
  },
  {
    id: 8,
    name: "",
  },
  {
    id: 9,
    name: "(Highlight Booking)",
  },
  {
    id: 10,
    name: "(Instant Access)",
  },
  {
    id: 11,
    name: "",
  },
];
export const PNP = [
  {
    id: 1,
    name: "(Pre-recorded only)",
    status: "cross",
  },
  {
    id: 2,
    name: "(Limited personalization)",
    status: "tick",
  },
  {
    id: 3,
    name: "",
    status: "cross",
  },
  {
    id: 4,
    name: "(Limited personalization)",
    status: "cross",
  },
  {
    id: 5,
    name: "",
    status: "cross",
  },
  {
    id: 6,
    name: "",
    status: "cross",
  },
  {
    id: 7,
    name: "($14.99 and up)",
    status: "tick",
  },
  {
    id: 8,
    name: "",
    status: "cross",
  },
  {
    id: 9,
    name: "",
    status: "cross",
  },
  {
    id: 10,
    name: "",
    status: "tick",
  },
  {
    id: 11,
    name: "",
    status: "tick",
  },
];
export const MessageFromSanta = [
  {
    id: 1,
    name: "(Automated calls only)",
    status: "cross",
  },
  {
    id: 2,
    name: "(Generic content)",
    status: "cross",
  },
  {
    id: 3,
    name: "",
    status: "cross",
  },
  {
    id: 4,
    name: "(Generic content)",
    status: "cross",
  },
  {
    id: 5,
    name: "",
    status: "cross",
  },
  {
    id: 6,
    name: "",
    status: "cross",
  },
  {
    id: 7,
    name: "(Starting at $9.99)",
    status: "tick",
  },
  {
    id: 8,
    name: "",
    status: "cross",
  },
  {
    id: 9,
    name: "",
    status: "cross",
  },
  {
    id: 10,
    name: "",
    status: "tick",
  },
  {
    id: 11,
    name: "",
    status: "tick",
  },
];
export const MallSantaExperience = [
  {
    id: 1,
    name: "(In-person only)",
    status: "cross",
  },
  {
    id: 2,
    name: "(Basic interaction)",
    status: "tick",
  },
  {
    id: 3,
    name: "",
    status: "cross",
  },
  {
    id: 4,
    name: "(Set mall hours)",
    status: "cross",
  },
  {
    id: 5,
    name: "",
    status: "cross",
  },
  {
    id: 6,
    name: "",
    status: "cross",
  },
  {
    id: 7,
    name: "($20-$50 per visit)",
    status: "cross",
  },
  {
    id: 8,
    name: "(Limited to in-person)",
    status: "tick",
  },
  {
    id: 9,
    name: "",
    status: "cross",
  },
  {
    id: 10,
    name: "(Long wait times)",
    status: "cross",
  },
  {
    id: 11,
    name: "(Crowded environment)",
    status: "cross",
  },
];
export const plans: Plan[] = [
  {
    id: 1,
    name: "Talk to Santa",
    description:
      "A one-time, personalized call from Santa, perfect for creating a magical moment that will surprise your child or loved one with joyful holiday cheer they’ll remember forever.",
    price: 9.95,
    per: "/ Call",
    hasRecording: false,
  },
  {
    id: 2,
    name: "Includes Recording",
    description:
      "A five-minute personalized call from Santa, including a special recording so you can relive the magic and cherished memories of this moment for years to come.",
    price: 14.95,
    per: "/ Recording",
    hasRecording: true,
  },
  {
    id: 3,
    name: "Santa's Family Bundle",
    description:
      "A one-time, personalized call from Santa for the whole family, creating a magical moment that fills everyone with joyful holiday cheer they’ll remember forever.",
    price: 19.95,
    per: "/ Call",
    hasRecording: false,
  },
];
