import prisma from "@/utils/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const decoder = new TextDecoder();
    const body = decoder.decode(await req.arrayBuffer());
    const requestBody = JSON.parse(body);

    const { postId, userEmail } = requestBody;

    const response = await prisma.joinrequest.create({
      data: {
        postId,
        userEmail,
        status: "pending",
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong while creating a JoinRequest" },
      { status: 500 }
    );
  }
}
