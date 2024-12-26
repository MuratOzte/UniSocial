import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization token is required.", status: 401 },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired token.", status: 401 },
        { status: 401 }
      );
    }

    const { followingId } = await req.json();
    const followerId = decoded.id;

    if (followerId === followingId) {
      return NextResponse.json(
        { message: "You cannot follow yourself.", status: 400 },
        { status: 400 }
      );
    }

    const followingEntity = await prisma.user.findUnique({ where: { id: followingId } }) || 
                            await prisma.community.findUnique({ where: { id: followingId } });

    if (!followingEntity) {
      return NextResponse.json(
        { message: "The entity you are trying to follow does not exist.", status: 404 },
        { status: 404 }
      );
    }

    const existingFollower = await prisma.follower.findFirst({
      where: { followerId, followingId },
    });

    if (existingFollower) {
      await prisma.follower.delete({ where: { id: existingFollower.id } });
      return NextResponse.json(
        { message: "Successfully unfollowed the entity.", status: 200 },
        { status: 200 }
      );
    }

    const newFollower = await prisma.follower.create({
      data: { followerId, followingId },
    });

    return NextResponse.json({
      message: "Successfully followed the entity.",
      follower: newFollower,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred during the toggle follow process.",
        error: error.message,
        status: 500,
      },
      { status: 500 }
    );
  }
}
