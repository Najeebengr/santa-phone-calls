import { NextResponse } from 'next/server';

// Define interfaces for the incoming data structure
interface IncomingChild {
  id: string;
  name?: string;
  age?: number;
  gender?: string;
  childName?: string;
  childAge?: number;
  childGender?: string;
  connections?: string;
  details?: string;
  hobbies?: string;
}

interface WebhookRequestData {
  id: string;
  children: IncomingChild[];
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  packageName: string;
  totalAmount: number;
  paymentStatus: string;
  paymentId: string;
  selected_time: string;
  selectedTimezone: string;
  planId: number;
  hasRecording: boolean;
  callNow: boolean;
  when?: number;
  recipientName?: string;
  recipientPhone?: string;
}

interface FormattedChild {
  id: string;
  childName: string;
  childAge: number;
  childGender: string;
  connections: string;
  details: string;
  hobbies: string;
}

function calculateHoursFromNow(date: Date): number {
  const diffInMilliseconds = date.getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diffInMilliseconds / (1000 * 60 * 60)));
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as WebhookRequestData;
    
    console.log('Debug - Raw incoming data:', data);

    // Validate required fields
    if (!data.children || !Array.isArray(data.children) || data.children.length === 0) {
      console.error('No children data received');
      return NextResponse.json(
        { success: false, error: 'Children data is required' },
        { status: 400 }
      );
    }

    // Format children data according to schema
    const formattedChildren: FormattedChild[] = data.children.map((child: IncomingChild) => ({
      id: child.id,
      childName: child.childName || child.name || '',
      childAge: child.childAge || child.age || 0,
      childGender: child.childGender || child.gender || '',
      connections: child.connections || '',
      details: child.details || '',
      hobbies: child.hobbies || '',
    }));

    console.log('Debug - Formatted children:', formattedChildren);

    // Format the datetime
    let formattedDateTime = data.selected_time;
    if (data.selected_time && !data.callNow && !formattedDateTime.includes('M')) {
      try {
        const date = new Date(formattedDateTime);
        formattedDateTime = date.toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: data.selectedTimezone
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        formattedDateTime = 'Invalid Date';
      }
    }

    // Keep the exact schema structure
    const webhookData = {
      id: data.id,
      children: formattedChildren,
      numberChildern: formattedChildren.length,
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      packageName: data.packageName,
      totalAmount: data.totalAmount,
      paymentStatus: data.paymentStatus,
      paymentId: data.paymentId,
      selected_time: formattedDateTime,
      selectedTimezone: data.selectedTimezone,
      planId: data.planId,
      hasRecording: data.hasRecording,
      callNow: data.callNow,
      when: data.callNow ? 0 : (data.when || calculateHoursFromNow(new Date(data.selected_time))),
      recipientName: data.recipientName,
      recipientPhone: data.recipientPhone,
    };

    console.log('Debug - Final webhook data:', webhookData);

    // Validate children data before sending
    const invalidChildren = formattedChildren.filter(child => 
      !child.childName || !child.childAge || !child.childGender
    );

    if (invalidChildren.length > 0) {
      console.error('Invalid children data:', invalidChildren);
      return NextResponse.json(
        { success: false, error: 'Missing required child information' },
        { status: 400 }
      );
    }

    // Send the webhook
    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('GHL webhook URL not configured');
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookData)
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`Failed to send webhook to GHL: ${responseText}`);
    }

    const responseData = await response.json();
    console.log('GHL Response:', responseData);

    return NextResponse.json({
      success: true,
      message: 'Webhook sent successfully',
      data: webhookData
    });

  } catch (error) {
    console.error('Error in webhookGHL:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send webhook'
      },
      { status: 500 }
    );
  }
}