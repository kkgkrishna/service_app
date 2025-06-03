// components/NearbyStore.tsx
const stores = [
  {
    name: "Rocket Maids LA",
    rating: 4.0,
    image: "/cleaning.jpg",
    distance: "0Km",
  },
  {
    name: "John's Cleaners",
    rating: 4.5,
    image: "/cleaning.jpg",
    distance: "0Km",
  },
];

export default function NearbyStore() {
  return (
    <div className="px-4 mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Nearby Store</h2>
        <span className="text-blue-500 text-sm cursor-pointer">See All</span>
      </div>
      <div className="space-y-4">
        {stores.map((store) => (
          <div
            key={store.name}
            className="flex items-center space-x-4 border p-3 rounded-xl"
          >
            <img
              src={store.image}
              alt={store.name}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h3 className="text-md font-semibold">{store.name}</h3>
              <p className="text-sm">
                ⭐ {store.rating} · {store.distance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
