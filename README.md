## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Prisma Notes

```bash
npx create-next-app@latest
# use app router...

npm i -D prisma
# initialize prisma
npx prisma init --datasource-provider sqlite

```

Create `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Todo {
  id        String   @id @default(uuid())
  title     String
  complete  Boolean
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Migrate it to our database, in dev environment.

```bash
npx prisma migrate dev --name init
```

Use our database in our project. Inside `src/db.ts`:

NextJs workaround with Prisma, using a singleton. (Only 1 client ever,
regardless of Next's hot module reloading).

```ts
import {PrismaClient} from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```
