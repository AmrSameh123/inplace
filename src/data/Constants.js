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

export const ORG_REQUIREMENT_QUESTIONS = [
  { id: "req1", text: "We need volunteers to work strictly methodically." },
  { id: "req2", text: "We require volunteers to be comfortable with spontaneous tasks." },
  { id: "req3", text: "We prefer volunteers who can take on leadership roles." },
  { id: "req4", text: "We look for volunteers who can quickly adapt to changing priorities." },
  { id: "req5", text: "We need volunteers who remain highly composed under pressure." },
];

export const TRACK_QUESTIONS = {
  Frontend: [
    { id: "fe1", text: "Do you need a volunteer who is familiar with responsive design and mobile-first approach?" },
    { id: "fe2", text: "Is knowledge of modern UI libraries (like Framer Motion or Bootstrap) essential?" },
    { id: "fe3", text: "Does the project require high attention to visual accessibility (WCAG)?" }
  ],
  Backend: [
    { id: "be1", text: "Does the role involve designing and documenting RESTful or GraphQL APIs?" },
    { id: "be2", text: "Is experience with server-side security and authentication (JWT, OAuth) required?" },
    { id: "be3", text: "Will the volunteer need to manage server deployment or CI/CD pipelines?" }
  ],
  Database: [
    { id: "db1", text: "Do you need someone to perform complex database migrations and schema design?" },
    { id: "db2", text: "Is optimization of large-scale queries and indexing a key requirement?" },
    { id: "db3", text: "Does the project involve sensitive data that requires high-level encryption?" }
  ]
};

export const SKILL_QUESTIONS = {
  "HTML": [{ id: "s_html", text: "Is semantic HTML5 and SEO optimization a priority for this project?" }],
  "CSS": [{ id: "s_css", text: "Do you require expertise in advanced CSS techniques like Grid and Flexbox?" }],
  "JavaScript": [{ id: "s_js", text: "Is deep knowledge of Asynchronous JS and ES6+ features necessary?" }],
  "React": [{ id: "s_react", text: "Do you need experience with state management (Redux, Toolkit, or Context API)?" }],
  "Node.js": [{ id: "s_node", text: "Is familiarity with Express.js or NestJS middleware required?" }],
  "MongoDB": [{ id: "s_mongo", text: "Does the project involve complex aggregation pipelines in NoSQL?" }],
  "MySQL": [{ id: "s_sql", text: "Do you require the volunteer to write complex stored procedures or triggers?" }],
  "Python": [{ id: "s_py", text: "Is knowledge of Django or Flask frameworks essential for this role?" }],
};

export const ORG_CULTURE_QUESTIONS = [
  { id: "cul1", text: "Our environment involves a lot of group collaboration." },
  { id: "cul2", text: "We expect volunteers to frequently network with external partners." },
  { id: "cul3", text: "Our work culture values creative experimentation over strict rules." },
  { id: "cul4", text: "We require high attention to detail in day-to-day tasks." },
  { id: "cul5", text: "We follow fixed schedules and deadlines very strictly." },
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
