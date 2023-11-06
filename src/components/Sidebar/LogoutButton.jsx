import Logout from "../../assets/icons/Logout.svg";

export default function LogoutIcon({ open }) {
  return (
    <>
      {!open && (
        <div className="w-full   flex justify-center">
          <div className="mr-[25%] w-[55%] h-11 bg-white rounded-md hover:bg-gold cursor-pointer flex justify-center items-center">
            <img src={Logout} alt="Logout" />
          </div>
        </div>
      )}

      {open && (
        <div className="w-[100%] rounded-lg hover-bg-gold cursor-pointer flex justify-center items-center h-14 px-7 md:px-3 md:h-12">
          <div className="w-[20%] h-7 flex justify-start">
            <img src={Logout} alt="Logout" />
          </div>
          <div className="w-[90%] h-10 flex items-center justify-start">
            <p className="text-gray text-xm font-medium">Logout</p>
          </div>
        </div>
      )}
    </>
  );
}

