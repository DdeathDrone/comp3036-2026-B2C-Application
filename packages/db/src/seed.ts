import { client } from "./client.js";
import { products, orders, users, orderItems } from "./data.js";

export async function seed() {
  
   console.log("🌱 Seeding data");
   await client.db.orderItem.deleteMany();
   await client.db.order.deleteMany();
   await client.db.user.deleteMany();
   await client.db.product.deleteMany();
   for (const p of products) {
     await client.db.product.create({
       data: {
         title: p.title,
         content: p.content,
         description: p.description,
         imageUrl: p.imageUrl,
         categories: p.categories
           .split(",")
           .map((p) => p.trim())
           .join(","),
         urlId: p.urlId,
         active: p.active,
         date: p.date,
         id: p.id,
         stock: p.stock,
         price: p.price,
       },
     });
     
     
   }
   for(const u of users){
      await client.db.user.create({
        data: {
          userId: u.userId,
          username: u.username,
          password: u.password,
          email: u.email,
          role: u.role, 
        }
      })
      
    }
    for (const o of orders) {
       await client.db.order.create({
         data: {
           orderId: o.orderId,
           userId: o.userId,
           orderDate: o.orderDate,
           totalCost: o.totalCost,
         },
       });
    }
    for (const oi of orderItems) {
      await client.db.orderItem.create({
        data: {
          orderId: oi.orderId,
          productId: oi.productId,
          ammount: oi.ammount,
        }
      })
    }
}
