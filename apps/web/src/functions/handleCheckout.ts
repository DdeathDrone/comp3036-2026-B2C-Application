export async function handleCheckout(state: {success:boolean; error?: string; userId: number, totalCost: number}, formData : FormData) : Promise<{success: boolean; error?: string, userId: number, totalCost: number, res?: Promise<any>}> {
    const address = formData.get("Address") as string;
    const fName = formData.get("FirstName") as string;
    const lName = formData.get("LastName") as string;
    const cardNo = formData.get("Card") as string;

    if(address.length == 0) return {success: false, error: "Address is required", userId: state.userId, totalCost: state.totalCost};
    if(fName.length == 0) return {success: false, error: "First Name is required", userId: state.userId, totalCost: state.totalCost};
    if(lName.length == 0) return {success: false, error: "Last Name is required", userId: state.userId, totalCost: state.totalCost};
    if(cardNo.length == 0) return {success: false, error: "Card Number is required", userId: state.userId, totalCost: state.totalCost};
    //if(!cardNo.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/)) 
        //return {success: false, error: "Card Number is invalid", userId: state.userId, totalCost: state.totalCost};
    if(isNaN(parseInt(cardNo)) || cardNo.replace(" ", "").length != 16) return {success: false, error: "Card Number is invalid", userId: state.userId, totalCost: state.totalCost};

    


    const res = fetch ("/api/cart", {
        method: "POST",
        body: JSON.stringify({userId: state.userId, totalCost: state.totalCost, address: address, fName: fName, lName: lName})
    })





    return {success: true, userId: state.userId, totalCost: state.totalCost, res: res};
}