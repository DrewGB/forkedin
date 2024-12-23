import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";


export async function POST(req: NextRequest, res: NextResponse) {
    const cookieStore = await cookies();
    console.log(cookieStore.getAll());
    cookieStore.delete('token');

    return NextResponse.json({ message: 'Logged out' });
}