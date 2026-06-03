export function CheckoutForm(){
    return <form className="grid grid-cols-4 w-150" aria-label="Payment Details Form">
        <label htmlFor="Address">Address:</label>
        <input className="border border-black col-span-3 mb-3" name="Address" id="Address"  aria-label="Address Field" tabIndex={0}></input>
        <label htmlFor="First Name">First Name:</label>
        <input className="border border-black mr-5" name="First Name" id="First Name" aria-label="First Name Field" tabIndex={0}></input>
        <label htmlFor="Last Name">Last Name:</label>
        <input className="border border-black " name="Last Name" id="Last Name" aria-label="Last Name Field" tabIndex={0}></input>
        
        <button className="bg-green-500 rounded-2xl px-2 py-1 mt-2 " aria-label="Pay Button">Pay</button>


    </form>
}