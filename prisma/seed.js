const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const neededs = [
  {
    name: 'Sable',
    image: 'sable.jpg',
    goal: 100000,
    reached: 2000
  },
  {
    name: 'Gravier',
    image: 'gravier.jpg',
    goal: 102000,
    reached: 7000
  },
  {
    name: 'Botte de fer',
    image: 'rond-a-fer.jpg',
    goal: 150000,
    reached: 5000
  },
  {
    name: 'Ciment',
    image: 'ciment.jpg',
    goal: 107000,
    reached: 34000
  },
]

const seeder = async () => {
  for (const needed of neededs) { 
    await prisma.needed.create({
      data: needed
    })
  }
}

seeder()