---
"@nexcraft/forge": patch
---

Refactor test suite to prevent resource contention and timeouts

- Split tests into fast unit tests (1147 tests) and slow accessibility tests (35 tests)
- Add `test:unit` and `test:a11y` npm scripts for separate execution
- Update `test:coverage` to run both suites sequentially
- Accessibility tests now run in single-fork mode to prevent timeouts
- Coverage maintained at 87% (above 70% threshold)
- All 1182 tests now pass reliably in CI without timeouts

**Benefits:**
- Faster test execution (unit ~13s, a11y ~3s vs previous 30s+ with timeouts)
- No more flaky accessibility test failures due to resource contention
- Better test organization for future maintenance
