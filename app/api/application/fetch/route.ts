import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/lib/connect";
import Application from '@/models/Application';
import Brand from '@/models/Brand';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    // Ensure database connection
    await connect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch applications with proper error handling
    try {
      // First ensure Brand model is registered
      if (!mongoose.models.Brand) {
        await Brand;
      }

      const applications = await Application.find({})
        .populate('brandId', 'name logo website industry')
        .sort({ createdAt: -1 }) // Sort by newest first
        .lean(); // Convert to plain JavaScript objects

      // Map through applications to ensure all required data is present
      const processedApplications = applications.map(app => ({
        ...app,
        brandId: app.brandId || { name: app.brandName }, // Fallback if brand not found
      }));

      return NextResponse.json({ 
        success: true, 
        applications: processedApplications,
        user: session.user 
      });
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      
      // Attempt to fetch applications without population if population fails
      try {
        const applications = await Application.find({})
          .sort({ createdAt: -1 })
          .lean();

        return NextResponse.json({ 
          success: true, 
          applications,
          user: session.user 
        });
      } catch (fallbackError: any) {
        return NextResponse.json({ 
          success: false, 
          message: 'Error fetching applications from database',
          error: fallbackError.message 
        }, { status: 500 });
      }
    }
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, status } = await req.json();
    const application = await Application.findOneAndUpdate(
      { _id: applicationId },
      { status },
      { new: true }
    );

    if (!application) {
      return NextResponse.json({ success: false, message: 'Application not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Error updating application.' }, { status: 500 });
  }
}