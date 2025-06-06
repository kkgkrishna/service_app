import { TbProgress } from "react-icons/tb";

function CustomLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <TbProgress className="text-6xl w-16 h-16 text-[#463cd3] animate-spin" />
    </div>
  );
}

export default CustomLoader;
