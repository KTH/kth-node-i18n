# kth-node-i18n

i18n module for both browser and Node.js.

## Multiple Installed Copies

This package stores language data in module-local state (`messages`). If your dependency tree installs more than one copy of `kth-node-i18n`, each copy has its own `messages` array.

In that situation, one copy may be initialized while another remains empty, which can lead to missing translations.

### Recommendations

- In applications, depend on `kth-node-i18n` directly
- In shared libraries, prefer `peerDependencies` for `kth-node-i18n`
- Keep lockfiles deduped so one runtime copy is used

### Troubleshooting

Check how many copies are installed:

```bash
npm ls kth-node-i18n
```

If multiple copies are shown, align versions and reinstall dependencies.
