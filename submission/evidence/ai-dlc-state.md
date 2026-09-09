# MindCraft AI-DLC State Tracking

## Project Information

- Project Type: Greenfield; current work extends the GUI implementation under the preserved approved requirements.
- Workspace Root: `C:/ai/ai-dlc-09-09/mindcraft`.
- Application Code: `src/`, `tests/`, build/configuration files in the product root; never under `aidlc-docs/`.
- Documentation: `aidlc-docs/`; detailed change record in `audit.md`.

## Current Status

- Lifecycle Phase: CONSTRUCTION.
- Current Stage: Code Generation.
- Status: IN_PROGRESS. No Code Generation completion or formal Build and Test approval.
- Next Stage: formal Build and Test, only after required generation is complete.

- Updated: 2026-09-09; author: Codex root, following direct implementation and independent process audit.
- Project: C:/ai/ai-dlc-09-09/mindcraft; remote only https://github.com/ddt-mindcraft/ai-dlc-09-09.
- Current stage: Code Generation IN_PROGRESS; AP-GUI-DESIGN-001 approves reviewed Units/Functional Design/code-generation plan.
- Baseline: backup/gui-inception-20260908 at 55dedfe (root preservation); earlier history retained in audit.md and Git.
- Current input: MC-INPUT-001 v0.5; MC-REQ-001 r2; 17 stories + GUI-01~08; C-1~7; gui-contracts v1.
- Approval: AP-GUI-INCEPTION-001, manifest 0a93d01c2d6eb3e2572dda37e803d3666452e8bf86b3c8cce35a89f991ecca7d. Earlier non-GUI AP-* IDs are historical only. See reviews/inception-r3-approval.md.
- Active Construction amendment: `construction/mindcraft/code/body-paging-contract.md` defines wire protocol 2, replacing the original GUI contract's full-output Run responses and delta events. Stored Run format remains separate. `output-publication-contract.md` and `streaming-storage-contract.md` govern production publication and storage. Earlier approved requirements and acceptance criteria remain required.
- Current execution tracking: `construction/plans/mindcraft-code-generation-progress.md` supplements the immutable approved r2 plan with checked substeps and outstanding work. Approval of the baseline is not completion of its steps.
- Next action (2026-09-09T10:15:00+09:00): finish actual GUI live-follow regression and corrected-hash independent review, then freeze/push source and build/test a new EXE within the user's two-hour delivery window (conservative cutoff 11:48 KST). Container frames and compact reading/History changes are accepted dependencies; `reviews/gui-live-follow-review.md` preserves current failed tests and corrections. `construction/build-and-test/acceptance-evidence-matrix.md` maps the full original scope. Complete Markdown grammar/semantic index/renderer, paged approval diffs and remaining capacity/security/provider acceptance are still required. No new package has yet been produced; build-SOpzFF is the previous verified package.

## Stage progress

| Stage | Current status |
|---|---|
| Workspace Detection | independent workspace/repository verified by root |
| Reverse Engineering | SKIP: greenfield code |
| Requirements Analysis / User Stories / Workflow Planning | GUI revision APPROVED AP-GUI-INCEPTION-001 |
| Application Design | C-7 + six documents APPROVED AP-GUI-INCEPTION-001 |
| Units Generation | APPROVED AP-GUI-DESIGN-001 |
| Functional Design | APPROVED AP-GUI-DESIGN-001 |
| NFR Requirements / NFR Design | SKIP separate stages; substantive NFR absorbed in design/tests |
| Infrastructure Design | SKIP local desktop |
| Code Generation planning | APPROVED AP-GUI-DESIGN-001 |
| Code Generation | IN_PROGRESS; implementation, independent review and development-time checks executed |
| Formal Build and Test | NOT_STARTED as a completion stage; Code Generation and required comprehensive evidence remain incomplete |
| G-01~G-12 | Incomplete; scoped passes and failures recorded in implementation-summary.md, no overall gate approval |

## 상태 변경 이력

이 표는 이 저장소의 Git 원본과 승인 문서를 대조하여 2026-09-09T08:45:14+09:00에 root가 복원한 요약이다. 과거 행의 시각은 **커밋 시각**이며 당시 실제 승인·작업 시작 시각으로 추정하지 않는다. 상세 변경 이력은 `audit.md`에 유지한다. 앞으로 상태·단계·승인·차단·다음 행동이 바뀔 때 이 표에 행을 추가하고 기존 행은 보존한다. 잘못된 기록은 정정 행으로 연결한다.

| ID | 기록 시각 (+09:00) | 이전 → 이후 | 변경 이유와 근거 |
| --- | --- | --- | --- |
| ST-GUI-001 | 2026-09-08T23:38:28 | 기존 설계 검토 상태 → GUI 요구사항 변경 전 기준 보존 | 이 저장소 커밋 `55dedfe`, backup/gui-inception-20260908. 과거 승인을 새 GUI 버전에 승계하지 않음. |
| ST-GUI-002 | 2026-09-08T23:48:32 | 보존된 기준 → GUI Inception 수정본 REVIEW_PENDING | `95dceec`; GUI 요구·스토리·계획·설계 수정, `inception/plans/gui-revision.md`. |
| ST-GUI-003 | 2026-09-08T23:59:48 | GUI Inception REVIEW_PENDING → 승인, Units Generation 계획 | `d1e1177`; R-GUI-INCEPTION-002 후 AP-GUI-INCEPTION-001. Manifest `0a93d01c2d6eb3e2572dda37e803d3666452e8bf86b3c8cce35a89f991ecca7d`. |
| ST-GUI-004 | 2026-09-09T00:09:27 | Units 계획 → Units/Functional Design/Code Generation 계획 REVIEW_PENDING | `394b38f`; 산출물 제출 상태이며 구현 승인과 구분. |
| ST-GUI-005 | 2026-09-09T00:20:09 | 설계·생성 계획 REVIEW_PENDING → 승인, Code Generation IN_PROGRESS | `a4a69b5`; R-GUI-DESIGN-002 후 AP-GUI-DESIGN-001. Manifest `5d92f5bef56e7c38ed963996b0b054ba021d15dd04f210661e3797c723832f05`. |
| ST-GUI-006 | 2026-09-09T01:10:50 | Code Generation IN_PROGRESS → 유지, 샘플·GUI 증거 추가 | `168d073`; 부분 구현·검증이며 단계 완료 아님. |
| ST-GUI-007 | 2026-09-09T04:20:34 | Code Generation IN_PROGRESS → 유지, 패키지·터미널 진단 경계 갱신 | `ac0eb3b`; source-matched GUI release 증거, 미해결 항목 유지. |
| ST-GUI-008 | 2026-09-09T05:37:28 | 진행 중 → 유지, 새 콘솔 검증과 portable GUI 실패 기록 | `17ad52f`; 실패를 통과로 취급하지 않음. |
| ST-GUI-009 | 2026-09-09T05:43:16 | portable GUI 실패 기록 → 동일 제품 재검사 PASS, 전체 단계는 진행 중 | `24b6131`; 중복 fixture 공간 회수 후 재검사. 원래 실패와 용량 검증 한계 보존. |
| ST-GUI-010 | 2026-09-09T08:45:14 | 오래된 다음 행동·추적 누락 → 실제 v2 통합 상태로 정정, Code Generation IN_PROGRESS 유지 | 현재 작업 묶음; `reviews/wire-v2-integration-focused-review.md`, `construction/plans/mindcraft-code-generation-progress.md`. 실제 GUI·전체 clipboard 검사 통과, 장문 Markdown/diff·용량·격리·실제 provider 등 미완료. |
| ST-GUI-011 | 2026-09-09T08:51:34 | v2 통합·상태 추적 보완 묶음 → `658f690` 원격 보존 완료, 장문 Markdown 계약 구체화 착수 | Code Generation IN_PROGRESS 유지. 직접 서브에이전트가 설치된 parser의 메모리 특성과 GUI/통신 경계를 병렬 조사하고 root가 계약을 통합한다. 기존 요구사항 변경·단계 완료·새 배포 승인은 아님. |
| ST-GUI-012 | 2026-09-09T09:00:19 | 장문 Markdown 계약 작성 중 → MC-MARKDOWN-PAGING-001 r1 REVIEW_PENDING | `construction/mindcraft/code/markdown-paging-contract.md` 제출, SHA-256 `c03482d9449292cb53235d2dbc8bdebc3c0e2bd2d42a24f4e7a32b77551c5473`. 직접 서브에이전트 독립 검토 요청. Code Generation IN_PROGRESS 유지; 검토 통과·구현 승인·완료 아님. |
| ST-GUI-013 | 2026-09-09T09:02:58 | Markdown r1 REVIEW_PENDING → CHANGES_REQUIRED 기록, r2 REVIEW_PENDING | 독립 검토의 인라인 코드·응답형·파생 인덱스 검증 누락을 수정. r2 SHA-256 `9a6f118de62943ff915c707176d9a3073a03e427b0cbe28285d621870e76fb00`; `reviews/markdown-paging-contract-review.md`. 재검토 요청, 구현 승인 없음. |
| ST-GUI-014 | 2026-09-09T09:04:28 | Markdown r2 REVIEW_PENDING → 기초 계약 검토 통과, 별도 root 구현 승인 | R-MARKDOWN-002 후 AP-MARKDOWN-FOUNDATION-001. 동일 r2 해시의 스키마·저장·parser 기초 구현 범위 승인. metadata-only state 제외 검증 범위와 성능 한계 명시. GUI 세부 설계·완료 승인 아님; Code Generation IN_PROGRESS 유지. |
| ST-GUI-015 | 2026-09-09T09:08:06 | Markdown 기초 승인 → strict schema 구현·독립 반례 작성 중 | 직접 v2_wire_review가 `src/shared/document-contracts.ts` 구현, root가 `tests/document-contracts.test.ts`의 적대적 입력 검사를 작성. 아직 실행 결과 없음. endpoint 연결·parser·GUI 완료 아님. |
| ST-GUI-016 | 2026-09-09 | schema 구현 → 독립 검토 2건 수정·11 tests PASS·tsc PASS·재검토 통과 | `reviews/document-schema-focused-review.md`에 원래 9 PASS/2 FAIL과 수정 해시·집중 대조 보존. 최종 source `8897bfde2b1047c610c45bb15446906dd1c4ebb2a00868cd3ecdef127970c4c0`. root 부분 묶음 수용; 다음은 버전 고정 source ledger. 정확한 기록 시각은 이 커밋 시각 참조. Code Generation IN_PROGRESS 유지. |
| ST-GUI-017 | 2026-09-09T09:18:40 | schema 검증 완료 → 버전 고정 원문 순회 구현 시작 | 직접 Core 서브에이전트가 `src/core/document-source.ts`, root가 별도 단위·실제 Store 연결 테스트 작성. 기존 OutputPages API 재사용, 전체 문자열 누적 금지. 아직 검사 결과·parser 완료 아님. |
| ST-GUI-018 | 2026-09-09T09:21:10 | 원문 순회 구현 → 생성 시점 pin 결함 수정·6 tests PASS·tsc PASS·독립 재검토 통과 | `reviews/document-source-review.md`에 원래 실패와 집중 대조 보존. 최종 source `724e8148d267979f37aa099fd180772b32b2cb0b4f4e50165b852a8c944835a0`. root 부분 수용; 다음 디스크 source ledger/index. Code Generation IN_PROGRESS 유지. |
| ST-GUI-019 | 2026-09-09T09:23:59 | 검증된 원문 순회 → parser 전용 디스크 source ledger 구현 중 | 직접 Core 작성·root 독립 테스트. SQLite FILE TEMP에 줄/페이지 위치와 인증값 기록, 전체 본문 누적 없음. 아직 최종 문서 인덱스·GUI 연결·검증 완료 아님. |
| ST-GUI-020 | 2026-09-09T09:30:13 | source ledger 구현 → 메타데이터 선검사·rollback 캐시 결함 수정, 12 tests PASS·독립 재검토 통과 | 두 차례 집중 대조와 실패를 `reviews/document-source-ledger-review.md`에 보존. source `392dd697401ee968ff0aa877bbf226d79cc426e40248791d6ac584c0703e27ac`. root 부분 수용, 다음 scalar cursor/블록 파서. 세션 임시 ledger이며 최종 GUI·단계 완료 아님. |
| ST-GUI-021 | 2026-09-09T09:33:39 | source ledger 검증 완료 → scalar cursor와 fence 행 인식 구현·검토 중 | 직접 서브에이전트 두 명이 분리된 파일 작성, root 테스트·통합. cursor 초기 5 tests PASS; fence oracle 검사와 독립 리뷰 대기. 컨테이너·전체 블록 grammar·GUI 완료 아님. |
| ST-GUI-022 | 2026-09-09T09:35:27 | cursor/fence 행 구현 → 실제 Store 연결 포함 11 tests PASS·독립 검토 통과 | `reviews/document-cursor-fence-review.md`에 소스·테스트 해시와 초기 타입 오류 수정 보존. root 부분 수용. 다음 문맥 기반 블록 연결·디스크 컨테이너 stack; 전체 Markdown·GUI 완료 아님. |
| ST-GUI-023 | 2026-09-09T09:37:49 | fence 행 검증 완료 → 문맥별 fence 블록 상태 처리 구현 시작 | root가 여는/닫는 펜스·EOF·컨테이너 종료의 범위 계약 확정, 직접 Core 작성과 root oracle 테스트 분리. 부모 문맥의 판정·디스크 stack은 후속 필요. Code Generation IN_PROGRESS 유지. |
| ST-GUI-024 | 2026-09-09T09:42:08 | fence 블록 상태 구현 → 인용문 projection 경계 수정, 12 tests PASS·독립 재검토 통과 | 원래 실패와 집중 대조·최종 해시를 `reviews/document-fence-block-review.md`에 보존. root 부분 수용; 실제 부모 문맥 판정과 디스크 stack은 다음 작업. 전체 parser/GUI 완료 아님. |

ST-GUI-001 이전 기록은 이 저장소의 Git과 기존 audit에 보존되어 있다. 이번 표는 지정된 GUI 개정 이후의 상태를 추적하며, 이전 하네스나 다른 저장소를 실행·변경하지 않는다. ST-GUI-010은 과거 기록을 소급하여 정상 운영으로 꾸미는 행이 아니라, 추적 누락을 인정하고 보완한 정정 기록이다.

## 추가 상태 변경 이력

| ID | 기록 시각 (+09:00) | 이전 → 이후 | 변경 이유와 근거 |
| --- | --- | --- | --- |
| ST-GUI-025 | 2026-09-09T09:53:00 | container stack 구현 중 → 독립 trigger 결함 수정·7 tests PASS·재검토 통과 | `reviews/document-container-stack-review.md`. 시작 시점 이력 누락도 이 행으로 보완하며 당시 기록으로 소급하지 않는다. 최종 source dd40bacb00c307e310c81539b1f126e91cb6f33d47d22ff84b0ebef4a434de86. root 부분 수용; Code Generation IN_PROGRESS 유지. |
| ST-GUI-026 | 2026-09-09T09:53:00 | 기존 실행 순서 → 사용자 2시간 마감에 맞춘 GUI·통합·전달 병렬 계획 | `construction/plans/gui-delivery-timebox.md`; 보수적 마감 11:48 KST. 기존 요구·승인 기준 유지. 실제 화면과 새 EXE 검증 우선, 독립 GUI 검토에 따라 결과 탐색·기록 검색 개선. 기본 npm test 453 PASS, root tsc PASS. 아직 단계 완료·전체 gate 승인 아님. |
| ST-GUI-027 | 2026-09-09T10:03:00 | GUI 개선·검증 안내 작성 → 실제 화면·확대·키보드 검증과 독립 검토 통과 | `reviews/gui-delivery-review.md`, `construction/build-and-test/acceptance-evidence-matrix.md`. 기존 7 Electron PASS, 확장 GUI 1 PASS, clipboard 형식 보존 수정 후 1 PASS, tsc PASS. 실패 이력 보존. root 부분 수용; 새 EXE와 전체 gate는 미완료. |
| ST-GUI-028 | 2026-09-09T10:06:00 | 화면 개선 수용 → 명시적 실시간 따라가기 계약 검토·구현 승인 | R-GUI-FOLLOW-001 뒤 AP-GUI-FOLLOW-001. 계약 SHA745a2202b07bfb093b6afade84160db6fc696be033b8fadb00ab11c3d649e1e5. 기존 버전 보존·수동 읽기·승인 경계를 유지하며 client/UI 분리 구현. 실제 구현·검증은 진행 중. |

## Operating authority

Latest user instruction overrides historical Claude/DDT coordinator, prior remote and reporting workflow for this project only. Root and direct subagents perform AI-DLC author/reviewer roles; root makes delegated decisions and stage approvals. No changes/invocation to other harness files, shared reports, watcher, Claude/DDT or global setup. Project progress resides in AI-DLC documents and direct Git work by root single writer. Local repeated-question/user-approval defaults do not trigger another user question; product runtime permission rules remain unchanged. Details: inception/plans/gui-revision.md.

## Extension Configuration

| Extension | Enabled | Application |
|---|---|---|
| Security Baseline | Yes | All applicable controls; SECURITY-01 only exempts new blanket encryption for nonsecret local data, DPAPI and transport mandatory; SECURITY-04 now applies to renderer CSP |
| Resiliency Baseline | Yes | Directional local recovery guidance, no new SLA/RTO/RPO |
| Property-Based Testing | Yes / Partial | PBT-02/03/07/08/09 blocking; others advisory |

## Unverified risks

Actual provider integration, strict command child-process isolation, complete file+DB crash/SMB behavior, full-capacity data, all clean-Windows cases, full Markdown/diff paging and comprehensive GUI acceptance remain open. Scoped protected-store, IPC, sample, clipboard and packaged tests do not establish all corresponding gate requirements. Formal Build and Test instructions and a complete requirement-by-requirement evidence matrix are still required before stage completion. See `reviews/aidlc-process-audit-20260909.md` for the process gaps and correction scope.
