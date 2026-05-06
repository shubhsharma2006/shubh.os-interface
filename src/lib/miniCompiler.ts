// Tiny expression compiler: tokenize → parse (AST) → evaluate.
// Supports: numbers, + - * / parens, identifiers from `vars`, simple `let x = expr` statements separated by `;`.

export type Token =
  | { type: 'num'; value: number; raw: string }
  | { type: 'ident'; value: string; raw: string }
  | { type: 'op'; value: string; raw: string }
  | { type: 'punct'; value: string; raw: string }
  | { type: 'kw'; value: string; raw: string };

export type ASTNode =
  | { kind: 'Program'; body: ASTNode[] }
  | { kind: 'Let'; name: string; value: ASTNode }
  | { kind: 'Num'; value: number }
  | { kind: 'Ident'; name: string }
  | { kind: 'Bin'; op: string; left: ASTNode; right: ASTNode };

const KW = new Set(['let']);

export function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      out.push({ type: 'num', value: parseFloat(src.slice(i, j)), raw: src.slice(i, j) });
      i = j; continue;
    }
    if (/[a-zA-Z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[a-zA-Z0-9_]/.test(src[j])) j++;
      const raw = src.slice(i, j);
      out.push(KW.has(raw) ? { type: 'kw', value: raw, raw } : { type: 'ident', value: raw, raw });
      i = j; continue;
    }
    if ('+-*/'.includes(c)) { out.push({ type: 'op', value: c, raw: c }); i++; continue; }
    if ('()=;'.includes(c)) { out.push({ type: 'punct', value: c, raw: c }); i++; continue; }
    throw new Error(`Unexpected char '${c}' at ${i}`);
  }
  return out;
}

export function parse(tokens: Token[]): ASTNode {
  let p = 0;
  const peek = () => tokens[p];
  const eat = () => tokens[p++];
  const expect = (type: string, value?: string) => {
    const t = eat();
    if (!t || t.type !== type || (value !== undefined && t.value !== value)) {
      throw new Error(`Expected ${type}${value ? ` '${value}'` : ''} at token ${p - 1}`);
    }
    return t;
  };

  function parseStmt(): ASTNode {
    const t = peek();
    if (t && t.type === 'kw' && t.value === 'let') {
      eat();
      const name = expect('ident').value as string;
      expect('punct', '=');
      const value = parseExpr();
      if (peek() && peek().type === 'punct' && peek().value === ';') eat();
      return { kind: 'Let', name, value };
    }
    const e = parseExpr();
    if (peek() && peek().type === 'punct' && peek().value === ';') eat();
    return e;
  }

  function parseExpr(): ASTNode { return parseAdd(); }
  function parseAdd(): ASTNode {
    let left = parseMul();
    while (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
      const op = eat().value as string;
      const right = parseMul();
      left = { kind: 'Bin', op, left, right };
    }
    return left;
  }
  function parseMul(): ASTNode {
    let left = parseAtom();
    while (peek() && peek().type === 'op' && (peek().value === '*' || peek().value === '/')) {
      const op = eat().value as string;
      const right = parseAtom();
      left = { kind: 'Bin', op, left, right };
    }
    return left;
  }
  function parseAtom(): ASTNode {
    const t = eat();
    if (!t) throw new Error('Unexpected end of input');
    if (t.type === 'num') return { kind: 'Num', value: t.value as number };
    if (t.type === 'ident') return { kind: 'Ident', name: t.value as string };
    if (t.type === 'punct' && t.value === '(') {
      const e = parseExpr();
      expect('punct', ')');
      return e;
    }
    throw new Error(`Unexpected token '${t.raw}'`);
  }

  const body: ASTNode[] = [];
  while (p < tokens.length) body.push(parseStmt());
  return { kind: 'Program', body };
}

export function evaluate(node: ASTNode, env: Record<string, number> = {}): { result: number | undefined; env: Record<string, number>; trace: string[] } {
  const trace: string[] = [];
  function ev(n: ASTNode): number {
    switch (n.kind) {
      case 'Num': return n.value;
      case 'Ident':
        if (!(n.name in env)) throw new Error(`Undefined identifier '${n.name}'`);
        return env[n.name];
      case 'Bin': {
        const l = ev(n.left); const r = ev(n.right);
        let v = 0;
        switch (n.op) { case '+': v = l + r; break; case '-': v = l - r; break; case '*': v = l * r; break; case '/': v = l / r; break; }
        trace.push(`eval ${l} ${n.op} ${r} = ${v}`);
        return v;
      }
      case 'Let': {
        const v = ev(n.value);
        env[n.name] = v;
        trace.push(`bind ${n.name} = ${v}`);
        return v;
      }
      case 'Program': {
        let last: number | undefined;
        for (const s of n.body) last = ev(s);
        return last ?? 0;
      }
    }
  }
  let result: number | undefined;
  try { result = ev(node); } catch (e) { trace.push(`error: ${(e as Error).message}`); }
  return { result, env, trace };
}

// Flatten AST to positioned nodes for visualization
export interface FlatNode { id: string; label: string; depth: number; x: number; y: number; parent?: string }

export function layout(ast: ASTNode): FlatNode[] {
  const nodes: FlatNode[] = [];
  let counter = 0;
  function label(n: ASTNode): string {
    switch (n.kind) {
      case 'Num': return `Num ${n.value}`;
      case 'Ident': return `Id ${n.name}`;
      case 'Bin': return `Bin ${n.op}`;
      case 'Let': return `Let ${n.name}`;
      case 'Program': return 'Program';
    }
  }
  function children(n: ASTNode): ASTNode[] {
    switch (n.kind) {
      case 'Program': return n.body;
      case 'Let': return [n.value];
      case 'Bin': return [n.left, n.right];
      default: return [];
    }
  }
  // assign x positions via in-order traversal counter at leaves; depths via DFS.
  let xCursor = 0;
  function walk(n: ASTNode, depth: number, parent?: string): { id: string; xCenter: number } {
    const id = `n${counter++}`;
    const ch = children(n);
    let xCenter: number;
    if (ch.length === 0) {
      xCenter = xCursor++;
    } else {
      const childRes = ch.map((c) => walk(c, depth + 1, id));
      xCenter = (childRes[0].xCenter + childRes[childRes.length - 1].xCenter) / 2;
    }
    nodes.push({ id, label: label(n), depth, x: xCenter, y: depth, parent });
    return { id, xCenter };
  }
  walk(ast, 0);
  // normalize x to [0,1]
  const maxX = Math.max(1, xCursor - 1);
  const maxY = Math.max(1, Math.max(...nodes.map((n) => n.y)));
  return nodes.map((n) => ({ ...n, x: n.x / maxX, y: n.y / maxY }));
}
