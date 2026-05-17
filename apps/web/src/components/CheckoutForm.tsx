export function CheckoutForm(){
    return <form className="grid grid-cols-4 w-100">
        <label htmlFor="Address">Address:</label>
        <input className="border border-black col-span-3" name="Address" id="Address"></input>
        <label htmlFor="First Name">First Name:</label>
        <input className="border border-black" name="First Name" id="First Name"></input>
        <label htmlFor="Last Name">Last Name:</label>
        <input className="border border-black" name="Last Name" id="Last Name"></input>
        
        <button className="bg-green-500 rounded-2xl px-2 py-1">Pay</button>


    </form>
}