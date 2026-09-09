# Build and Test Summary

## Final r3 execution results — 2026-09-09

Author: Codex `/root/v2_core_review`. Current approved scope is MC-REQ-001 r3, 85 active criteria and G01–G12, with original deferred capabilities preserved below. Code Generation is separately approved by AP-MVP-CODE-001, manifest `450617043a106289151ed842ce98539bca9548618b0e236e2a2ebabf76ab28ea`; formal Build and Test entered at 13:04:38 KST. The final execution results below are complete. Independent matrix review and Root's manifest-bound Build/Test approval are separate from this authored summary; this document does not grant that approval.

### Exact build and artifacts

Release `release/build-z9OSa3` completed at **2026-09-09T13:02:48.386+09:00**, source commit `26eb06f43d3e02aa1b0db04b85e1e870f239a417`, product subtree `bcc9d01fda8f9e01f913f69c7456153b4556986b`. The receipt records 16,208 archive entries checked. Build duration was not separately measured; completion timestamp is not a duration. Build/typecheck succeeded; retained SQLite experimental/Vite chunk warnings do not substitute for test outcomes.

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| `MindCraft-0.1.0-windows-x64.exe` | 118840069 | `6acc01d3dc82032a9c7214bceef44cada5a67d51524708945fda4f31e3e2b150` |
| `MindCraft-0.1.0-source.zip` | 2821798 | `6d0584e858c93dec83c706cf9ef414b21286f08f2a0509acbe38cbb2459ad50e` |
| `complete/release-manifest.json` | 2186 | `8e1a86b5faad31932a0c435b2707df495ed67f87b41c5897b5bac67ef38a0928` |

Independent read-only hashing reproduced both artifact hashes, receipt/checksums, source commit/product subtree and all six CodeGen manifest inputs. The source ZIP includes final Core `B589560D87B4383122EE1FF9C63B50A39517CFAC630F1D732DF4BE6CA14DD9F9`, Session/timeout/workload acceptance tests. Git LF normalization of the timeout test was explicitly checked rather than mistaken for a content change.

### Executed test summary

| Execution | Result | Evidence and exact limits |
|---|---|---|
| Final source unit/integration/native suite | 478 PASS, 0 fail/cancel/skip; 185078.1134 ms | `.test-data/mvp-unit-release-final.log`, final B589 Core. Coverage percentage was not measured. This suite overlaps focused tests; counts are not additive. |
| Development GUI recovery/history/search/follow/navigation | 13 PASS; 224876.458 ms | `.test-data/mvp-gui-recovery-onboarding-final.log`; final renderer with preceding 04E6 development Core. The Session-only B589 change was separately tested and compiled into the final package. |
| Development onboarding/credential GUI | 4 PASS; 58061.213 ms | `.test-data/mvp-gui-onboarding-final.log`; controlled strict Core credential availability/failure responses, production renderer/preload. Actual native vault roundtrips and live DPAPI evidence remain distinct. |
| Model configuration / positive Core workflows | 7 PASS | `.test-data/mvp-model-config-freeze-166b.log`: 5 configuration cases plus 2 Core cases; global role ambiguity/count/missing roles blocked, one provider/both roles and fresh-confirmed resume. Controlled runtime is not live inference; later diagnostic/Session deltas have separate evidence. |
| Storage locations / failure cleanup | 5 PASS | `.test-data/mvp-paths-final-v4.log`, 04E6 Core; actual rename/startup conflicts, controlled workspace/receipt EACCES, protected-store distinction, preserved data and lock reacquisition. Not every OS fault combination. |
| Actual untrusted TLS | 1 PASS | `.test-data/mvp-tls-attempt-03-final.log`; matching localhost SAN, request-local CA health success, production trust rejection before guarded HTTP, no external network or system trust change. |
| Session start/end cleanup | 3 PASS | `.test-data/mvp-session-final.log`, B589 Core; start/end metadata, finished Run preservation, failed final record write rejects while lock cleanup succeeds. End fields observe drain, not OS-process exit receipt. |
| Actual search timeout/retry | 1 PASS | `.test-data/mvp-search-timeout-final.log`, B589 Core; real timer abort/partialTimedOut, three persistent partial sources, confirmed context unchanged, explicit fresh search succeeds; Core and native host closure awaited. |
| Measured workload | 1 test / 9 phases PASS; 25415.2875 ms total | `.test-data/mvp-workload-final.log`, 04E6 Core. 20×64KiB UTF-8 files, 20×32KiB Knowledge captures, 100 seeded histories plus 2 fixture Runs. Parent sampled peak RSS164159488 bytes includes fixtures/expected bodies and excludes native child; no threshold or runtime cap. Session-only change has separate coverage. |
| Exact final directory GUI, Korean-folder portable GUI, GUI→CLI→TUI→GUI/Busy | 3 PASS, 0 fail/cancel/skip; 70498.0324 ms | `.test-data/mvp-packaged-final.log`, build-z9OSa3. Actual sample/native approved save, shared Runs/promoted Knowledge/exclusive writer checks. |
| Exact final real ConPTY | 4 PASS, 0 fail/cancel/skip; 64995.5647 ms | `.test-data/mvp-conpty-final.log`; actual console modes/TTY/masking and directory/portable Korean CLI/TUI. |
| Exact final stored live-model GUI reopening | PASS, exit0 | `.test-data/mvp-airouter-reopen-final.log`: app.isPackaged, owned EXE/profile identity, both model labels/completed outputs/public marker. No new run or API command. |

All final package checks explicitly targeted `release/build-z9OSa3`. Earlier real Airouter Qwen3.8 worker and DeepSeek-V4-Flash planner probes/inferences used protected credentials and synthetic material in demo mode; see `../mindcraft/evidence/airouter-live-20260909.json`. Reopening verifies persistence and display, not a second live invocation or quality benchmark. Offline remains network-free fixture behavior; other-provider success guarantees remain deferred.

### Current assessment and final approval handoff

Build: **SUCCESS**. Listed final executions: **PASS** with the stated exact-source/applicability boundaries. Six instruction documents exist (build, unit, integration, performance, security, E2E); test instructions and presence alone are not test execution. Security invariants retain actual approval/permit/replay/DTO/native credential/TLS evidence; original runnable command sandbox remains unsupported and fail-closed. Measured profile results satisfy only the approved r3 workload conditions, not original 220GiB capacity or a product-wide memory bound.

Final AC/Gate dispositions and independent review are maintained in `mvp-r3-acceptance-matrix.md`. **Ready for Operations/final lifecycle completion: pending Root's final manifest-bound Build/Test approval at this writing**; Operations is a placeholder in the installed rules and does not require a separate operational deployment to end the current workflow. Root owns state/audit/progress and the final approval; this summary is their factual execution input.

The older 477/15 and 472 results, failed location/model assertions, startup lock failure, fixture/matcher/type/cleanup corrections and historical ConPTY timeout/failure remain preserved in the sections below and `../../reviews/mvp-r3-focused-corrections.md`. Final PASS does not rewrite those attempts. Original strict command execution, full cross-page Markdown/GFM and approval-diff paging, 100+100+20GiB, broad clean-Windows/SMB/power-loss/native-IME and all-provider guarantees are deferred, not passed. The original backup branch/tag remains preserved.

## Historical r3 status — 2026-09-09T12:35:00+09:00

Approved first-release scope is MC-REQ-001 r3 and its 85 active acceptance criteria, not the original full-capacity release below. Code Generation remains IN_PROGRESS; formal Build and Test has not been approved. Remote backup branch/tag `codex/backup-before-mvp-r3-20260909` / `backup-before-mvp-r3-20260909` preserve the original state at `3f55c536199086b6eb836e64d6a2868910231ab7`.

The r3 presentation build passed, the broad regression passed 477 cases, and the fresh Electron/recovery/IPC/composition run passed 15 cases with no failure/cancellation/skip. Additional actual-Core resume/role, controlled credential presentation and real self-signed TLS rejection evidence are recorded in `../../reviews/mvp-r3-source-verification.md`. Counts overlap and are not added into a coverage percentage. The subsequent independent acceptance audit reproduced location-specific storage error and ambiguous provider-role failures; these must pass after narrow Core corrections before these results can be treated as final-source acceptance. Original failing runs are preserved in `../../reviews/mvp-r3-focused-corrections.md`.

Current traceability: `mvp-r3-acceptance-matrix.md`. A new source-matched portable EXE/source ZIP and exact-artifact GUI/CLI/TUI verification remain required. Previously generated source763d0d1 artifacts are historical baselines and do not include the current r3 corrections. No completion claim or final approval is made here.

Original strict command execution, complete cross-page Markdown/GFM and large-diff support, 100+100+20GiB capacity and broad clean-Windows/SMB/power-loss/native-IME certification are explicitly deferred. They are not marked passed. Current acceptance uses the approved 20-document/20-Knowledge/100-seed-history plus 2-fixture-Run workload. Approval, credential protection, mode isolation, integrity and fail-closed command behavior remain active.

## Preserved previous result snapshot

Author: Codex root. Recorded2026-09-09T11:27:00+09:00. This is the prescribed result file prepared during Code Generation; the formal Build and Test stage prerequisite is not yet satisfied. It records executed evidence and unresolved gates, not a completion announcement.

## Build Status

- **Build Tool**: Node.js24.13.0, TypeScript5.9.3, Vite8.2.2, Electron44.2.0 and locked dependencies.
- **Build Status**: current development build and typecheck SUCCESS. Initial test-only CoreServicePort typing diagnostics were corrected with a verified concrete-Core assertion; original logs retained.
- **Build Artifacts**: latest source763d0d1 release/build-7SWD9A portable EXE/sourceZIP/checksums includes the search-failure correction. See release-763d0d1-verification.md for immutable hashes and retained test failure. Earlier source17d3d1e release/build-dZ1pzJ remains preserved.
- **Build Time**: baseline receipt completed11:08:14KST. Overall build duration was not separately instrumented; do not substitute test duration.
- **Warnings**: Vite chunk exceeds500KiB; Node SQLite experimental warning. Neither is a test pass/fail substitute.

## Test Execution Summary

### Unit and service integration suite

- **Command**: `node --import tsx --test --test-concurrency=4 tests/*.test.ts tests/*.test.mjs`.
- **Total Tests**:472. **Passed**:472. **Failed/Canceled/Skipped**:0/0/0.
- **Duration**:163938.8951ms. **Coverage**: percentage not measured.
- **Status**:PASS for the implemented suite. This glob includes unit/service/native/launcher tests and does not include all Electron/packaged tests.
- **Evidence**: `.test-data/search-failure-unit-controlled.log`, exit0.
- **Preserved earlier result**: default-concurrency run alongside GUI yielded471 PASS and1 timeout cancellation in the unchanged60-second NSIS launcher test. Same test alone passed2/2 in21.49s; final complete four-worker run passed without changing assertions/timeouts. Contention is plausible, not a proven cause.

### Integration Tests

- Actual Core search-failure fault injection and strict wire checks:6/6 PASS. Confirms partial summaries, exact terminal ordering, confirmed-context preservation/retry, original-error preservation, initial-event failure timer cleanup and postcommit durable context.
- CLI/TUI suite:21/21 PASS, including distinct search failure and subsequent interaction.
- Actual two-model Airouter integration: Qwen3.8 worker and DeepSeek-V4-Flash planner authenticated probes and real synthetic-marker inferences PASS. Credentials used Windows DPAPI and are excluded from artifacts. Other providers remain unverified.
- These scoped suites overlap the full suite where their files match its glob; do not add their counts as independent total coverage.

### Performance Tests

- **Response Time/Throughput/Error Rate**: target-capacity measurements not established.
- **Status**:NOT_RUN at required100GiB materials+100GiB Knowledge+20GiB history scope.
- Small fixture timing, bounded-output checks and live marker response times do not prove G-09 or sustained performance.
- Additional measured workload:20 physical64KiB UTF8 documents,20 actual32KiB Knowledge captures,100 seeded histories and2 offline fixture Runs;9 phases PASS after independently reviewed test-cleanup correction. Parent sampled RSS194,256,896 bytes excludes native child and includes fixture/expected bodies. This is not a product memory bound. See workload-profile-verification.md and ../../reviews/workload-profile-review.md for exact evidence and limitations.

### Additional Tests

- **Contract Tests**:implemented strict IPC/event/source-output tests PASS; original all-interface acceptance remains partial.
- **Security Tests**: scoped native protected-store/permission/IPC checks and production dependency audit0 known findings; full strict LPAC+Job command confinement is unavailable/fail-closed. Status PARTIAL.
- **E2E Tests**: actual Electron13/13 PASS for current search/Knowledge/recovery/follow scope. Latest763d0d1 artifact directoryGUI/parity2 and portableGUI1 PASS. Independent ConPTY first run3 PASS/1 FAIL (directory exit observation), identical isolated directory rerun1 PASS; cause unproven, original failure retained. Subsequent exact763d0d1 packaged GUI reopened both stored Airouter results successfully without new inference; see release-763d0d1-airouter-reopen.md. Earlier17d3d1e ConPTY4/reopening evidence remains historical and separate.
- **Instruction artifacts**: build-instructions.md, unit-test-instructions.md, integration-test-instructions.md, performance-test-instructions.md, security-test-instructions.md and e2e-test-instructions.md all exist. Their presence is not evidence every described test has run.

## Overall Status

- **Build**:SUCCESS for current development source and the identified763d0d1 artifact.
- **All Tests**:implemented fresh suite PASS; complete required gate coverage NOT COMPLETE.
- **Ready for Operations**:NO.
- **Code Generation stage**:IN_PROGRESS. No full stage completion/Build and Test approval is granted by this file.

## Next Steps

Finish and independently verify full long-document Markdown/GFM and approval-diff paging, strict command confinement, remaining source-backed large-data flows, real supported-provider matrix and clean-Windows/SMB/native-IME acceptance. Preserve requirement IDs and existing gates rather than replacing them with completed subsets. The search-correction package and hashes are now recorded in release-763d0d1-verification.md. The requested 13:00 scope-reduction proposal is not yet approved. Final full-input manifest review and separate root stage approval require all applicable completion conditions to be satisfied. See acceptance-evidence-matrix.md and ../../reviews/search-terminal-failure-review.md for scoped evidence and retained failures.
