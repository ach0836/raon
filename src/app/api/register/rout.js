import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

const xata = getXataClient();

export async function POST(req) {
    try {
        const { password } = await req.json();

        // 비밀번호 해싱
        const hashedPassword = await hash(password, 10);

        // Xata 데이터베이스에 비밀번호 저장
        const data = await xata.db.users.create({
            password: hashedPassword,
        });

        return NextResponse.json({ success: true, userId: data.id });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
}
