import Link from "next/link";

export function TopBar(){
    return (
        <div className="flex place-content-center bg-blue-300 border-b-2 p-2">
            <div className="block">
                <h1 className="text-2xl ">Admin of B2C Application</h1>
                <div className="flex place-content-center">
                    <div className="block w-40">
                        <div className="float-left border p-1 bg-blue-100 hover:bg-blue-300 rounded-lg">
                            <Link href="/">Products</Link>
                            
                        </div>
                        <div className="float-right border bg-blue-100 hover:bg-blue-300 p-1 rounded-lg">
                            <Link href="/orders">Orders</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}