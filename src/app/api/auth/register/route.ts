import { NextRequest, NextResponse } from "next/server";
import { register } from "@/lib/controllers/auth.controller";

export async function POST(request: NextRequest) {

    const data = await request.json()
    
    if (!data) {
        return NextResponse.json(
            { error: "No data provided" }, 
            { status: 400 }
        )
    }

    const result = await register(data)

    // Success response
    if (result.status === 201) {
        return NextResponse.json(
            { message: result.message },
            { status: result.status }
        )
    }

    // Error response
    return NextResponse.json(
        { message: result.message },
        { status: result.status }
    )
}