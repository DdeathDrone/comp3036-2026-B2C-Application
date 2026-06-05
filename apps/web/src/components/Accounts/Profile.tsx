"use client"

import { User } from "@repo/db/data"
import { PurchaseHistory } from "./PurchaseHistory"

export function Profile({user} : {user: User}){

    return (<div className="pt-10">
    <div className="text-2xl pb-5">
        {user.username}
    </div>
    <div>
        <PurchaseHistory order={user.Order ? user.Order : [] }></PurchaseHistory>
    </div>
    </div>
    )
}