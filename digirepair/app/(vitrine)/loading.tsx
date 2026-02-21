export default function VitrineLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <div className="h-10 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="flex gap-4 pt-4">
                <div className="h-10 bg-muted rounded w-32" />
                <div className="h-10 bg-muted rounded w-32" />
              </div>
            </div>
            <div className="aspect-square md:aspect-[4/3] bg-muted rounded-lg" />
          </div>
        </div>
      </div>

      {/* Services skeleton */}
      <div className="py-12 md:py-16 bg-dr-alt">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
