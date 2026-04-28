export const TRACKS = ["Frontend", "Backend", "Database"];

export const SKILLS_BY_TRACK = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Vue", "Angular", "TypeScript"],
  Backend: [".NET", "Java", "PHP", "Python", "Node.js", "Go", "Ruby"],
  Database: ["MongoDB", "MySQL", "PostgreSQL", "SQLite", "Redis", "Oracle"],
};

export const SOFT_SKILL_QUESTIONS = [
  { id: "ss1", text: "You complete things methodically without skipping steps" },
  { id: "ss2", text: "Your work style is more spontaneous than organized" },
  { id: "ss3", text: "You avoid leadership roles in group settings" },
  { id: "ss4", text: "You try to understand different perspectives" },
  { id: "ss5", text: "You stay calm under pressure" },
  { id: "ss6", text: "You enjoy group activities" },
  { id: "ss7", text: "You find networking with strangers difficult" },
  { id: "ss8", text: "You rely more on emotions than facts" },
];

export const PERSONALITY_QUESTIONS = [
  { id: "p1",  text: "I like experimenting with new ideas" },
  { id: "p2",  text: "I feel discouraged easily" },
  { id: "p3",  text: "I feel energized around people" },
  { id: "p4",  text: "I pay attention to details" },
  { id: "p5",  text: "I track responsibilities carefully" },
  { id: "p6",  text: "I start conversations easily" },
  { id: "p7",  text: "I am cooperative and helpful" },
  { id: "p8",  text: "I follow schedules strictly" },
  { id: "p9",  text: "I feel satisfied completing tasks efficiently" },
  { id: "p10", text: "I have a vivid imagination" },
  { id: "p11", text: "I double-check my work" },
  { id: "p12", text: "I avoid conflict when possible" },
];

export const OPPORTUNITIES = [
  {
    id: 1, title: "Frontend Developer Volunteer",
    org: "CodeForGood", type: "Part Time",
    location: "Remote",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2, title: "Backend Engineer (NGO Platform)",
    org: "OpenHelp Foundation", type: "Full Time",
    location: "Cairo, Egypt",
    skills: ["Node.js", "PostgreSQL", ".NET"],
  },
  {
    id: 3, title: "Database Volunteer Intern",
    org: "DataAid", type: "Part Time",
    location: "Remote",
    skills: ["MongoDB", "MySQL"],
  },
  {
    id: 4, title: "UI Engineer — Education Platform",
    org: "LearnTogether", type: "Full Time",
    location: "Alexandria, Egypt",
    skills: ["React", "Tailwind", "TypeScript"],
  },
  {
    id: 5, title: "API Developer (Health Tech)",
    org: "MediConnect", type: "Part Time",
    location: "Remote",
    skills: ["Python", "PostgreSQL"],
  },
  {
    id: 6, title: "Junior Full-Stack Volunteer",
    org: "GreenFuture", type: "Full Time",
    location: "Giza, Egypt",
    skills: ["React", "Node.js", "MongoDB"],
  },
];
