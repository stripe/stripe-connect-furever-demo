import Salon from '@/app/models/salon';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {getServerSession} from 'next-auth';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    console.log('POST /api/company_logo - Start');
    const session = await getServerSession(authOptions);
    console.log('Session:', JSON.stringify(session));

    if (!session?.user?.email) {
      console.log('Unauthorized: No session or email');
      return new Response('Unauthorized', {status: 401});
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    console.log(
      'File received:',
      file ? `name=${file.name}, size=${file.size}, type=${file.type}` : 'null'
    );
    const connectedAccountId = session.user.stripeAccountId;

    if (!file) {
      console.log('No file uploaded');
      return new Response('No file uploaded', {status: 400});
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log('File size exceeded:', file.size);
      return new Response('File size must be less than 5MB', {status: 400});
    }

    // Validate file type (only images)
    if (file.type !== 'image/png') {
      console.log('Invalid file type:', file.type);
      return new Response('Only PNG image files are allowed', {status: 400});
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log('Buffer created, size:', arrayBuffer.byteLength);

    const stripeResponse = await stripe.files.create(
      {
        purpose: 'dispute_evidence',
        file: {
          data: buffer,
          name: file.name,
          type: 'image/png',
        },
      },
      {
        stripeAccount: connectedAccountId,
      }
    );

    console.log('Stripe file created:', stripeResponse.id);

    console.log('Creating Stripe file link...');
    const fileLink = await stripe.fileLinks.create({
      file: stripeResponse.id,
    });
    console.log('Stripe file link created:', fileLink.url);

    const fileUrl = fileLink.url;

    console.log('Updating salon in DB for email:', session.user.email);
    const updatedSalon = await Salon.findOneAndUpdate(
      {email: session.user.email},
      {companyLogoUrl: fileUrl},
      {new: true}
    );
    console.log(
      'Updated salon:',
      updatedSalon ? JSON.stringify(updatedSalon) : 'null'
    );

    if (!updatedSalon) {
      console.log('Salon not found for email:', session.user.email);
      return new Response('Salon not found', {status: 404});
    }

    console.log('POST /api/company_logo - Success');
    return new Response(
      JSON.stringify({success: true, companyLogoUrl: fileUrl}),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }
    );
  } catch (error: any) {
    console.error('An error occurred when uploading company logo:', error);
    return new Response(error.message, {status: 500});
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new Response('Unauthorized', {status: 401});
    }

    const updatedSalon = await Salon.findOneAndUpdate(
      {email: session.user.email},
      {companyLogoUrl: null},
      {new: true}
    );

    if (!updatedSalon) {
      return new Response('Salon not found', {status: 404});
    }

    return new Response(JSON.stringify({success: true}), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error('An error occurred when deleting company logo:', error);
    return new Response(error.message, {status: 500});
  }
}
