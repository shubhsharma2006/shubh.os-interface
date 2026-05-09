export type Skill = { name: string; level: number };
export type SkillGroup = { group: string; items: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', level: 92 },
      { name: 'JavaScript / TS', level: 88 },
      { name: 'C++', level: 72 },
      { name: 'Java', level: 70 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    group: 'Backend & APIs',
    items: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'FastAPI / Flask', level: 84 },
      { name: 'Django', level: 76 },
      { name: 'REST + Socket.IO', level: 88 },
      { name: 'JWT / RBAC', level: 92 },
    ],
  },
  {
    group: 'Databases',
    items: [
      { name: 'MongoDB', level: 90 },
      { name: 'MySQL', level: 84 },
      { name: 'Qdrant (vectors)', level: 78 },
      { name: 'Redis', level: 75 },
    ],
  },
  {
    group: 'DevOps & Infra',
    items: [
      { name: 'Docker', level: 85 },
      { name: 'Nginx', level: 80 },
      { name: 'PM2 cluster', level: 82 },
      { name: 'Linux / CI-CD', level: 78 },
    ],
  },
  {
    group: 'AI / ML',
    items: [
      { name: 'PyTorch', level: 80 },
      { name: 'RAG / Agentic AI', level: 84 },
      { name: 'Explainable AI', level: 75 },
      { name: 'NumPy / Stats', level: 86 },
    ],
  },
  {
    group: 'Security',
    items: [
      { name: 'Helmet / CSP / HSTS', level: 85 },
      { name: 'NoSQL injection guard', level: 88 },
      { name: 'Rate limiting / CORS', level: 85 },
      { name: 'HTTP-only cookies', level: 90 },
    ],
  },
];

export const DOMAINS = [
  {
    title: 'Backend Systems',
    body: '30+ REST endpoints, 4-tier RBAC, real-time WebSockets, ledger-based audit trails.',
    tag: 'PRODUCTION',
  },
  {
    title: 'DevOps & Deploy',
    body: 'Dockerised services, Nginx HTTPS reverse proxy, PM2 cluster mode, CI/CD-ready pipelines on Linux.',
    tag: 'CLOUD-NATIVE',
  },
  {
    title: 'AI / ML',
    body: 'Multi-model RAG fusion, self-pruning networks, IBM-certified in ML, RAG, Agentic AI.',
    tag: 'IBM-CERTIFIED',
  },
  {
    title: 'Security Hardening',
    body: 'JWT in HTTP-only cookies, NoSQL injection guards, CSP/HSTS, rate limiting, server-side validation.',
    tag: 'DEFENSIVE',
  },
];

export const STATS = [
  { value: '87%', label: 'Data errors ↓', sub: '15% → <2%' },
  { value: '25%', label: 'Faster retrieval', sub: 'Mongo indexing' },
  { value: '3×', label: 'RAG throughput', sub: '3-model fusion' },
  { value: '0.91', label: 'Test accuracy', sub: 'Self-pruning NN' },
];

export const TOOLS = [
  'Git', 'GitHub', 'Postman', 'Docker', 'Nginx', 'PM2', 'VS Code',
  'Ollama', 'Qdrant', 'Redis', 'Socket.IO', 'Drizzle', 'tRPC', 'React Flow',
];
