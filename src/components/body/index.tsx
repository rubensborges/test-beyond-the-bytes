import { ReactNode } from "react";
import Header from "../header";

type Props = {
  children: ReactNode;
};

const Body = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div
        className="p-6 bg-white max-w-[500px] sm:h-[auto] sm:mt-[100px] mt-[80px] overflow-y-auto m-auto  sm:rounded-xl"
        style={{ boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2) " }}
      >
        {children}
      </div>
    </>
  );
};

export default Body;
