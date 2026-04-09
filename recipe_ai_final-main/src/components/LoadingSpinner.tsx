export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-amber-100" />
        <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-amber-700 font-medium text-sm tracking-wide animate-pulse">
        Crafting your recipe...
      </p>
    </div>
  );
}
