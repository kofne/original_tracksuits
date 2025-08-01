import { NextRequest, NextResponse } from 'next/server';
import { getAllReferrals } from '@/lib/firestore';

export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication (basic check)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const referrals = await getAllReferrals();
    
    return NextResponse.json({ 
      success: true, 
      referrals 
    });
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch referrals' },
      { status: 500 }
    );
  }
} 