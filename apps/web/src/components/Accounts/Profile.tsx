"use client"

import { User } from "@repo/db/data"
import { PurchaseHistory } from "./PurchaseHistory"

export function Profile({user} : {user: User}){

    return (<div className="pt-10">
    <div className="text-2xl">
        {user.username}
    </div>
    <div>
        <PurchaseHistory products={user.history}></PurchaseHistory>
    </div>
    </div>
    )
}