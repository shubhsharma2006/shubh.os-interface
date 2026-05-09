export type ImpactMetric = { label: string; value: string; delta?: string };

export type Project = {
  id: string;
  name: string;
  type: string;
  status: 'LIVE' | 'ACTIVE' | 'BETA' | 'ARCHIVED';
  blurb: string;
  stack: string[];
  github?: string;
  live?: string;
  size: 'lg' | 'md' | 'sm';
  metric?: { label: string; value: string };

  // Case study
  timeline: string;
  role: string;
  cover: string;
  problem: string;
  approach: string[];
  outcome: string;
  impact: ImpactMetric[];
};

const COVERS = {
  acustock: 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 60%,#0f172a 100%)',
  compiler: 'linear-gradient(135deg,#10b981 0%,#0891b2 100%)',
  hr: 'linear-gradient(135deg,#a78bfa 0%,#ec4899 100%)',
  pruning: 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',
  rag: 'linear-gradient(135deg,#22d3ee 0%,#6366f1 50%,#a855f7 100%)',
} as const;

export const PROJECTS: Project[] = [
  {
    id: 'acustock',
    name: 'AcuStock v2',
    type: 'PRODUCTION · FULL-STACK',
    status: 'LIVE',
    blurb:
      'Distributed inventory platform serving real users — RBAC, real-time WebSockets, SAP-style immutable ledger, hardened against 6 attack classes.',
    stack: ['Next.js 14', 'TypeScript', 'MongoDB', 'Socket.IO', 'Docker', 'Nginx', 'PM2'],
    github: 'https://github.com/shubhsharma2006/acustock_2.0',
    size: 'lg',
    metric: { label: 'DATA ERRORS', value: '-87%' },
    timeline: 'Dec 2025 — Present',
    role: 'Full-Stack SWE Intern · Copious Infotech',
    cover: COVERS.acustock,
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
  {
    id: 'rag-api',
    name: 'Multi-Model RAG API',
    type: 'AI · INFRA',
    status: 'ACTIVE',
    blurb:
      'Production RAG system fusing 3 local LLMs (Llama3.2, Mistral, Gemma2) via Ollama with Qdrant vector search and Redis caching. 100% local, zero API cost.',
    stack: ['FastAPI', 'Ollama', 'Qdrant', 'Redis', 'Docker', 'Python'],
    github: 'https://github.com/shubhsharma2006/-multi-model-rag-api',
    size: 'md',
    metric: { label: 'THROUGHPUT', value: '3×' },
    timeline: '2025',
    role: 'Solo · Backend & ML',
    cover: COVERS.rag,
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
    id: 'python-compiler',
    name: 'Python Compiler',
    type: 'COMPILER · SYSTEMS',
    status: 'ACTIVE',
    blurb:
      'A Python-to-C compiler with a custom VM execution path. Lexer → Parser → AST → SSA optimizer → C codegen, with full unit + integration test coverage.',
    stack: ['Python', 'C', 'SSA IR', 'unittest'],
    github: 'https://github.com/shubhsharma2006/PythonCompiler',
    size: 'md',
    metric: { label: 'PASSES', value: 'CFG+SSA' },
    timeline: '2025',
    role: 'Solo',
    cover: COVERS.compiler,
    problem:
      'Wanted a hands-on study of compiler internals — not a toy, but a real lex/parse/typecheck/optimize/codegen pipeline for a Python subset.',
    approach: [
      'Built lexer, Pratt-style parser, CST→AST lowering, semantic analyzer, type checker.',
      'Added control-flow analyzer + SSA-based optimizer (dead-code, constant fold).',
      'Two backends: a register VM for fast iteration and a C codegen with py_runtime.{h,c}.',
      'Comprehensive test suite covering compilation, VM execution, runtime helpers and compile-time rejections.',
    ],
    outcome:
      'Handles core Python: closures, default + keyword args, classes, exceptions, f-strings, for/while, imports — with structured diagnostics.',
    impact: [
      { label: 'Backends', value: '2' },
      { label: 'Optimizations', value: 'CFG+SSA' },
      { label: 'Test coverage', value: 'Full' },
    ],
  },
  {
    id: 'self-pruning',
    name: 'Self-Pruning Neural Net',
    type: 'AI · RESEARCH',
    status: 'ACTIVE',
    blurb:
      'A feed-forward net with learnable sigmoid gates on every weight, driven by an L1 penalty — achieves high sparsity end-to-end without straight-through estimators.',
    stack: ['PyTorch', 'NumPy', 'CIFAR-10'],
    github: 'https://github.com/shubhsharma2006/self-pruning',
    size: 'sm',
    metric: { label: 'ACCURACY', value: '0.91' },
    timeline: '2025 · Tredence case study',
    role: 'Solo · Research',
    cover: COVERS.pruning,
    problem:
      'Standard pruning relies on heuristics or non-differentiable masks. Wanted a fully end-to-end differentiable approach.',
    approach: [
      'Designed PrunableLinear layers — every weight has its own learnable sigmoid gate.',
      'Drove gates with an L1 penalty on a separate, 8× higher learning rate so sparsity signal dominates.',
      'Validated on synthetic data + CIFAR-10.',
    ],
    outcome:
      'High sparsity at 0.91 test accuracy on CIFAR-10 — fully differentiable, no straight-through estimator needed.',
    impact: [
      { label: 'Accuracy', value: '0.91' },
      { label: 'Differentiable', value: '100%' },
      { label: 'Gate LR', value: '8×' },
    ],
  },
  {
    id: 'hr-workflow',
    name: 'HR Workflow Designer',
    type: 'PRODUCT · DEVTOOL',
    status: 'ACTIVE',
    blurb:
      'Drag-and-drop workflow canvas for HR processes — custom node types, dynamic config forms, simulation sandbox, secure JWT auth.',
    stack: ['React', 'TypeScript', 'React Flow', 'tRPC', 'MySQL', 'Drizzle'],
    github: 'https://github.com/shubhsharma2006/hr-workflow-designer',
    size: 'sm',
    timeline: '2025',
    role: 'Solo · Full-Stack',
    cover: COVERS.hr,
    problem:
      'HR teams couldn\'t prototype approval flows without engineering — every change was a ticket.',
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
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
