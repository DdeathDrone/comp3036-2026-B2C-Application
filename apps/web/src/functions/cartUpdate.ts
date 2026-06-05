export async function cartUpdate(id:number, ammount:number){
    const res = await fetch(`/api/cart`, {
        method: "PATCH",
        body: JSON.stringify({id: id, ammount: ammount}),
    })
    window.location.reload();
    return res;
}