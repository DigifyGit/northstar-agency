# L1 Technical Assessment

> Pattern basis: TestGorilla / Mercer-Mettl / staffing practical screens
> Pass threshold: 60% (18/30)

## Instructions
- Score each scenario from 0 to 3.
- 0 = incorrect/no usable approach.
- 1 = partial approach with major gaps.
- 2 = mostly correct with minor gaps.
- 3 = complete, practical, support-ready answer.

## Scenario 1 - Active Directory lockout and password reset
- Scenario description: A remote user cannot sign in because the account is locked after repeated failed attempts.
- Expected answer framework: verify identity, unlock account, reset password, force password change, verify MFA rebind.
- Scoring rubric (0-3):
  - 0: no identity check and no safe reset flow.
  - 1: resets password but misses lockout/MFA verification.
  - 2: covers identity + unlock + reset but misses final validation.
  - 3: complete flow including post-reset access confirmation.

## Scenario 2 - Microsoft 365 sign-in fails after onboarding
- Scenario description: A new starter account exists but cannot access Microsoft 365 apps.
- Expected answer framework: check license assignment, sync delay, sign-in logs, conditional access policy, retry on clean session.
- Scoring rubric (0-3):
  - 0: generic answer without M365 checks.
  - 1: checks one likely cause only.
  - 2: checks licensing + sign-in logs.
  - 3: full isolation flow with policy and session validation.

## Scenario 3 - Wi-Fi connected, no internet
- Scenario description: User is connected to Wi-Fi but websites do not load.
- Expected answer framework: check IP/gateway, test DNS resolution, ping gateway/public host, reset adapter.
- Scoring rubric (0-3):
  - 0: no network isolation method.
  - 1: checks connection only.
  - 2: includes IP and DNS checks.
  - 3: structured layer-by-layer diagnosis and fix validation.

## Scenario 4 - VPN drops every few minutes
- Scenario description: VPN connects but disconnects repeatedly during remote work.
- Expected answer framework: verify endpoint connectivity quality, inspect VPN logs/client version, check credentials/session timeout, escalate if gateway issue.
- Scoring rubric (0-3):
  - 0: no troubleshooting sequence.
  - 1: retries without diagnostics.
  - 2: checks logs or credentials.
  - 3: full diagnostic + escalation decision criteria.

## Scenario 5 - Printer queue stuck for a single user
- Scenario description: One user cannot print while others can.
- Expected answer framework: clear local queue, restart spooler, reinstall driver/profile printer, test print.
- Scoring rubric (0-3):
  - 0: no endpoint-focused approach.
  - 1: only restarts printer.
  - 2: queue/spooler actions present.
  - 3: complete endpoint remediation and validation.

## Scenario 6 - Windows update followed by severe slowness
- Scenario description: Laptop became slow after recent updates.
- Expected answer framework: review update history, check startup/process load, roll back/patch decision, monitor after reboot.
- Scoring rubric (0-3):
  - 0: no causal investigation.
  - 1: generic cleanup steps only.
  - 2: checks updates and startup pressure.
  - 3: structured rollback/mitigation with confirmation tests.

## Scenario 7 - Shared mailbox missing in Outlook
- Scenario description: Shared mailbox no longer appears for an authorized user.
- Expected answer framework: verify mailbox permissions, refresh profile/autodiscover, re-add mailbox, confirm send/receive.
- Scoring rubric (0-3):
  - 0: no mailbox permission checks.
  - 1: suggests restart only.
  - 2: checks permission or profile.
  - 3: end-to-end mailbox restore and validation.

## Scenario 8 - External monitor not detected via dock
- Scenario description: Monitor is not recognized when connected through docking station.
- Expected answer framework: isolate cable/port/hardware path, update dock and GPU drivers, set display mode, confirm stable output.
- Scoring rubric (0-3):
  - 0: no hardware isolation method.
  - 1: single quick check only.
  - 2: multiple checks but incomplete.
  - 3: complete hardware/software isolation with validation.

## Scenario 9 - Frustrated user and poor prior ticket notes
- Scenario description: User is upset and prior ticket notes are unclear.
- Expected answer framework: acknowledge issue, restate problem, rebuild timeline, set expectation, document cleanly.
- Scoring rubric (0-3):
  - 0: ignores communication quality.
  - 1: minimal empathy, weak structure.
  - 2: clear communication and triage.
  - 3: strong de-escalation + complete documentation approach.

## Scenario 10 - Endpoint fails compliance check
- Scenario description: Endpoint is blocked by compliance policy before app access.
- Expected answer framework: verify MDM/compliance status, trigger policy sync, apply missing patches/config, revalidate compliance.
- Scoring rubric (0-3):
  - 0: no compliance awareness.
  - 1: generic reboot answer only.
  - 2: checks policy state and sync.
  - 3: complete remediation with revalidation path.

## Score Sheet
| Scenario | Score (0-3) | Notes |
|:---:|:---:|:---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |
| 7 | | |
| 8 | | |
| 9 | | |
| 10 | | |

## Result
- Total score: /30
- Pass/Fail:
- Improvement plan:
