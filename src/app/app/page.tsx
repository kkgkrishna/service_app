// app/page.tsx

import Banner from "./components/banner";
import BottomNav from "./components/bottom_nav";
import CategoryGrid from "./components/categories";
import NearbyStore from "./components/nearby_store";

export default function AppPage() {
  return (
    <div className="pb-20">
      <Banner />
      <CategoryGrid />
      {/* <NearbyStore /> */}
    </div>
  );
}
