import{C as e,L as t,mt as n,y as r}from"./modules/shiki-CTmrkNOW.js";import{rt as i}from"./index-CXtbINTh.js";var a=`<svg class="diagram" viewBox="0 0 560 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A host contains an AI model and one MCP client per server. Clients talk to servers over stdio or Streamable HTTP. Servers reach local tools or remote APIs.">
  <defs>
    <marker id="ar-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-client"/></marker>
    <marker id="ar-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-data"/></marker>
  </defs>

  <rect x="10" y="10" width="540" height="140" rx="14" class="d-client" style="fill-opacity:.55"/>
  <text x="26" y="34" class="d-title">Host: Claude, an IDE, or your own app</text>

  <path d="M166 88H384" class="d-wire-client"/>
  <rect x="26" y="50" width="140" height="76" rx="10" class="d-box"/>
  <text x="96" y="84" text-anchor="middle" class="d-title">AI model</text>
  <text x="96" y="105" text-anchor="middle" class="d-small">picks the tool</text>
  <rect x="214" y="62" width="150" height="52" rx="10" class="d-client"/>
  <text x="289" y="93" text-anchor="middle" class="d-title">MCP client A</text>
  <rect x="384" y="62" width="150" height="52" rx="10" class="d-client"/>
  <text x="459" y="93" text-anchor="middle" class="d-title">MCP client B</text>

  <path d="M289 114V208" class="d-wire-client" marker-end="url(#ar-c)"/>
  <text x="281" y="170" text-anchor="end" class="d-mono">stdio</text>
  <path d="M459 114V208" class="d-wire-client" marker-end="url(#ar-c)"/>
  <text x="451" y="170" text-anchor="end" class="d-mono">Streamable HTTP</text>

  <rect x="214" y="210" width="150" height="52" rx="10" class="d-server"/>
  <text x="289" y="241" text-anchor="middle" class="d-title">MCP server A</text>
  <rect x="384" y="210" width="150" height="52" rx="10" class="d-server"/>
  <text x="459" y="241" text-anchor="middle" class="d-title">MCP server B</text>

  <path d="M289 262V298" class="d-wire-data" marker-end="url(#ar-d)"/>
  <path d="M459 262V298" class="d-wire-data" marker-end="url(#ar-d)"/>
  <rect x="214" y="300" width="150" height="48" rx="10" class="d-data"/>
  <text x="289" y="322" text-anchor="middle" class="d-title" style="font-size:14px">Local files</text>
  <text x="289" y="339" text-anchor="middle" class="d-small">and tools</text>
  <rect x="384" y="300" width="150" height="48" rx="10" class="d-data"/>
  <text x="459" y="322" text-anchor="middle" class="d-title" style="font-size:14px">Remote API</text>
  <text x="459" y="339" text-anchor="middle" class="d-small">e.g. Azure DevOps</text>

  <text x="26" y="232" class="d-title">A server offers</text>
  <text x="26" y="256" class="d-small">tools: model actions</text>
  <text x="26" y="276" class="d-small">resources: app data</text>
  <text x="26" y="296" class="d-small">prompts: user templates</text>
</svg>
`,o=`<svg class="diagram" viewBox="0 0 560 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A client discovers the server's tools, the model picks one, the client calls it, and the server returns content">
  <defs>
    <marker id="ca-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-client"/></marker>
    <marker id="ca-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-server"/></marker>
  </defs>
  <rect x="20" y="10" width="140" height="40" rx="10" class="d-client"/>
  <text x="90" y="36" text-anchor="middle" class="d-title">Client</text>
  <rect x="400" y="10" width="140" height="40" rx="10" class="d-server"/>
  <text x="470" y="36" text-anchor="middle" class="d-title">Server</text>
  <path d="M90 50V360" class="d-lifeline"/>
  <path d="M470 50V360" class="d-lifeline"/>

  <path d="M92 92H468" class="d-wire-client" marker-end="url(#ca-c)"/>
  <text x="280" y="82" text-anchor="middle" class="d-mono">server/discover</text>
  <path d="M468 134H92" class="d-wire-server" marker-end="url(#ca-s)"/>
  <text x="280" y="124" text-anchor="middle" class="d-small">capabilities, tools with input schemas, ttlMs</text>

  <rect x="110" y="166" width="230" height="46" rx="10" class="d-note"/>
  <text x="225" y="187" text-anchor="middle" class="d-small" style="fill:var(--color-text)">The model reads the schemas</text>
  <text x="225" y="204" text-anchor="middle" class="d-small" style="fill:var(--color-text)">and picks a tool for your request</text>

  <path d="M92 258H468" class="d-wire-client" marker-end="url(#ca-c)"/>
  <text x="280" y="248" text-anchor="middle" class="d-mono">tools/call { name, arguments }</text>
  <path d="M468 322H92" class="d-wire-server" marker-end="url(#ca-s)"/>
  <text x="280" y="296" text-anchor="middle" class="d-small">result: content blocks and optional structuredContent</text>
  <text x="280" y="312" text-anchor="middle" class="d-small">isError: true when the tool itself failed</text>
</svg>
`,s=`<svg class="diagram" viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A client sends a request to a server and gets a response">
  <defs>
    <marker id="ex-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-head-client"/></marker>
    <marker id="ex-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-head-server"/></marker>
  </defs>
  <rect x="10" y="30" width="150" height="90" rx="10" class="d-client"/>
  <text x="85" y="80" text-anchor="middle" class="d-title">Client</text>
  <rect x="360" y="30" width="150" height="90" rx="10" class="d-server"/>
  <text x="435" y="80" text-anchor="middle" class="d-title">Server</text>
  <path d="M164 55H356" class="d-wire-client" marker-end="url(#ex-c)"/>
  <text x="260" y="46" text-anchor="middle" class="d-small">request</text>
  <path d="M356 100H164" class="d-wire-server" marker-end="url(#ex-s)"/>
  <text x="260" y="118" text-anchor="middle" class="d-small">response</text>
</svg>
`,c=`<svg class="diagram" viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three AI apps and three tools all connect through one MCP socket">
  <!-- cables first, so the boxes sit on top -->
  <path d="M150 62H215" class="d-wire-client"/>
  <path d="M150 190H215" class="d-wire-client"/>
  <path d="M150 318H215" class="d-wire-client"/>
  <path d="M345 62H410" class="d-wire-server"/>
  <path d="M345 190H410" class="d-wire-server"/>
  <path d="M345 318H410" class="d-wire-server"/>

  <rect x="10" y="30" width="140" height="64" rx="10" class="d-client"/>
  <text x="80" y="68" text-anchor="middle" class="d-title">Claude</text>
  <rect x="10" y="158" width="140" height="64" rx="10" class="d-client"/>
  <text x="80" y="196" text-anchor="middle" class="d-title">Your IDE</text>
  <rect x="10" y="286" width="140" height="64" rx="10" class="d-client"/>
  <text x="80" y="324" text-anchor="middle" class="d-title">Your own app</text>

  <rect x="215" y="14" width="130" height="352" rx="16" class="d-ink"/>
  <text x="280" y="188" text-anchor="middle" class="d-title d-inv" style="font-size:26px">MCP</text>
  <text x="280" y="212" text-anchor="middle" class="d-small d-inv" style="fill:#fff;opacity:.8">one plug</text>
  <circle cx="215" cy="62" r="7" class="d-pill-client"/><circle cx="215" cy="190" r="7" class="d-pill-client"/><circle cx="215" cy="318" r="7" class="d-pill-client"/>
  <circle cx="345" cy="62" r="7" class="d-pill-server"/><circle cx="345" cy="190" r="7" class="d-pill-server"/><circle cx="345" cy="318" r="7" class="d-pill-server"/>

  <rect x="410" y="30" width="140" height="64" rx="10" class="d-server"/>
  <text x="480" y="68" text-anchor="middle" class="d-title">Azure DevOps</text>
  <rect x="410" y="158" width="140" height="64" rx="10" class="d-server"/>
  <text x="480" y="196" text-anchor="middle" class="d-title">A database</text>
  <rect x="410" y="286" width="140" height="64" rx="10" class="d-server"/>
  <text x="480" y="324" text-anchor="middle" class="d-title">Your files</text>
</svg>
`,l=`<svg class="diagram" viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A client opens one long-lived subscriptions/listen request with a filter, and the server streams matching change events back on that response">
  <defs>
    <marker id="li-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-client"/></marker>
    <marker id="li-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-server"/></marker>
  </defs>
  <rect x="10" y="40" width="110" height="120" rx="12" class="d-client"/>
  <text x="65" y="105" text-anchor="middle" class="d-title">Client</text>
  <rect x="440" y="40" width="110" height="120" rx="12" class="d-server"/>
  <text x="495" y="105" text-anchor="middle" class="d-title">Server</text>

  <path d="M122 66H438" class="d-wire-client" marker-end="url(#li-c)"/>
  <text x="280" y="54" text-anchor="middle" class="d-mono">POST subscriptions/listen { filter }</text>

  <rect x="130" y="92" width="300" height="44" rx="22" class="d-data" style="fill-opacity:.5"/>
  <rect x="138" y="102" width="82" height="24" rx="12" class="d-pill-server"/>
  <text x="179" y="118" text-anchor="middle" class="d-small d-inv" style="fill:#fff;font-size:10px">tools changed</text>
  <rect x="228" y="102" width="98" height="24" rx="12" class="d-pill-server"/>
  <text x="277" y="118" text-anchor="middle" class="d-small d-inv" style="fill:#fff;font-size:10px">resource updated</text>
  <rect x="334" y="102" width="92" height="24" rx="12" class="d-pill-server"/>
  <text x="380" y="118" text-anchor="middle" class="d-small d-inv" style="fill:#fff;font-size:10px">prompts changed</text>
  <text x="280" y="176" text-anchor="middle" class="d-small">events stream back on the same response, each tagged with a subscription id</text>

  <path d="M438 148H122" class="d-wire-server" marker-end="url(#li-s)"/>

  <rect x="10" y="206" width="540" height="68" rx="12" class="d-warnbox"/>
  <text x="26" y="232" class="d-title">If the stream drops</text>
  <text x="26" y="254" class="d-small">There is no resume. Open a new listen request, then refetch the lists you care about.</text>
</svg>
`,u=`<svg class="diagram" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Without MCP, three apps and three tools need nine integrations. With MCP they need six.">
  <!-- Left: every pair -->
  <text x="10" y="22" class="d-title">Before: a connector for every pair</text>
  <g class="d-line" style="stroke-width:1.5">
    <path d="M80 70L200 70M80 70L200 140M80 70L200 210"/>
    <path d="M80 140L200 70M80 140L200 140M80 140L200 210"/>
    <path d="M80 210L200 70M80 210L200 140M80 210L200 210"/>
  </g>
  <rect x="10" y="50" width="70" height="40" rx="8" class="d-client"/><text x="45" y="75" text-anchor="middle" class="d-small" style="fill:var(--color-text)">App 1</text>
  <rect x="10" y="120" width="70" height="40" rx="8" class="d-client"/><text x="45" y="145" text-anchor="middle" class="d-small" style="fill:var(--color-text)">App 2</text>
  <rect x="10" y="190" width="70" height="40" rx="8" class="d-client"/><text x="45" y="215" text-anchor="middle" class="d-small" style="fill:var(--color-text)">App 3</text>
  <rect x="200" y="50" width="70" height="40" rx="8" class="d-server"/><text x="235" y="75" text-anchor="middle" class="d-small" style="fill:var(--color-text)">Tool A</text>
  <rect x="200" y="120" width="70" height="40" rx="8" class="d-server"/><text x="235" y="145" text-anchor="middle" class="d-small" style="fill:var(--color-text)">Tool B</text>
  <rect x="200" y="190" width="70" height="40" rx="8" class="d-server"/><text x="235" y="215" text-anchor="middle" class="d-small" style="fill:var(--color-text)">Tool C</text>
  <text x="140" y="272" text-anchor="middle" class="d-title" style="fill:var(--color-warn)">3 × 3 = 9 integrations</text>
  <text x="140" y="296" text-anchor="middle" class="d-small">Each new app or tool multiplies the work</text>

  <!-- Right: through MCP -->
  <text x="290" y="22" class="d-title">With MCP: one plug each</text>
  <g class="d-line" style="stroke-width:2">
    <path d="M370 70H405M370 140H405M370 210H405"/>
    <path d="M455 70H490M455 140H490M455 210H490"/>
  </g>
  <rect x="290" y="50" width="70" height="40" rx="8" class="d-client"/><text x="325" y="75" text-anchor="middle" class="d-small" style="fill:var(--color-text)">App 1</text>
  <rect x="290" y="120" width="70" height="40" rx="8" class="d-client"/><text x="325" y="145" text-anchor="middle" class="d-small" style="fill:var(--color-text)">App 2</text>
  <rect x="290" y="190" width="70" height="40" rx="8" class="d-client"/><text x="325" y="215" text-anchor="middle" class="d-small" style="fill:var(--color-text)">App 3</text>
  <rect x="405" y="40" width="50" height="200" rx="10" class="d-ink"/>
  <text x="430" y="145" text-anchor="middle" class="d-title d-inv" style="font-size:14px">MCP</text>
  <rect x="490" y="50" width="70" height="40" rx="8" class="d-server"/><text x="525" y="75" text-anchor="middle" class="d-small" style="fill:var(--color-text)">Tool A</text>
  <rect x="490" y="120" width="70" height="40" rx="8" class="d-server"/><text x="525" y="145" text-anchor="middle" class="d-small" style="fill:var(--color-text)">Tool B</text>
  <rect x="490" y="190" width="70" height="40" rx="8" class="d-server"/><text x="525" y="215" text-anchor="middle" class="d-small" style="fill:var(--color-text)">Tool C</text>
  <text x="425" y="272" text-anchor="middle" class="d-title" style="fill:var(--role-server)">3 + 3 = 6 integrations</text>
  <text x="425" y="296" text-anchor="middle" class="d-small">Each new app or tool adds one</text>
</svg>
`,d=`<svg class="diagram" viewBox="0 0 560 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A client calls a protected MCP server, gets a 401, signs in with the authorization server using OAuth and PKCE, then retries with a bearer token">
  <defs>
    <marker id="oa-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-client"/></marker>
    <marker id="oa-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-server"/></marker>
    <marker id="oa-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-auth"/></marker>
  </defs>
  <rect x="10" y="8" width="120" height="38" rx="10" class="d-client"/>
  <text x="70" y="32" text-anchor="middle" class="d-title">Client</text>
  <rect x="220" y="8" width="120" height="38" rx="10" class="d-server"/>
  <text x="280" y="32" text-anchor="middle" class="d-title">MCP server</text>
  <rect x="430" y="8" width="120" height="38" rx="10" class="d-auth"/>
  <text x="490" y="32" text-anchor="middle" class="d-title">Auth server</text>
  <path d="M70 46V420M280 46V420M490 46V420" class="d-lifeline"/>

  <path d="M72 84H278" class="d-wire-client" marker-end="url(#oa-c)"/>
  <text x="175" y="76" text-anchor="middle" class="d-small">1 request, no token</text>
  <path d="M278 122H72" class="d-wire-server" marker-end="url(#oa-s)"/>
  <text x="175" y="114" text-anchor="middle" class="d-small">2 401 + auth server pointer</text>

  <path d="M72 168H488" class="d-wire-auth" marker-end="url(#oa-a)"/>
  <text x="380" y="160" text-anchor="middle" class="d-small">3 sign in: OAuth with PKCE</text>
  <path d="M488 206H72" class="d-wire-auth" marker-end="url(#oa-a)"/>
  <text x="380" y="198" text-anchor="middle" class="d-small">4 access token for this server only</text>

  <path d="M72 262H278" class="d-wire-client" marker-end="url(#oa-c)"/>
  <text x="175" y="254" text-anchor="middle" class="d-small">5 request + Bearer token</text>
  <rect x="190" y="282" width="180" height="62" rx="10" class="d-note"/>
  <text x="280" y="303" text-anchor="middle" class="d-small" style="fill:var(--color-text)">Server checks signature,</text>
  <text x="280" y="320" text-anchor="middle" class="d-small" style="fill:var(--color-text)">expiry, audience and scope</text>
  <text x="280" y="337" text-anchor="middle" class="d-small" style="fill:var(--color-text)">on every call</text>
  <path d="M278 380H72" class="d-wire-server" marker-end="url(#oa-s)"/>
  <text x="175" y="372" text-anchor="middle" class="d-small">6 result</text>
</svg>
`,f=`<svg class="diagram" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Before 2026-07-28 a client was pinned to one server instance by a session id. Now every request is self-contained and any instance can answer.">
  <defs>
    <marker id="se-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" class="d-head-client"/></marker>
  </defs>

  <!-- Before -->
  <rect x="10" y="10" width="265" height="300" rx="12" class="d-box"/>
  <text x="26" y="36" class="d-title">Until 2025-11-25</text>
  <text x="26" y="55" class="d-small">pinned to one instance</text>
  <rect x="26" y="110" width="80" height="48" rx="10" class="d-client"/>
  <text x="66" y="139" text-anchor="middle" class="d-title">Client</text>
  <rect x="180" y="84" width="80" height="44" rx="10" class="d-server"/>
  <text x="220" y="111" text-anchor="middle" class="d-title">Server A</text>
  <rect x="180" y="150" width="80" height="44" rx="10" class="d-gone"/>
  <text x="220" y="177" text-anchor="middle" class="d-title d-muted">Server B</text>
  <path d="M106 125L178 108" class="d-wire-client" marker-end="url(#se-c)"/>
  <path d="M106 143L178 168" class="d-wire-client d-dash" style="opacity:.45"/>
  <path d="M150 150L166 164M166 150L150 164" class="d-strike"/>
  <text x="26" y="228" class="d-mono" style="font-size:11px">initialize</text>
  <text x="26" y="248" class="d-mono" style="font-size:11px">Mcp-Session-Id: 1868…</text>
  <text x="26" y="276" class="d-small">Needs sticky routing or a</text>
  <text x="26" y="294" class="d-small">shared session store</text>

  <!-- After -->
  <rect x="285" y="10" width="265" height="300" rx="12" class="d-box"/>
  <text x="301" y="36" class="d-title">From 2026-07-28 <tspan class="d-small">(latest)</tspan></text>
  <text x="301" y="55" class="d-small">every request stands alone</text>
  <rect x="301" y="110" width="80" height="48" rx="10" class="d-client"/>
  <text x="341" y="139" text-anchor="middle" class="d-title">Client</text>
  <rect x="455" y="84" width="80" height="44" rx="10" class="d-server"/>
  <text x="495" y="111" text-anchor="middle" class="d-title">Server A</text>
  <rect x="455" y="150" width="80" height="44" rx="10" class="d-server"/>
  <text x="495" y="177" text-anchor="middle" class="d-title">Server B</text>
  <path d="M381 125L453 108" class="d-wire-client" marker-end="url(#se-c)"/>
  <path d="M381 143L453 168" class="d-wire-client" marker-end="url(#se-c)"/>
  <text x="301" y="228" class="d-mono" style="font-size:11px">MCP-Protocol-Version: 2026-07-28</text>
  <text x="301" y="248" class="d-mono" style="font-size:11px">Mcp-Method: tools/call</text>
  <text x="301" y="276" class="d-small">Any instance can answer.</text>
  <text x="301" y="294" class="d-small">No handshake, no session.</text>
</svg>
`,p=`<svg class="diagram" viewBox="0 0 560 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MCP layers: tools and resources on top, JSON-RPC messages, then stdio or Streamable HTTP, with HTTPS and OAuth only on the remote path">
  <rect x="20" y="12" width="520" height="52" rx="10" class="d-server"/>
  <text x="36" y="36" class="d-title">What the server offers</text>
  <text x="36" y="54" class="d-small">tools, resources, prompts</text>

  <rect x="20" y="78" width="520" height="52" rx="10" class="d-client"/>
  <text x="36" y="102" class="d-title">JSON-RPC 2.0</text>
  <text x="36" y="120" class="d-small">request, response and notification messages</text>

  <rect x="20" y="144" width="250" height="52" rx="10" class="d-box"/>
  <text x="36" y="168" class="d-title">stdio</text>
  <text x="36" y="186" class="d-small">client launches the server</text>
  <rect x="290" y="144" width="250" height="52" rx="10" class="d-box"/>
  <text x="306" y="168" class="d-title">Streamable HTTP</text>
  <text x="306" y="186" class="d-small">one POST endpoint, JSON or stream</text>

  <rect x="20" y="210" width="250" height="60" rx="10" class="d-warnbox"/>
  <text x="36" y="234" class="d-title">Trust comes from you</text>
  <text x="36" y="254" class="d-small">you chose to run the process</text>
  <rect x="290" y="210" width="250" height="60" rx="10" class="d-auth"/>
  <text x="306" y="234" class="d-title">HTTPS and OAuth</text>
  <text x="306" y="254" class="d-small">TLS plus a bearer token</text>
</svg>
`,m=[`innerHTML`],h=e({__name:`Diagram`,props:{name:{}},setup(e){let{$slidev:h,$nav:g,$clicksContext:_,$clicks:v,$page:y,$renderContext:b,$frontmatter:x}=i(),S=Object.assign({"../../diagrams/architecture.svg":a,"../../diagrams/call.svg":o,"../../diagrams/example.svg":s,"../../diagrams/hero.svg":c,"../../diagrams/listen.svg":l,"../../diagrams/nxm.svg":u,"../../diagrams/oauth.svg":d,"../../diagrams/session.svg":f,"../../diagrams/stack.svg":p}),C=e,w=Object.entries(S).find(([e])=>e.endsWith(`/${C.name}.svg`))?.[1]??``;return w||console.warn(`Diagram "${C.name}" not found in diagrams/`),(e,i)=>(t(),r(`div`,{class:`slide-diagram`,innerHTML:n(w)},null,8,m))}});export{h as t};