# shared/

Holds **design token names only**, nothing topic-specific.

- `tokens/contract.json` lists the token names every topic can rely on.
- `tokens/base.css` gives them neutral default values.
- Each topic overrides the *values* in `topics/<slug>/theme.css`.

## Rules

1. Add tokens freely. **Never rename or remove one.** A rename breaks every topic.
2. Components use semantic names (`var(--color-accent)`), never raw colours.
3. A change under `shared/` rebuilds **all** topics and the portal on the next deploy. Keep changes rare.
4. `npm run check` verifies the contract is intact.
