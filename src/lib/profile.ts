export const PROFILE = {
  name: 'Shubh Sharma',
  role: 'Full-Stack & AI Engineer',
  email: 'ss1188@srmist.edu.in',
  phone: '+91-9897204232',
  location: 'Delhi NCR · IST (UTC+5:30)',
  github: 'https://github.com/shubhsharma2006',
  linkedin: 'https://linkedin.com/in/shubh-sharma',
  available: true,
  responseTime: '< 24h',
  education: [
    {
      school: 'SRM IST Ghaziabad',
      degree: 'B.Tech, CS & Engineering (Data Science)',
      detail: 'CGPA 7.8 / 10',
      year: '2023 — 2027',
    },
    {
      school: 'Dayawati Modi Public School',
      degree: 'Class XII · CBSE (MPC)',
      detail: '63%',
      year: '2023',
    },
    {
      school: 'Dayawati Modi Public School',
      degree: 'Class X · CBSE',
      detail: '86%',
      year: '2021',
    },
  ],
  certifications: [
    { name: 'IBM RAG & Agentic AI', issuer: 'Coursera', year: 'Feb 2026' },
    { name: 'IBM Machine Learning', issuer: 'Coursera', year: 'Feb 2026' },
    { name: 'IBM AI Developer', issuer: 'Coursera', year: 'Feb 2026' },
    { name: 'SAP Business Analyst', issuer: 'Coursera', year: 'Feb 2026' },
  ],
};

export const LOG_LINES = [
  { lvl: 'INFO', msg: 'shipped POST /api/stock/in (rbac=MANAGER)' },
  { lvl: 'OK',   msg: 'invalid_records 14.8% → 1.7% (-87%)' },
  { lvl: 'INFO', msg: 'mongoose index applied: stock.serial_no (+25% read)' },
  { lvl: 'OK',   msg: 'pm2 cluster scaled to 4 workers · zero-downtime' },
  { lvl: 'INFO', msg: 'jwt rotated · http-only · sameSite=strict' },
  { lvl: 'OK',   msg: 'p95 latency 412ms → 338ms (-18%)' },
  { lvl: 'INFO', msg: 'helmet csp + hsts enabled on 30+ routes' },
  { lvl: 'OK',   msg: 'rag fusion(vote): 3 models → 1 answer · 3× tput' },
  { lvl: 'INFO', msg: 'pruning gates lr=8× · sparsity ↑ acc=0.91' },
  { lvl: 'OK',   msg: 'docker build + nginx reverse proxy: green' },
  { lvl: 'WARN', msg: 'rate-limit hit on /auth/login · 12 IPs blocked' },
  { lvl: 'INFO', msg: 'socket.io broadcast: stock_update · 47 clients' },
  { lvl: 'OK',   msg: 'audit ledger append: serial=AS-2031 · immutable' },
  { lvl: 'INFO', msg: 'qdrant upsert: 1,204 vectors · nomic-embed-text' },
];

export const HERO_METRICS = [
  { label: 'data_errors', value: '-87%', trend: 'down' as const, ok: true },
  { label: 'api_latency', value: '-18%', trend: 'down' as const, ok: true },
  { label: 'rag_throughput', value: '3×', trend: 'up' as const, ok: true },
  { label: 'nn_accuracy', value: '0.91', trend: 'up' as const, ok: true },
];
