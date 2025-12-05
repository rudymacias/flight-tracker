import { NextResponse } from 'next/server';
import { Flight } from '@/types';

// Mock data
const FLIGHTS: Flight[] = [
    {
        flightNumber: 'AA123',
        origin: 'New York (JFK)',
        destination: 'London (LHR)',
        departureTime: '2025-12-05T18:00:00',
        arrivalTime: '2025-12-06T06:00:00',
        originTimezone: 'America/New_York',
        destinationTimezone: 'Europe/London',
    },
    {
        flightNumber: 'BA456',
        origin: 'London (LHR)',
        destination: 'New York (JFK)',
        departureTime: '2025-12-06T10:00:00',
        arrivalTime: '2025-12-06T13:00:00',
        originTimezone: 'Europe/London',
        destinationTimezone: 'America/New_York',
    },
    {
        flightNumber: 'UA789',
        origin: 'San Francisco (SFO)',
        destination: 'Tokyo (NRT)',
        departureTime: '2025-12-05T11:00:00',
        arrivalTime: '2025-12-06T15:00:00',
        originTimezone: 'America/Los_Angeles',
        destinationTimezone: 'Asia/Tokyo',
    },
];

export const dynamic = 'force-static';

export async function GET() {
    return NextResponse.json(FLIGHTS);
}
