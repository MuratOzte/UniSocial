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
  console.log("denme");
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

    const entityType = decoded.entityType;
    const followerId = decoded.id;

    if (followerId === followingId) {
      return NextResponse.json(
        { message: "You cannot follow yourself.", status: 400 },
        { status: 400 }
      );
    }

    let user;
    user = await prisma.user.findUnique({ where: { id: followingId } });
    if (!user) {
      user = await prisma.community.findUnique({
        where: { id: followingId },
      });
    }

    const existingFollower = await prisma.follower.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    if (existingFollower) {
      return NextResponse.json(
        {
          message: "You are already following this entity.",
          status: 400,
        },
        { status: 400 }
      );
    }

    const newFollower = await prisma.follower.create({
      data: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json({
      message: "Successfully followed the entity.",
      follower: newFollower,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred during the follow process.",
        error: error.message,
        status: 500,
      },
      { status: 500 }
    );
  }
}
