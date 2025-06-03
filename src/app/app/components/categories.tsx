// components/CategoryGrid.tsx
const categories = [
  { name: "Deep Cleaning", icon: "🧹" },
  { name: "Germ Shield", icon: "🛡️" },
  { name: "Carpet Cleaning", icon: "🧼" },
  { name: "Medical Service", icon: "👩‍⚕️" },
  { name: "Car Service", icon: "🚗" },
];

export default function CategoryGrid() {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Categories</h2>
        <span className="text-blue-500 text-sm cursor-pointer">See All</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.name} className="rounded-xl border p-4 text-center">
            <div className="text-2xl mb-2">{cat.icon}</div>
            <p className="text-sm font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
