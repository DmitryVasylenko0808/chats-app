import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const generateUsers = async () => {
  const users = [
    {
      username: 'pmuckloe0',
      password: '11111111',
      email: 'pmuckloe0@adobe.com',
      name: 'Philippine Muckloe',
      avatar: '4.jpg',
    },
    {
      username: 'shighway1',
      password: '22222222',
      email: 'shighway1@people.com.cn',
      name: 'Suzette Highway',
      avatar: '5.jpg',
    },
    {
      username: 'lbroek2',
      email: 'lbroek2@hibu.com',
      password: '33333333',
      name: 'Lilli Broek',
      avatar: 'placeholder.jpg',
    },
  ];
  const data = users.map((u) => ({ ...u, password: bcrypt.hashSync(u.password, 10) }));

  await prisma.user.createMany({ data });
};

const generateChats = async () => {
  await prisma.chat.create({
    data: {
      members: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });
  await prisma.chat.create({
    data: {
      members: {
        connect: [{ id: 1 }, { id: 3 }],
      },
    },
  });
};

const generateMessages = async () => {
  const firstChatMessages = Array.from({ length: 20 }).map(() => {
    const message = {
      senderId: faker.helpers.arrayElement([1, 2]) as number,
      chatId: 1,
      text: faker.lorem.sentences({ min: 1, max: 4 }),
      createdAt: faker.date.between({
        from: '2024-01-01T00:00:00.000Z',
        to: '2025-07-07T00:00:00.000Z',
      }),
    };

    return message;
  });

  const secondChatMessages = Array.from({ length: 5 }).map(() => {
    const message = {
      senderId: faker.helpers.arrayElement([1, 3]) as number,
      chatId: 2,
      text: faker.lorem.sentences({ min: 1, max: 7 }),
      createdAt: faker.date.between({
        from: '2024-01-01T00:00:00.000Z',
        to: '2025-07-07T00:00:00.000Z',
      }),
    };

    return message;
  });

  await prisma.message.createMany({
    data: [...firstChatMessages, ...secondChatMessages],
  });
};

const truncateTables = async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE users, chats, messages RESTART IDENTITY CASCADE`);
};

const main = async () => {
  await truncateTables();

  await generateUsers();
  await generateChats();
  await generateMessages();
};

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
