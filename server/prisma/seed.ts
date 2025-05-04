import { Prisma, PrismaClient } from '@prisma/client';
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
  const firstChatMessages = [
    {
      senderId: 1,
      chatId: 1,
      text: 'Nulla nisl. Nunc nisl.',
      createdAt: '2025-03-14T14:34:01Z',
    },
    {
      senderId: 1,
      chatId: 1,
      text: 'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.',
      createdAt: '2025-04-09T22:35:40Z',
    },
    {
      senderId: 1,
      chatId: 1,
      text: 'Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.',
      createdAt: '2025-04-14T07:34:18Z',
    },
    {
      senderId: 1,
      chatId: 1,
      text: 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla.',
      createdAt: '2025-03-23T11:14:57Z',
    },
    {
      senderId: 1,
      chatId: 1,
      text: 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',
      createdAt: '2025-03-30T05:36:01Z',
    },
    {
      senderId: 1,
      chatId: 1,
      text: 'Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.',
      createdAt: '2025-04-21T10:22:23Z',
    },
    {
      senderId: 1,
      chatId: 1,
      text: 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
      createdAt: '2025-04-10T02:11:48Z',
    },
    {
      senderId: 1,
      chatId: 1,
      text: 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
      createdAt: '2025-04-19T02:22:09Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.',
      createdAt: '2025-03-17T02:36:41Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Donec ut mauris eget massa tempor convallis.',
      createdAt: '2025-03-28T19:55:18Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      createdAt: '2025-03-11T09:09:11Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.',
      createdAt: '2025-04-01T07:04:18Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Pellentesque at nulla.',
      createdAt: '2025-04-05T19:33:32Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Morbi a ipsum. Integer a nibh. In quis justo.',
      createdAt: '2025-03-22T02:51:20Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
      createdAt: '2025-04-04T11:06:48Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
      createdAt: '2025-04-07T08:22:30Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Nam dui.',
      createdAt: '2025-03-24T18:13:17Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
      createdAt: '2025-03-08T13:34:08Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.',
      createdAt: '2025-03-13T03:14:50Z',
    },
    {
      senderId: 2,
      chatId: 1,
      text: 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
      createdAt: '2025-04-19T11:14:41Z',
    },
  ];

  const secondChatMessages = [
    {
      senderId: 1,
      chatId: 2,
      text: 'Fusce consequat. Nulla nisl.',
      createdAt: '2025-03-07T10:02:13Z',
    },
    {
      senderId: 1,
      chatId: 2,
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      createdAt: '2025-04-18T23:15:53Z',
    },
    {
      senderId: 1,
      chatId: 2,
      text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.',
      createdAt: '2025-03-31T17:01:21Z',
    },
    {
      senderId: 3,
      chatId: 2,
      text: 'Integer non velit.',
      createdAt: '2025-03-09T21:37:33Z',
    },
    {
      senderId: 3,
      chatId: 2,
      text: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.',
      createdAt: '2025-04-04T05:41:08Z',
    },
  ];

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
