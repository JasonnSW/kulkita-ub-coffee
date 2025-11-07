import { getProfileData } from "@/features/auth/actions/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getProfileData();
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
