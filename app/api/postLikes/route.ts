import prisma from "@/utils/client";
import { NextResponse } from "next/server";

//Function to fetch total likes per post
export async function POST(req: Request) {
  try {
    const decoder = new TextDecoder();
    const body = decoder.decode(await req.arrayBuffer());
    const requestBody = JSON.parse(body);

    const { postId } = requestBody;

    const post = await prisma.post.findUnique({
      where: {
        id: postId as string,
      },
      include: {
        likes: {},
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" });
    }

    return NextResponse.json(post.likes, { status: 200 });
  } catch (error) {
    console.error("Error fetching post details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//Route to fetch the post liked by the current user
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const userEmail = searchParams.get("userEmail");

    const likedPosts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userEmail: userEmail as string,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(likedPosts);
  } catch (error) {
    console.error("Error while fetching liked posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
