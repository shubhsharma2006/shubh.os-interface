export type ImpactMetric = { label: string; value: string; delta?: string };

export type Project = {
  id: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'BETA' | 'ARCHIVED';
  blurb: string;
  stack: string[];
  github?: string;
  live?: string;
  size: 'lg' | 'md' | 'sm';
  metric?: { label: string; value: string };

  // Case study
  timeline: string;
  role: string;
  cover: string; // CSS gradient or url(...)
  problem: string;
  approach: string[];
  outcome: string;
  impact: ImpactMetric[];
};

const COVERS = {
  lexica: 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 60%,#a855f7 100%)',
  fintrack: 'linear-gradient(135deg,#22d3ee 0%,#0891b2 100%)',
  neurodash: 'linear-gradient(135deg,#a78bfa 0%,#ec4899 100%)',
  vectorforge: 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',
  astviz: 'linear-gradient(135deg,#10b981 0%,#06b6d4 100%)',
  sentinel: 'linear-gradient(135deg,#6366f1 0%,#0f172a 100%)',
} as const;

export const PROJECTS: Project[] = [
  {
    id: 'lexica',
    name: 'Lexica.lang',
    type: 'COMPILER · DSL',
    status: 'ACTIVE',
    blurb:
      'A typed expression DSL with a Pratt parser, AST optimizer, and WASM backend. Compiles human intent into runnable functions.',
    stack: ['Rust', 'WASM', 'TypeScript', 'LLVM-lite'],
    github: '#',
    live: '#',
    size: 'lg',
    metric: { label: 'TOKENS / SEC', value: '1.2M' },
    timeline: 'Jan – Aug 2025 · 8 mo',
    role: 'Lead engineer · solo',
    cover: COVERS.lexica,
    problem:
      'Product teams kept wiring fragile spreadsheet formulas into production code. They needed a real, sandboxed expression language with types and predictable performance.',
    approach: [
      'Designed a small typed grammar with a Pratt parser for clean operator precedence.',
      'Built an AST optimizer (constant folding, dead code elimination, common subexpression).',
      'Compiled to WASM via a tiny IR for sub-millisecond cold starts.',
      'Shipped a TypeScript SDK with first-class error spans and source maps.',
    ],
    outcome:
      'Replaced ~12k lines of glue code across 3 internal products. P95 evaluation latency dropped 62% and on-call incidents from formula bugs went to zero.',
    impact: [
      { label: 'Tokens / sec', value: '1.2M', delta: '+340%' },
      { label: 'P95 latency', value: '38ms', delta: '-62%' },
      { label: 'LOC removed', value: '12.4k' },
      { label: 'Incidents', value: '0', delta: '-100%' },
    ],
  },
  {
    id: 'fintrack',
    name: 'FinTrack.ai',
    type: 'AI · FINANCE',
    status: 'ACTIVE',
    blurb:
      'Personal finance copilot. Categorizes transactions and forecasts cash flow with on-device embeddings.',
    stack: ['Next', 'tRPC', 'OpenAI', 'Postgres'],
    live: '#',
    size: 'md',
    metric: { label: 'F1 SCORE', value: '0.94' },
    timeline: 'Sep 2024 – Mar 2025 · 6 mo',
    role: 'Full-stack + ML',
    cover: COVERS.fintrack,
    problem:
      'Existing budgeting apps mis-categorize the long tail of merchants and ship private data to third parties.',
    approach: [
      'Fine-tuned a small embedding model on anonymized transaction memos.',
      'Ran categorization fully on-device via WebGPU; server only stores hashes.',
      'Built a forecasting view with Monte Carlo cash-flow simulation.',
    ],
    outcome:
      'Hit 0.94 F1 on a held-out merchant set, beating the previous heuristic by 19 points. Zero PII leaves the device.',
    impact: [
      { label: 'F1 score', value: '0.94', delta: '+0.19' },
      { label: 'On-device', value: '100%' },
      { label: 'Active users', value: '4.2k' },
    ],
  },
  {
    id: 'neurodash',
    name: 'NeuroDash',
    type: 'DEVTOOL · OBSERVABILITY',
    status: 'BETA',
    blurb:
      'Real-time inference dashboard for LLM pipelines — token traces, latency heatmaps, hallucination flags.',
    stack: ['React', 'WebSockets', 'ClickHouse'],
    github: '#',
    size: 'md',
    metric: { label: 'P95 LATENCY', value: '38ms' },
    timeline: 'May – Oct 2025 · 5 mo',
    role: 'Frontend lead',
    cover: COVERS.neurodash,
    problem:
      'LLM teams were debugging production incidents from raw JSON logs. No way to see token-level latency or drift.',
    approach: [
      'Streamed token events over WebSockets into ClickHouse with 5s rollups.',
      'Built virtualized trace timeline that renders 50k spans at 60fps.',
      'Added hallucination detector that flags responses diverging from retrieval context.',
    ],
    outcome:
      'Cut mean time to detect bad deploys from 41 minutes to under 4. Adopted by 7 internal teams.',
    impact: [
      { label: 'P95 latency', value: '38ms' },
      { label: 'MTTD', value: '4 min', delta: '-90%' },
      { label: 'Spans / sec', value: '120k' },
    ],
  },
  {
    id: 'vectorforge',
    name: 'VectorForge',
    type: 'AI · INFRA',
    status: 'ACTIVE',
    blurb:
      'Embedding pipeline orchestrator with hybrid search, reranking, and cache invalidation primitives.',
    stack: ['Go', 'Qdrant', 'gRPC'],
    github: '#',
    size: 'sm',
    timeline: 'Mar – Jul 2025 · 4 mo',
    role: 'Infra engineer',
    cover: COVERS.vectorforge,
    problem:
      'Embedding pipelines were ad-hoc cron jobs with no observability or rollback story.',
    approach: [
      'Modeled pipelines as DAGs with content-addressed cache keys.',
      'Added hybrid BM25 + vector retrieval with cross-encoder reranking.',
      'Built smart invalidation that only reprocesses affected shards.',
    ],
    outcome: 'Cut embedding cost 71% and made reindex a one-command operation.',
    impact: [
      { label: 'Cost', value: '-71%' },
      { label: 'Reindex', value: '1 cmd' },
      { label: 'Recall@10', value: '0.92' },
    ],
  },
  {
    id: 'astviz',
    name: 'AST.viz',
    type: 'DEVTOOL · VISUALIZER',
    status: 'ACTIVE',
    blurb:
      'Interactive AST explorer — diff parser outputs across language versions, animate transformations.',
    stack: ['TypeScript', 'D3', 'Tree-sitter'],
    live: '#',
    size: 'sm',
    timeline: 'Weekend project, Nov 2025',
    role: 'Solo',
    cover: COVERS.astviz,
    problem: 'Compiler authors had no good way to demo AST transforms in talks or docs.',
    approach: [
      'Tree-sitter-based universal parser frontend.',
      'D3 force layout with smooth FLIP transitions between transform steps.',
      'Sharable URLs that encode source + transform sequence.',
    ],
    outcome: 'Picked up by 3 OSS compiler projects for their docs. 18k GitHub stars in 6 weeks.',
    impact: [
      { label: 'Stars', value: '18k' },
      { label: 'Languages', value: '14' },
      { label: 'Forks', value: '1.1k' },
    ],
  },
  {
    id: 'sentinel',
    name: 'Sentinel.runtime',
    type: 'SYSTEMS · SECURITY',
    status: 'BETA',
    blurb:
      'Runtime guard for AI agents. Sandboxes tool calls, intercepts unsafe ops, emits structured audit trails.',
    stack: ['Rust', 'Wasmtime', 'OpenTelemetry'],
    github: '#',
    size: 'md',
    metric: { label: 'OPS BLOCKED', value: '12.4k' },
    timeline: 'Aug 2025 – ongoing',
    role: 'Lead engineer',
    cover: COVERS.sentinel,
    problem:
      'Agents calling arbitrary tools is a security nightmare. There was no per-call policy layer.',
    approach: [
      'Wasmtime sandbox per tool invocation with capability tokens.',
      'Policy DSL evaluated in <100µs per call.',
      'OpenTelemetry traces with structured deny reasons for SOC2 audits.',
    ],
    outcome:
      'Blocked 12.4k unsafe ops across pilot customers in the first quarter without a single false positive escalation.',
    impact: [
      { label: 'Ops blocked', value: '12.4k' },
      { label: 'Overhead', value: '<100µs' },
      { label: 'False positives', value: '0' },
    ],
  },
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
