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
};

export const PROJECTS: Project[] = [
  {
    id: 'lexica',
    name: 'Lexica.lang',
    type: 'COMPILER · DSL',
    status: 'ACTIVE',
    blurb: 'A typed expression DSL with a Pratt parser, AST optimizer, and WASM backend. Compiles human intent into runnable functions.',
    stack: ['Rust', 'WASM', 'TypeScript', 'LLVM-lite'],
    github: '#',
    live: '#',
    size: 'lg',
    metric: { label: 'TOKENS / SEC', value: '1.2M' },
  },
  {
    id: 'fintrack',
    name: 'FinTrack.ai',
    type: 'AI · FINANCE',
    status: 'ACTIVE',
    blurb: 'Personal finance copilot. Categorizes transactions and forecasts cash flow with on-device embeddings.',
    stack: ['Next', 'tRPC', 'OpenAI', 'Postgres'],
    live: '#',
    size: 'md',
    metric: { label: 'F1 SCORE', value: '0.94' },
  },
  {
    id: 'neurodash',
    name: 'NeuroDash',
    type: 'DEVTOOL · OBSERVABILITY',
    status: 'BETA',
    blurb: 'Real-time inference dashboard for LLM pipelines — token traces, latency heatmaps, hallucination flags.',
    stack: ['React', 'WebSockets', 'ClickHouse'],
    github: '#',
    size: 'md',
    metric: { label: 'P95 LATENCY', value: '38ms' },
  },
  {
    id: 'vectorforge',
    name: 'VectorForge',
    type: 'AI · INFRA',
    status: 'ACTIVE',
    blurb: 'Embedding pipeline orchestrator with hybrid search, reranking, and cache invalidation primitives.',
    stack: ['Go', 'Qdrant', 'gRPC'],
    github: '#',
    size: 'sm',
  },
  {
    id: 'astviz',
    name: 'AST.viz',
    type: 'DEVTOOL · VISUALIZER',
    status: 'ACTIVE',
    blurb: 'Interactive AST explorer — diff parser outputs across language versions, animate transformations.',
    stack: ['TypeScript', 'D3', 'Tree-sitter'],
    live: '#',
    size: 'sm',
  },
  {
    id: 'sentinel',
    name: 'Sentinel.runtime',
    type: 'SYSTEMS · SECURITY',
    status: 'BETA',
    blurb: 'Runtime guard for AI agents. Sandboxes tool calls, intercepts unsafe ops, emits structured audit trails.',
    stack: ['Rust', 'Wasmtime', 'OpenTelemetry'],
    github: '#',
    size: 'md',
    metric: { label: 'OPS BLOCKED', value: '12.4k' },
  },
];
