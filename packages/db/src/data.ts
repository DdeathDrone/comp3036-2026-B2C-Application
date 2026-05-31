export type Product = {
  id: number;
  urlId: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  date: Date;
  categories: string;
  stock: number;
  price: number;
  active: boolean;
};


const content = `
  # Title 1

  Illo **sint voluptas**. Error voluptates culpa eligendi. 
  Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
  Sed exercitationem placeat consectetur nulla deserunt vel 
  iusto corrupti dicta laboris incididunt.

  ## Subtitle 1

  Illo sint *voluptas*. Error voluptates culpa eligendi. 
  Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
  Sed exercitationem placeat consectetur nulla deserunt vel 
  iusto corrupti dicta laboris incididunt.
`;

const description = `Illo sint voluptas. Error voluptates culpa eligendi. 
Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
Sed exercitationem placeat consectetur nulla deserunt vel 
iusto corrupti dicta laboris incididunt.`;

export const products: Product[] = [
  {
    id: 1,
    title: "Electric Toothbrush",
    urlId: "electric-toothbrush",
    description,
    content: content + " ... post1",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80",
    date: new Date("Apr 18, 2022"),
    categories: "Electronics, Health",
    stock: 200,
    price: 99.99,
    active: true,
  },
  {
    id: 2,
    title: "Basketball",
    urlId: "basketball",
    description: `Illo sint voluptas. Error voluptates culpa eligendi. 
       Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
       Sed exercitationem placeat consectetur nulla deserunt vel 
       iusto corrupti dicta laboris incididunt.`,
    content: content + " ... post2",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661342428515-5ca8cee4385a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: new Date("Mar 16, 2020"),
    categories: "Sport",
    stock: 50,
    price: 20,
    active: true,
  },
  {
    id: 3,
    title: "Nintendo Switch 2",
    urlId: "nintendo-switch-2",
    description: `Illo sint voluptas. Error voluptates culpa eligendi. 
       Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
       Sed exercitationem placeat consectetur nulla deserunt vel 
       iusto corrupti dicta laboris incididunt.`,
    content: content + " ... post3",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661517706036-a48d5fc8f2f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: new Date("Dec 16, 2024"),
    categories: "Electronics, Video Games",
    stock: 300,
    price: 750,
    active: true,
  },
  {
    id: 4,
    title: "Clown Costume",
    urlId: "clown-costume",
    description: `Illo sint voluptas. Error voluptates culpa eligendi. 
       Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
       Sed exercitationem placeat consectetur nulla deserunt vel 
       iusto corrupti dicta laboris incididunt.`,
    content: content + " ... post4",
    imageUrl: "https://m.media-amazon.com/images/I/51NqEfmmBTL.jpg",
    date: new Date("Dec 16, 2012"),
    categories: "Clothing, Hair and Beauty",
    stock: 0,
    price: 60,
    active: false,
  },
];


export type User = {
  username: string;
  userId: number;
  password: string;
  email: string;
  role: string;
  Order: Order[];
}

export type Order = {
  orderId: number;
  userId: number;
  orderDate: Date;
  totalCost: number;
  //OrderItem?: OrderItem[];
}

export type OrderItem = {
  productId: number;
  orderId: number;
  ammount: number;
}

export const orders: Order[] = [
  {
  orderId:1,
  userId:1,
  orderDate: new Date("May 16, 2026"),
  totalCost: 849.00
  },
  {
  orderId:2,
  userId:1,
  orderDate: new Date("May 30, 2026"),
  totalCost: 40
  }
]

export const orderItems: OrderItem[] = [
  {
    orderId: 1,
    productId: 1,
    ammount: 1,
  },
  {
    orderId: 1,
    productId: 3,
    ammount: 1,
  },
  {
    orderId: 2,
    productId: 2,
    ammount: 2,
  }
]
export const users : User[] = [{
  userId: 1,
  username: "user",
  password: "123",
  email: "user@email.com",
  role: "user",
  Order: orders,
}]
