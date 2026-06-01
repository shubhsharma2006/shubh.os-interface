export type ImpactMetric = { label: string; value: string; delta?: string };
export type ProjectCategory = 'All' | 'Systems' | 'AI' | 'Full-Stack' | 'DevTool';
export type DiagramType = 'compiler' | 'workflow' | 'rag' | 'analytics';

export type Project = {
  id: string;
  name: string;
  type: string;
  category: Exclude<ProjectCategory, 'All'>;
  status: 'LIVE' | 'ACTIVE' | 'BETA' | 'ARCHIVED';
  blurb: string;
  stack: string[];
  github?: string;
  live?: string;
  size: 'lg' | 'md' | 'sm';
  metric?: { label: string; value: string };
  diagram: DiagramType;

  // Case study
  timeline: string;
  role: string;
  cover: string;
  problem: string;
  approach: string[];
  outcome: string;
  impact: ImpactMetric[];
  architecture: string[];
};

const COVERS = {
  acustock: 'linear-gradient(135deg,#4F6EF7 0%,#8B5CF6 60%,#0a0a14 100%)',
  compiler: 'linear-gradient(135deg,#06B6D4 0%,#4F6EF7 100%)',
  hr: 'linear-gradient(135deg,#8B5CF6 0%,#ec4899 100%)',
  rag: 'linear-gradient(135deg,#06B6D4 0%,#4F6EF7 50%,#8B5CF6 100%)',
} as const;

export const PROJECT_CATEGORIES: ProjectCategory[] = ['All', 'Systems', 'AI', 'Full-Stack', 'DevTool'];

export const PROJECTS: Project[] = [
  {
    id: 'python-compiler',
    name: 'Python Compiler',
    type: 'COMPILER · SYSTEMS',
    category: 'Systems',
    status: 'ACTIVE',
    blurb:
      'Python-to-C compiler with a custom register VM. Lexer → Parser → AST → SSA optimizer → C codegen.',
    stack: ['Python', 'C', 'SSA IR', 'Pratt Parser'],
    github: 'https://github.com/shubhsharma2006/PythonCompiler',
    size: 'lg',
    metric: { label: 'PASSES', value: 'CFG+SSA' },
    diagram: 'compiler',
    timeline: '2025',
    role: 'Solo · Compilers',
    cover: COVERS.compiler,
    architecture: ['Lexer', 'Parser (Pratt)', 'AST', 'SSA IR', 'Optimizer', 'C Codegen / VM'],
    problem:
      'Wanted a hands-on study of compiler internals — not a toy, but a real lex/parse/typecheck/optimize/codegen pipeline for a Python subset.',
    approach: [
      'Built lexer, Pratt-style parser, CST→AST lowering, semantic analyzer and type checker.',
      'Added control-flow analyzer + SSA-based optimizer (dead-code elimination, constant folding).',
      'Two backends: a register VM for fast iteration and a C codegen with py_runtime.{h,c}.',
      'Comprehensive test suite covering compilation, VM execution, runtime helpers and compile-time rejections.',
    ],
    outcome:
      'Handles core Python — closures, default + keyword args, classes, exceptions, f-strings, for/while, imports — with structured diagnostics.',
    impact: [
      { label: 'Backends', value: '2' },
      { label: 'Optimizations', value: 'CFG+SSA' },
      { label: 'Test coverage', value: 'Full' },
    ],
  },
  {
    id: 'hr-workflow',
    name: 'HR Workflow Designer',
    type: 'PRODUCT · DEVTOOL',
    category: 'DevTool',
    status: 'ACTIVE',
    blurb:
      'Drag-and-drop workflow canvas for HR processes — 5 custom node types, dynamic config forms, simulation sandbox.',
    stack: ['React', 'TypeScript', 'React Flow', 'tRPC', 'MySQL', 'Drizzle'],
    github: 'https://github.com/shubhsharma2006/hr-workflow-designer',
    size: 'md',
    metric: { label: 'NODE TYPES', value: '5' },
    diagram: 'workflow',
    timeline: '2025',
    role: 'Solo · Full-Stack',
    cover: COVERS.hr,
    architecture: ['React Flow Canvas', 'Node Registry', 'Zod Schema', 'tRPC API', 'Drizzle ORM', 'MySQL'],
    problem: "HR teams couldn't prototype approval flows without engineering — every change was a ticket.",
    approach: [
      'Built a React Flow canvas with 5 custom node types (Start, Task, Approval, Automated, End).',
      'Dynamic config forms per node, validated with Zod.',
      'Simulation sandbox to dry-run flows before publishing.',
      'JWT in HTTP-only cookies + token versioning for revocation.',
    ],
    outcome: 'Enables non-engineers to design and validate workflows safely before deployment.',
    impact: [
      { label: 'Node types', value: '5' },
      { label: 'Auth', value: 'JWT+rotate' },
      { label: 'Sim', value: 'Sandbox' },
    ],
  },
  {
    id: 'rag-api',
    name: 'Multi-Model RAG API',
    type: 'AI · INFRA',
    category: 'AI',
    status: 'ACTIVE',
    blurb:
      'Production RAG fusing 3 local LLMs via Ollama with Qdrant vector search + Redis caching. 100% local, zero API cost.',
    stack: ['FastAPI', 'Ollama', 'Qdrant', 'Redis', 'Docker'],
    github: 'https://github.com/shubhsharma2006/-multi-model-rag-api',
    size: 'md',
    metric: { label: 'THROUGHPUT', value: '3×' },
    diagram: 'rag',
    timeline: '2025',
    role: 'Solo · Backend & ML',
    cover: COVERS.rag,
    architecture: ['Query', 'Embed (Nomic)', 'Qdrant Search', 'Context Builder', '3-Model Fusion', 'Redis Cache'],
    problem:
      'Single-model RAG hallucinates and external LLM APIs leak data + cost money at scale. Needed a private, multi-model fusion approach.',
    approach: [
      'Stood up 3 local LLMs via Ollama (Llama3.2, Mistral, Gemma2) behind a unified FastAPI surface.',
      'Implemented 3 fusion strategies (vote, longest, all) for combining model outputs.',
      'Wired Qdrant for vector retrieval with Nomic-embed-text and Redis for hot-path caching.',
      'Containerised the full stack with Docker for one-command deployment.',
    ],
    outcome:
      '100% local inference, 3× answer throughput via parallel model calls, zero per-token cost, full data residency.',
    impact: [
      { label: 'Models fused', value: '3' },
      { label: 'API cost', value: '$0' },
      { label: 'Throughput', value: '3×' },
    ],
  },
  {
    id: 'acustock',
    name: 'AcuStock v2',
    type: 'PRODUCTION · FULL-STACK',
    category: 'Full-Stack',
    status: 'LIVE',
    blurb:
      'Distributed inventory platform — 4-tier RBAC, real-time WebSockets, SAP-style immutable ledger, hardened against 6 attack classes.',
    stack: ['Next.js 14', 'TypeScript', 'MongoDB', 'Socket.IO', 'Docker', 'Nginx'],
    github: 'https://github.com/shubhsharma2006/acustock_2.0',
    size: 'lg',
    metric: { label: 'DATA ERRORS', value: '-87%' },
    diagram: 'analytics',
    timeline: 'Dec 2025 — Present',
    role: 'Full-Stack SWE Intern · Copious Infotech',
    cover: COVERS.acustock,
    architecture: ['Next.js 14', 'RBAC Engine', 'Socket.IO', 'MongoDB Ledger', 'Nginx + PM2', 'Docker'],
    problem:
      'Inventory data was drifting (~15% invalid records), auth was vulnerable to XSS token theft, and the stack had no horizontal scalability story.',
    approach: [
      'Architected a 4-tier RBAC engine (SUPER_ADMIN / ADMIN / MANAGER / USER) with JWT in HTTP-only cookies — eliminated XSS-based token theft.',
      'Overhauled MongoDB schema validation + server-side edge-case tests, dropping invalid records from ~15% to under 2%.',
      'Refactored 30+ Mongoose queries with strategic indexing to cut p95 latency by 18% and improve retrieval speed by 25%.',
      'Containerised on Linux with Docker + Nginx HTTPS reverse proxy + PM2 cluster mode for zero-downtime restarts.',
      'Designed an SAP-style immutable ledger with serial-number tracking for full audit traceability.',
    ],
    outcome:
      'Live production platform with real users, hardened against 6 attack classes (XSS, CSRF, NoSQL injection, brute-force, CSP/HSTS bypass, rate-abuse).',
    impact: [
      { label: 'Data errors', value: '<2%', delta: '-87%' },
      { label: 'API latency', value: '-18%' },
      { label: 'Retrieval', value: '+25%' },
      { label: 'Endpoints', value: '30+' },
    ],
  },
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
