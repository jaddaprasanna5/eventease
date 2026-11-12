const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // first create demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@eventease.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@eventease.com",
    }
  });

  console.log("Demo user:", user.id);

  // create 5 events
  await prisma.event.createMany({
    data: [
      {
        title: "Tech Conference 2026",
        description: "Join top tech leaders and learn about AI, Web3 and future tech.",
        category: "Technology",
        location: "Hyderabad, Hitech City",
        eventDate: new Date("2026-12-15"),
        price: 499,
        availableSeats: 100,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
      },
      {
        title: "Music Night",
        description: "Live music concert with best bands in town.",
        category: "Music",
        location: "Banjara Hills, Hyderabad",
        eventDate: new Date("2026-12-20"),
        price: 799,
        availableSeats: 50,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
      },
      {
        title: "Startup Meetup",
        description: "Meet investors and founders, pitch your ideas.",
        category: "Business",
        location: "Gachibowli, Hyderabad",
        eventDate: new Date("2026-11-25"),
        price: 299,
        availableSeats: 80,
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b"
      },
      {
        title: "Photography Workshop",
        description: "Learn professional photography from experts.",
        category: "Workshop",
        location: "Jubilee Hills",
        eventDate: new Date("2026-12-05"),
        price: 599,
        availableSeats: 30,
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d"
      },
      {
        title: "Comedy Night",
        description: "Laugh out loud with top comedians.",
        category: "Entertainment",
        location: "Chanda Nagar, Hyderabad",
        eventDate: new Date("2026-12-10"),
        price: 399,
        availableSeats: 60,
        image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260"
      }
    ]
  });

  console.log("Events seeded");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());