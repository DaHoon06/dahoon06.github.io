# 프로젝트 구조 (FSD + Next)

```text
/ (Root)
├── /apps
│   ├── /instiz
│   │   ├── /app                                        # Next.js App Router
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                                # app 폴더와 충돌 방지 placeholder
│   │   │   └── {domain}/
│   │   │       └── page.tsx
│   │   ├── /pages
│   │   │   └── .gitkeep
│   │   ├── /public
│   │   ├── /src
│   │   │   ├── /app                                    # FSD app: providers, styles, 초기화
│   │   │   ├── /entities                               # FSD entities
│   │   │   │   └── {entity}/
│   │   │   │       └── api/
│   │   │   │           ├── {entity}.query.ts           # query keys + queryOptions
│   │   │   │           ├── get-{entity}.ts
│   │   │   │           ├── create-{entity}.ts
│   │   │   │           ├── update-{entity}.ts
│   │   │   │           ├── delete-{entity}.ts
│   │   │   │           └── use-{method}-{entity}.ts    # custom hook (필요 시)
│   │   │   ├── /features                               # FSD features
│   │   │   ├── /pages                                  # FSD pages
│   │   │   ├── /shared                                 # FSD shared
│   │   │   └── /widgets                                # FSD widgets
│   │   └── middleware.ts                               # 루트 레벨 필수
│   ├── /instiz-admin
│   │   └── # instiz 프로젝트 구조와 완전히 동일
│   ├── /ichart
│   │   └── # instiz 프로젝트 구조와 완전히 동일
│   └── /ichart-admin
│       └── # instiz 프로젝트 구조와 완전히 동일
└── /packages # 패키지는 FSD 구조 생략
```

- Next 라우팅은 프로젝트 루트 `app/`, 도메인 코드는 `src/` 아래 FSD 레이어에 둔다.
- 상위 규칙: [layer-rules.md](./layer-rules.md)
