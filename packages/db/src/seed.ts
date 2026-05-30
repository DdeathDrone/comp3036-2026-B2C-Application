import { client } from "./client.js";
import { products, history, users } from "./data.js";

export async function seed() {
  
   console.log("🌱 Seeding data");
   await client.db.history.deleteMany();
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
    for (const h of history) {
       await client.db.history.create({
         data: {
           productId: h.productId,
           userId: h.userId,
           orderDate: h.orderDate,
         },
       });
     }
}
