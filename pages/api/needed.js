import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {

  if (req.method == 'GET') {
    const neededs = await prisma.needed.findMany({ orderBy: [{ created_at: 'DESC' }] })

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

  return res.status(405).json({ message: 'Method not allowed' })
}