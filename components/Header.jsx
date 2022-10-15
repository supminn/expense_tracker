import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LogoutModal } from "./Modals/Logout";
import { ComingSoonModal } from "./Modals/ComingSoon";

export const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  return (
    <nav className="z-10 flex justify-between items-center h-16 sticky top-0 mb-1 p-4 pl-3 bg-green-900 rounded-b-lg">
      <div className="flex justify-center items-center cursor-pointer ">
        <div className="bg-green-900 mt-1">
          <Image src="/logo.png" alt="Logo" height={50} width={75} />
        </div>
        <h2 className="font-cursive text-2xl px-2 text-green-100">
          Welcome User!
        </h2>
      </div>
      <div className="flex justify-around">
        {/* <Link href={"#"}>
          <a className="fas fa-search fa-lg px-2 text-green-100"></a>
        </Link> */}
        <Link href={"#"}>
          <a
            onClick={() => setShowComingSoonModal(true)}
            className="fas fa-solid fa-chart-line fa-lg px-2 text-green-100 relative"
          ></a>
        </Link>
        <Link href={"#"}>
          <a
            onClick={() => setShowLogoutModal(true)}
            className="fas fa-user fa-lg px-2 text-green-100"
          ></a>
        </Link>
        {showLogoutModal && <LogoutModal setShowModal={setShowLogoutModal} />}
        {showComingSoonModal && (
          <ComingSoonModal setShowModal={setShowComingSoonModal} />
        )}
      </div>
    </nav>
  );
};
