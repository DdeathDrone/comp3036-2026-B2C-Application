"use client"

import { User } from "@repo/db/data"
import { PurchaseHistory } from "./PurchaseHistory"

export function Profile({user} : {user: User}){

    return (<div className="pt-10">
    <div className="text-2xl pb-5">
        {user.username + "'s Profile"}
        <div className="text-xl border rounded-lg px-5 py-2 mt-5">
            Details:
            <div className="text-base mt-2">
                Email: {user.email}
                
            </div>
            <div className="text-base">
                Username: {user.username}
            </div>
        </div>
    </div>
    <div>
        <PurchaseHistory order={user.Order ? user.Order : [] }></PurchaseHistory>
    </div>
    </div>
    )
}