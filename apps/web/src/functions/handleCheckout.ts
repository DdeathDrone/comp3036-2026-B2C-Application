export async function handleCheckout(state: {success:boolean; error?: string; userId: number, totalCost: number}, formData : FormData) : Promise<{success: boolean; error?: string, userId: number, totalCost: number, res?: Promise<any>}> {
    const address = formData.get("Address") as string;
    const fName = formData.get("FirstName") as string;
    const lName = formData.get("LastName") as string;

    if(address.length == 0) return {success: false, error: "Address is required", userId: state.userId, totalCost: state.totalCost};
    if(fName.length == 0) return {success: false, error: "First Name is required", userId: state.userId, totalCost: state.totalCost};
    if(lName.length == 0) return {success: false, error: "Last Name is required", userId: state.userId, totalCost: state.totalCost};

    const res = fetch ("http://localhost:3001/api/cart", {
        method: "POST",
        body: JSON.stringify({userId: state.userId, totalCost: state.totalCost, address: address, fName: fName, lName: lName})
    })





    return {success: true, userId: state.userId, totalCost: state.totalCost, res: res};
}