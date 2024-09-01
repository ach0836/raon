import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";

const xata = getXataClient();

export async function POST(req) {
    try {
        const { password } = await req.json();

        // 데이터베이스에서 저장된 비밀번호 가져오기
        const user = await xata.db.users.getFirst(); // 단일 사용자만 있을 경우

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // 입력된 비밀번호와 해시된 비밀번호 비교
        const isValid = await compare(password, user.password);

        if (isValid) {
            // 로그인 성공 시
            return NextResponse.json({ success: true, message: "Login successful" });
        } else {
            // 로그인 실패 시
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Failed to login" }, { status: 500 });
    }
}
