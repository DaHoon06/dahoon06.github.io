# 브랜드 · 디자인 시스템 (p5-brand-identity)

모든 앱에서 공유하는 **시각 원칙**과 **uikit 사용 규칙**이다.

---

## uikit 패키지

- 패키지명: `@instiz-team/uikit`
- UI 컴포넌트는 **직접 구현하지 않고 uikit에서 import** 한다.
- 필요한 컴포넌트가 없으면 **uikit에 추가**한다. 앱 내부에 복사하지 않는다.

### import 경로

```ts
import { Button, Input } from '@instiz-team/uikit/components';
import { SomeIcon }      from '@instiz-team/uikit/icons';
```

## 스타일

- **Tailwind CSS** 기반. 인라인 style prop 금지 (애니메이션·동적 값 제외).
- 커스텀 색상·폰트는 uikit의 Tailwind 프리셋 토큰을 따른다.
- `className` 조합이 복잡해지면 `clsx` / `cn` 유틸 사용.

## 폰트

- 프로젝트 공식 폰트는 uikit `fonts/` 에서 제공한다.
- 앱에서 직접 폰트 파일을 추가하지 않는다.

## 아이콘

- uikit `icons` 엔트리포인트 사용.
- 새 아이콘 필요 시 uikit에 추가 후 앱에서 import.

## 응답형 (Responsive)

- mobile-first 작성 원칙.

## 다크 모드

- Tailwind `dark:` 변형 사용. JS로 theme 분기하지 않는다.
