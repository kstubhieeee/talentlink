import { NextResponse } from 'next/server';
import { connect } from "@/lib/connect"; // Ensure proper connection
import Application from '@/models/Application'; // Your Application model
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Ensure the connection to MongoDB
connect();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Parse the incoming request data
    const { 
      userId, 
      brandId, 
      brandName, 
      message,
      name,
      mobile,
      socialCount,
      socialLink,
      userImage,
      role,           // Added required field
      description,    // Added required field
      requirements,   // Added required field
      compensation    // Added required field
    } = await req.json();

    // Create a new application object with all required fields
    const newApplication = new Application({
      userId,
      brandId,
      brandName,
      message,
      name,
      mobile,
      socialCount,
      socialLink,
      userImage,
      role,           // Include required field
      description,    // Include required field
      requirements: Array.isArray(requirements) ? requirements : [], // Ensure it's an array
      compensation,   // Include required field
      status: 'pending',
      createdAt: new Date()
    });

    // Save the new application to the database
    await newApplication.save();

    return NextResponse.json(
      { 
        success: true, 
        application: newApplication 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating application:', error);
    
    // Provide more detailed error message for validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: validationErrors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creating application.',
        error: error.message 
      },
      { status: 500 }
    );
  }
}