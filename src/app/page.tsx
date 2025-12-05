import FlightSearch from '@/components/FlightSearch';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      <div className="relative z-10 w-full">
        <FlightSearch />
      </div>
    </main>
  );
}
