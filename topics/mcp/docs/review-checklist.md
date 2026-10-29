# MCP review checklist

Run through this before each delivery and whenever `spec-watch` opens an issue.

## Update
- [ ] Read the changelog of the latest spec revision and compare with `facts.json` (`specRevision`)
- [ ] Update `facts.json`: revision, dates, counts, deprecated and removed lists, `lastReviewed`
- [ ] Update the affected acts in `site/src/content/acts/` and the matching slides
- [ ] Add a dated entry to `changelog.json` saying what moved
- [ ] Check every link in `facts.json` still loads

## Claims to verify against the spec text (they were taken from secondary sources)
- [ ] Is `server/discover` mandatory for servers, or optional? One SDK page says a server must implement it. Others say clients may skip it
- [ ] The exact set of removed methods (`ping`, `logging/setLevel`, `resources/subscribe`, `resources/unsubscribe`) and what is only deprecated (roots, sampling, logging)
- [ ] Multi Round-Trip Requests: the field names (`inputResponses`) and how a server signals that it needs input
- [ ] Streamable HTTP: the required headers (`MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name`) and the error behaviour on a mismatch
- [ ] Authorization: the client registration order, and the six hardening proposals (SEP numbers)
- [ ] Tasks: where the extension lives now and its name

## Code and demos
- [ ] `snippets/Program.cs` compiles and runs against the C# SDK version you will demo. It is not compiled by this repo
- [ ] Run the MCP Inspector against the sample server
- [ ] Demo 1: the Azure DevOps MCP server lists its tools after sign-in. Use a demo project, and keep real names off screen
- [ ] Record fallbacks of the demos

## Watcher
- [ ] The repo named in `topic.json` (`watch.repo`) is still where spec releases are published. If it moved, update it
