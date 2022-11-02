import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Gabriel Guilherme",
      email: "gabriel_guilherme2006@hotmail.com",
      avatarUrl: "https://github.com/gabrielgrs1.png"
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  const game = await prisma.game.create({
    data: {
      date: '2022-11-02T18:00:00.214Z',
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR"
    }
  })

  const game2 = await prisma.game.create({
    data: {
      date: '2022-11-02T19:00:00.214Z',
      firstTeamCountryCode: "EN",
      secondTeamCountryCode: "PT",
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()
