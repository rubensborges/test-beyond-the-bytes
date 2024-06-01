const Header = () => {
  return (
    <>
      <header className="fixed border-y flex justify-center top-0 left-0 bg-[#ffffff] border-[#cacaca] p-4 w-full">
        <div className="flex gap-2 items-center">
          <img
            className="text-xs"
            src="src/assets/lightning-svgrepo-com.svg"
            alt=""
          />
          <div className="text-sm sm:text-3xl text-[#2F2F39] uppercase font-bold">
            Lightning Speed Delivery
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
