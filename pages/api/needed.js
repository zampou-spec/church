import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
  const prisma = new PrismaClient()

  try {
    if (req.method == 'GET') {
      const neededs = await prisma.needed.findMany()

      for (const needed of neededs) {
        const percent = (needed.reached / needed.goal) * 100
        needed.percent = percent > 100 ? 100 : percent
      }

      return res.status(200).json(neededs)
    }

    if (req.method == 'POST') {
      const { needed_id, amount } = req.body

      const { reached } = await prisma.needed.findFirst({ where: { id: needed_id }, select: { reached: true } })
      const updateNeeded = await prisma.needed.update(({ where: { id: needed_id }, data: { reached: parseFloat(reached) + parseFloat(amount) } }))

      return res.status(200).json(updateNeeded)
    }
  } catch (error) {
    res.status(500).json({ status: 'error', data: error?.message || error || 'Something went wrong' })
  }

  res.status(405).json({ message: 'Method not allowed' })
}