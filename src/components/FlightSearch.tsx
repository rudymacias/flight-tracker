'use client';

import { useState } from 'react';
import { Flight } from '@/types';

export default function FlightSearch() {
    const [query, setQuery] = useState('');
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setHasSearched(true);
        try {
            const res = await fetch('/flight-tracker/api/flights');
            if (!res.ok) throw new Error('Failed to fetch flights');
            const data: Flight[] = await res.json();

            const filtered = data.filter(flight =>
                flight.flightNumber.toLowerCase().includes(query.toLowerCase())
            );

            setFlights(filtered);
        } catch (error) {
            console.error(error);
            setFlights([]);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timeString: string, timezone: string) => {
        return new Date(timeString).toLocaleString('en-US', {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
        });
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-[80vh] w-full transition-all duration-500 ${hasSearched ? 'pt-10 justify-start' : 'justify-center'}`}>

            {/* Logo / Title Area */}
            <div className={`text-center space-y-4 mb-8 transition-all duration-500 ${hasSearched ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white">
                    Flight<span className="text-blue-500">Track</span>
                </h1>
            </div>

            <div className="w-full max-w-xl px-4 z-10 transition-all duration-500">
                <form onSubmit={handleSearch} className="max-w-md mx-auto w-full">
                    <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-slate-900 dark:text-white sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                        </div>
                        <input
                            type="search"
                            id="search"
                            className="block w-full p-3 ps-9 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm placeholder:text-slate-400 focus:outline-none"
                            placeholder="Enter Flight Number (e.g. AA123)"
                            required
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute end-1.5 bottom-1.5 text-white bg-blue-600 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? '...' : 'Search'}
                        </button>
                    </div>
                </form>
            </div>

            <div className={`w-full max-w-3xl px-4 mt-12 transition-all duration-500 ${hasSearched ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {hasSearched && flights.length === 0 && !loading && (
                    <div className="text-center p-8">
                        <p className="text-xl text-slate-500 dark:text-slate-400">No flights found matching &quot;{query}&quot;</p>
                    </div>
                )}

                {flights.map((flight) => (
                    <div
                        key={flight.flightNumber}
                        className="bg-[rgb(var(--card-bg))] dark:bg-slate-800 rounded-3xl p-8 shadow-2xl mb-6 animate-fadeIn transition-colors duration-300 border border-slate-100 dark:border-slate-700"
                    >
                        <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-xl">
                                    {flight.flightNumber.slice(0, 2)}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{flight.flightNumber}</h2>
                                    <span className="text-green-600 dark:text-green-400 font-medium px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded text-sm">On Time</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Duration</p>
                                <p className="font-mono text-lg text-slate-700 dark:text-slate-200">
                                    {Math.floor(
                                        (new Date(flight.arrivalTime).getTime() -
                                            new Date(flight.departureTime).getTime()) /
                                        (1000 * 60 * 60)
                                    )}h{' '}
                                    {Math.floor(
                                        ((new Date(flight.arrivalTime).getTime() -
                                            new Date(flight.departureTime).getTime()) %
                                            (1000 * 60 * 60)) /
                                        (1000 * 60)
                                    )}m
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            {/* Origin */}
                            <div>
                                <p className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                                    {flight.origin.split('(')[1]?.replace(')', '') || 'ORG'}
                                </p>
                                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-1">{flight.origin.split('(')[0]}</p>
                                <div className="text-blue-600 dark:text-blue-400 font-semibold text-xl">
                                    {formatTime(flight.departureTime, flight.originTimezone)}
                                </div>
                                <p className="text-sm text-slate-400 mt-1">{flight.originTimezone}</p>
                            </div>

                            {/* Connector */}
                            <div className="hidden md:flex flex-col items-center justify-center">
                                <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-700 relative">
                                    <div className="absolute top-1/2 left-0 w-3 h-3 bg-slate-400 dark:bg-slate-600 rounded-full -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 right-0 w-3 h-3 bg-slate-400 dark:bg-slate-600 rounded-full -translate-y-1/2"></div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgb(var(--card-bg))] dark:bg-slate-800 p-2 text-slate-300 dark:text-slate-600">
                                        ✈
                                    </div>
                                </div>
                            </div>

                            {/* Destination */}
                            <div className="text-right">
                                <p className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                                    {flight.destination.split('(')[1]?.replace(')', '') || 'DES'}
                                </p>
                                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-1">{flight.destination.split('(')[0]}</p>
                                <div className="text-blue-600 dark:text-blue-400 font-semibold text-xl">
                                    {formatTime(flight.arrivalTime, flight.destinationTimezone)}
                                </div>
                                <p className="text-sm text-slate-400 mt-1">{flight.destinationTimezone}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
