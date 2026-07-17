import { Prisma } from '@prisma/client'
import { prisma } from './prisma-client-singleton'

// Example Prisma Client Extension implementing soft deletes.
// Assumes each model has a `deletedAt DateTime?` field.
export const prismaWithSoftDelete = prisma.$extends({
  name: 'soft-delete',
  query: {
    $allModels: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null }
        return query(args)
      },
      async delete({ args, query }) {
        // Redirect delete -> update(deletedAt: now())
        return (query as any)({
          where: args.where,
          data: { deletedAt: new Date() },
        })
      },
    },
  },
})
