import { NextResponse } from "next/server";
import prisma from "@/utils/client";

//Rout to fetch the post who create the post
export async function POST(req: Request) {
  try {
    const decoder = new TextDecoder();
    const body = decoder.decode(await req.arrayBuffer());
    const requestBody = JSON.parse(body);

    const postId = requestBody.id;

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const postWithUser = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    if (!postWithUser) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(postWithUser.user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong while fetching the data" },
      { status: 500 }
    );
  }
}
