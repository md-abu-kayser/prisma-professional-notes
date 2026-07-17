type PaginationArgs = {
  page?: number
  pageSize?: number
}

export function getPagination({ page = 1, pageSize = 20 }: PaginationArgs) {
  const skip = (Math.max(page, 1) - 1) * pageSize
  const take = pageSize
  return { skip, take }
}

export function buildPageMeta(total: number, { page = 1, pageSize = 20 }: PaginationArgs) {
  return {
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}
