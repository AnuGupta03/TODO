import { connect } from "@/dbConfig/dbConfig"
import User from '@/models/users.models'

import { getDataFromToken } from "@/helpers/getDataFromToken"
import {NextRequest, NextResponse} from 'next/server'

connect()

export async function POST(request: NextRequest){
    // extract data from token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")
    // Check if there is no user
    return NextResponse.json({
        message: "User Found",
        data: user
    })
}