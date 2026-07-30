import { LoadingImage } from "@/components/ui/LoadingImage"; 
export default function SamplePage() {
  return (
    <main className="min-h-screen bg-background p-10 flex flex-col items-center justify-center">
      <h1 className="text-white text-2xl font-bold mb-6">Welcome to MapMate</h1>

      <div className="w-full max-w-xl h-96 relative rounded-3xl overflow-hidden shadow-2xl">
        <LoadingImage
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop"
          alt="Sri Lanka Cultural Pageant"
          fill 
          className="object-cover" 
          wrapperClassName="w-full h-full" 
        />
      </div>
    </main>
  );
}