export async function getOrders(){
    const res = await fetch(`http://localhost:3002/api/history`, {method: "GET", credentials: `same-origin`})
    const parsed = await res.json();
    return parsed;
}