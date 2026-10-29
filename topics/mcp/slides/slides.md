---
theme: default
title: MCP under the hood
colorSchema: light
aspectRatio: 16/9
routerMode: hash
transition: none
drawings:
  persist: false
fonts:
  provider: none
layout: two-cols
layoutClass: cover-split
---

# MCP under the hood

How AI agents talk to your tools

<p class="muted">Covers <Fact k="coversLabel" />. Reviewed <Fact k="lastReviewed" />.</p>

::right::

<Diagram name="hero" />

<!--
Welcome. Over the next hour: why MCP exists, how it is built, what the 2026 spec changed, how a call and its security work, and how to build a server.
Ask who has already connected an MCP server to Claude Code or an IDE. Use that to set the level.
-->

---

## Every AI app needed its own plug

<Diagram name="nxm" />

<!--
Before MCP, each app-and-tool pair needed its own connector. Three apps and three tools is nine integrations. Each new one multiplies the work.
With a shared protocol it is six, and each new app or tool adds just one.
The idea came from the Language Server Protocol that editors use.
-->

---

## One plug for every tool

<Diagram name="hero" />

<!--
Hold this slide. MCP is a plug: a tool describes itself once as a server, and any MCP client can discover and use it.
Mention the USB-C comparison, then move on.
-->

---

## From side project to Linux Foundation

- **Nov 2024** Anthropic open-sources MCP, spec `2024-11-05`
- **Mar 2025** Streamable HTTP replaces HTTP+SSE
- **Jun 2025** Structured tool output, elicitation, OAuth resource server rules
- **Nov 2025** OpenID Connect discovery, Client ID Metadata Documents, experimental Tasks
- **9 Dec 2025** Donated to the Agentic AI Foundation, under the Linux Foundation
- **28 Jul 2026** Spec `2026-07-28`: the largest rewrite since launch <span class="new-badge">latest</span>

<!--
Not an IETF or ISO standard. It is an open protocol with its own proposal process, built on JSON-RPC, OAuth and OpenID Connect.
Anthropic co-founded the foundation with Block and OpenAI. The maintainers stayed the same.
-->

---

## Host, client, server: who does what

<Diagram name="architecture" />

<!--
The host is the app the person uses. It runs one MCP client per server. The model never talks to a server directly: the client does.
Servers wrap a system: local files and tools on one side, a remote API such as Azure DevOps on the other.
-->

---

## Three primitives, three owners

| Primitive | Controlled by | Example |
|---|---|---|
| Tools | The model | Create a work item |
| Resources | The app | A file or a query result |
| Prompts | The user | A slash command |

<!--
The owner decides who triggers it. The model picks tools. The app attaches resources. The user chooses prompts.
Most servers today are tools-only, and that is fine.
-->

---
layout: two-cols
layoutClass: wide-right
---

## JSON-RPC: the language on the wire

Every message is JSON-RPC 2.0.

A request has a `method`, `params` and an `id`. The response repeats the `id` with a `result` or an `error`.

No `id` means a notification: no reply.

::right::

<<< ../snippets/jsonrpc-request.json json

<<< ../snippets/jsonrpc-response.json json

<!--
Optional demo: open the MCP Inspector and show the raw request and response for one tool call.
JSON-RPC only defines the message shape. The transport decides how it travels.
-->

---

## stdio or Streamable HTTP: choosing the road

<Diagram name="stack" />

<!--
stdio: the client launches the server as a subprocess. No network, trust comes from you running it.
Streamable HTTP: one endpoint, every message a POST, answer as JSON or as a stream. It replaced HTTP+SSE.
Remote servers use HTTPS and OAuth.
-->

---

## The session is gone <span class="new-badge">2026-07-28</span>

<Diagram name="session" />

<!--
Until 2025-11-25: initialize, then a session id on every call. That pins the client to one instance, so you needed sticky routing or a shared session store.
Now: every request is self-contained. Any instance can answer. This is the breaking change.
-->

---

## What changed in 2026-07-28 <span class="new-badge">breaking</span>

| | Before | Now |
|---|---|---|
| Start | `initialize` handshake | None, `_meta` on every request |
| Session | `Mcp-Session-Id` | Removed |
| Discovery | `initialize` then `tools/list` | `server/discover` |
| Notifications | `resources/subscribe` | `subscriptions/listen` |
| Server asks the client | Request mid-call | Ask, then retry with `inputResponses` |
| Broken stream | Resume | Send the request again |

<!--
Servers that read or write a session break. Check SDK support before upgrading.
Also removed: ping, logging/setLevel. Deprecated: roots, sampling, logging.
-->

---
layout: two-cols
layoutClass: wide-right
---

## Discover, don't handshake <span class="new-badge">2026-07-28</span>

The client declares its version on every request, and can ask a server what it offers in one call.

`ttlMs` and `cacheScope` let clients and gateways cache the catalog.

::right::

```http
POST /mcp HTTP/1.1
Authorization: Bearer <access-token>
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: get_work_item
```

<!--
server/discover returns the protocol version, capabilities and the full tool list. tools/list still works.
The Mcp-Method and Mcp-Name headers let a gateway route without parsing the body.
Check the spec on whether servers must implement server/discover before you state this as a rule.
-->

---

## Push without a session <span class="new-badge">2026-07-28</span>

<Diagram name="listen" />

<!--
One long-lived POST with a filter. Events stream back on that response, tagged with a subscription id.
Like SignalR in spirit, but one-way, no connection state, no automatic reconnect. If it drops, open a new request and refetch.
-->

---

## Anatomy of a tool call

<Diagram name="call" />

<!--
DEMO 1: Azure DevOps MCP in Claude Code. Sign in, then list the tools. Point out that the list came from the server, not from the client.
The model reads the schemas, picks a tool, and writes arguments. Then the call, then the result.
-->

---

## What comes back

- **text** a string, often JSON or Markdown inside
- **image, audio** base64 plus a MIME type
- **resource_link** a URI to fetch later
- **embedded resource** text or a base64 blob
- **structuredContent** validated JSON when the tool declares an `outputSchema`

<!--
The spec enforces the block types and the schema when there is one. It does not look inside a text block. There is no table type.
The model or the client turns rows into a table, a summary or a chart.
-->

---

## From 401 to bearer token

<Diagram name="oauth" />

<!--
Authorization is optional, but when used it is plain OAuth 2.1 and OpenID Connect.
401 points to the Protected Resource Metadata, RFC 9728. The client signs in with PKCE. The token is for this server only: Resource Indicators, RFC 8707.
The server checks signature, expiry, audience and scope on every call.
-->

---

## Where tokens live, and who holds them

- The spec leaves storage to the client. Use the OS secure store, per user and per server
- The token travels in the `Authorization` header, never in the URL
- A refresh token keeps the user signed in across restarts
- The **host** holds the token. A sub-agent asks the host's client to call
- Need narrower access for a sub-agent? Use token exchange (RFC 8693) in your own design

<!--
A sub-agent that calls through the host inherits the host's full access to that server. OAuth scopes are per user and client, not per agent.
Never paste a raw token into a prompt or a sub-agent's context.
-->

---

## Auth hardening in 2026 <span class="new-badge">2026-07-28</span>

- Clients **must** validate the `iss` parameter on authorization responses (RFC 9207)
- Credentials are bound to the authorization server that issued them
- Client ID Metadata Documents come before Dynamic Client Registration, which is deprecated
- Refresh-token guidance for OpenID Connect style servers

<!--
One client talks to many authorization servers, which makes mix-up attacks easier. These changes make each exchange more trustworthy.
They still only cover admission: whether a client gets a token. Not what the tool does afterwards.
-->

---

## Five ways it goes wrong

| Problem | Defence |
|---|---|
| Confused deputy | Per-client consent, strict redirect URIs |
| Token passthrough | Validate audience, one token per hop |
| DNS rebinding | Validate `Origin` and `Host` |
| Authorization server mix-up | Validate `iss`, bind credentials to the issuer |
| Prompt injection, tool poisoning | Vetted servers, least privilege, human approval |

<!--
The last one is the main practical risk. A tool description or result can contain instructions aimed at the model.
OAuth cannot help with that. Treat tool output as untrusted text.
-->

---
layout: two-cols
layoutClass: wide-right
---

## Your first MCP server in C#

Stateless, so any instance can answer.

One tool class, one endpoint.

::right::

<<< ../snippets/Program.cs csharp

<!--
DEMO 3: build this live, or play the recording as a fallback. Then run the Inspector against it.
Check the SDK version supports 2026-07-28 before you present.
-->

---

## Which language should you pick?

| Language | Good fit when |
|---|---|
| C# and .NET | Your logic already lives in .NET |
| TypeScript | Reference SDK, fastest prototyping |
| Python | Data, ML and scripting |
| Java and Kotlin | Enterprise, Spring or Quarkus |
| Go and Rust | Small, fast binaries |

<!--
Any language that speaks JSON-RPC over stdio or HTTP works. Choose by SDK maturity and your team.
Check each SDK's release notes for 2026-07-28 support.
-->

---
layout: statement
---

# Every tool you connect costs context

Names, descriptions and schemas are sent to the model with every request.

<!--
Each tool's name, description and schema is sent to the model. Many servers, or one big server, bloat the context and the model picks the wrong tool.
Enable only the tools the task needs.
-->

---

## Before you ship

- Describe every tool and input clearly
- No state in memory between calls
- OAuth for anything remote, checked on every call
- Never forward a client's token
- Least scope, human approval for risky actions
- Test with the Inspector, then a real client
- Pin the spec revision you target

<!--
Walk the list quickly. Point to the guide for the detail.
-->

---
layout: center
---

# Questions

Guide and slides: see the link in the talk invite

<p class="muted">Covers <Fact k="coversLabel" />. Reviewed <Fact k="lastReviewed" />.</p>

<!--
Remind people the guide has a "What changed since" section, so earlier attendees can catch up.
-->
