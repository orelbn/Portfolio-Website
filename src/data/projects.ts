export const projects = [
  {
    id: "stride",
    title: "Stride",
    description:
      "Desktop application for engineering calculations and documentation that handles large-context state management and implements a custom graph-based algorithm for efficient handling of calculations.",
    technologies: ["ElectronJS", "TypeScript", "React", "Lexical"],
    type: "demo",
    icon: "play",
    iconColor: "text-emerald-500",
    youtubeId: "XPzxfn-JzOI",
  },
  {
    id: "shenko-ai",
    title: "Shenko AI",
    description: "An AI assistant tailored towards the structural engineering field.",
    technologies: ["AI SDK", "Python", "Typescript", "NEXT JS"],
    type: "demo",
    icon: "play",
    iconColor: "text-purple-500",
    youtubeId: "9GODaWLucRY",
  },
  {
    id: "aws-room-booking",
    title: "AWS Room Booking System",
    description:
      "Led technical development of a meeting room booking system for a team of 8. Built with full-stack AWS infrastructure including CDK, Lambda, and RDS.",
    technologies: ["AWS CDK", "TypeScript", "React", "MySQL"],
    type: "demo",
    icon: "play",
    iconColor: "text-blue-400",
    youtubeId: "fr-xWYn6R74",
  },

  {
    id: "more-projects",
    title: "More Projects",
    description:
      "View all my projects on GitHub including YogaVision (🥇 hackathon winner), easyWriting, SpeechScript, navigatr, and CodeBank.",
    technologies: [],
    type: "portfolio",
    icon: "github",
    iconColor: "text-gray-500",
    href: "https://github.com/orelbn",
    customImage: "/orel-github.webp",
  },
];

export type Project = (typeof projects)[number];
