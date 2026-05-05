# 자동화·빌드·CI (p1-automation-rhythm)

모노레포 전체에 적용되는 **빌드·개발·배포 반복 패턴**이다.

---

## 패키지 매니저 · 워크스페이스

- **pnpm + Turborepo** 사용. `npm install`, `yarn` 금지.
- 패키지 추가: `pnpm add <pkg> --filter <workspace-name>`
- 루트 devDep 추가: `pnpm add -D <pkg> -w`
- workspace 이름은 `package.json`의 `"name"` 필드 기준.

## 주요 dev 명령어

| 명령어 | 대상 앱 |
| --- | --- |
| `pnpm dev:instiz` | instiz + ui-docs + uikit |
| `pnpm dev:ichart` | ichart + ui-docs + uikit |
| `pnpm dev:ichart-admin` | ichart-admin + ui-docs + uikit |
| `pnpm dev:instiz-admin` | instiz-admin + ui-docs + uikit |

> uikit을 수정하면 dev 실행 시 자동으로 함께 빌드됨. 별도 `build:uikit` 불필요.

## 빌드

- 개별 빌드: `pnpm build:<앱명>` (ichart / instiz / ichart-admin / instiz-admin / ui-docs)
- 전체 빌드: `pnpm build`
- Turborepo 캐시를 활용하므로 **불필요한 `--force` 금지**.

## lint · 타입 · 포맷

```bash
pnpm lint          # ESLint (전체)
pnpm check-types   # tsc (전체)
pnpm format        # Prettier (ts, tsx, md)
```

- PR 전 반드시 `lint` + `check-types` 통과 확인.
- 포맷은 Prettier 자동화. 수동 포맷 커밋 금지.

## 테스트

```bash
pnpm test          # 전체 (watch 모드)
pnpm test:ci       # CI 모드 (단발 실행)
```

## turbo.json 수정 원칙

- 새 task 추가 시 `dependsOn`, `outputs` 명시 필수.
- `cache: false`는 `dev` 계열 persistent task에만 허용.
- `globalEnv`에 새 환경변수 추가 시 팀 공유 후 반영.
