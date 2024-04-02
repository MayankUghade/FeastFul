import { NextResponse } from "next/server";
import prisma from "@/utils/client";

export async function GET() {
  try {
    const response = await prisma.post.findMany();
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong while fetching the data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const decoder = new TextDecoder();
    const body = decoder.decode(await req.arrayBuffer());
    const requestBody = JSON.parse(body);

    const { name, description, location, price, userEmail, image, date, time } =
      requestBody;

    const response = await prisma.post.create({
      data: {
        name,
        description,
        location,
        price,
        date,
        time,
        userEmail,
        image,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong while creating a post" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const decoder = new TextDecoder();
    const body = decoder.decode(await req.arrayBuffer());
    const requestBody = JSON.parse(body);

    const { postId } = requestBody;

    const deleteLikes = await prisma.like.deleteMany({
      where: {
        postId: postId,
      },
    });

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return NextResponse.json("Successfully deteted the post.");
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong while deleting");
  }
}

export async function PUT(req: Request) {
  try {
    const decoder = new TextDecoder();
    const body = decoder.decode(await req.arrayBuffer());
    const requestBody = JSON.parse(body);

    const {
      id,
      name,
      description,
      location,
      price,
      userEmail,
      image,
      date,
      time,
    } = requestBody;

    const response = await prisma.post.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        location,
        price,
        date,
        time,
        userEmail,
        image,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong while updating");
  }
}
