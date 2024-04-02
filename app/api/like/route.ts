import prisma from "@/utils/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = await prisma.like.findMany();
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function POST(req: Request) {
  const decoder = new TextDecoder();
  const body = decoder.decode(await req.arrayBuffer());
  const requestBody = JSON.parse(body);

  const { postId, userEmail } = requestBody;

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: postId as string,
        userEmail,
      },
    });

    console.log(existingLike);

    if (existingLike) {
      return NextResponse.json({ message: "You have already liked this post" });
    }

    const createLike = await prisma.like.create({
      data: {
        postId,
        userEmail,
      },
    });
    return NextResponse.json(createLike);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to create like for the post",
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const decoder = new TextDecoder();
    const body = decoder.decode(await req.arrayBuffer());
    const requestBody = JSON.parse(body);

    const { postId, userEmail } = requestBody;

    const response = await prisma.like.deleteMany({
      where: {
        postId,
        userEmail,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to delete" });
  }
}
