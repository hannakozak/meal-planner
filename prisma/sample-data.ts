import { hashSync } from 'bcrypt-ts-edge'
import { randomUUID } from 'crypto'

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const sampleData = {
  users: [
    {
      id: randomUUID(),
      name: 'John',
      email: 'admin@example.com',
      password: hashSync('123456', 10),
      role: Role.ADMIN,
    },
    {
      id: randomUUID(),
      name: 'Jane',
      email: 'user@example.com',
      password: hashSync('123456', 10),
      role: Role.USER,
    },
  ],

  recipe: [
    {
      title: 'Pancakes',
      description: 'Fluffy homemade pancakes',
      ingredients: [
        { name: 'Flour', quantity: '200g' },
        { name: 'Milk', quantity: '300ml' },
        { name: 'Eggs', quantity: '2' },
      ],
      instructions: [
        'Mix flour, milk and eggs.',
        'Heat a pan.',
        'Pour batter and cook until golden.',
      ],
      cookingTime: 20,
    },
  ],
}
