import { EmailIcon } from "../_icons/EmailIcon";
import { MovieIconWhite } from "../_icons/MovieIconWhite";
import { PhoneIcon } from "../_icons/PhoneIcon";
export const Footer = () => {
  return (
    <div className=" w-full h-[280px] py-10 px-20 mt-[51px] gap-12 bg-[#4338CA] flex flex-row relative">
      <div>
        <div className=" flex flex-row gap-2 my-auto">
          <MovieIconWhite />
          <p className="text-[16px] font-bold text-white">Movie Z</p>
        </div>
        <div className="text-white text-sm font-normal">
          © 2024 Movie Z. All Rights Reserved.
        </div>
      </div>
      <div className="flex flex-row gap-24 absolute right-20">
        <div className=" flex flex-col items-start gap-3">
          <p className="text-white text-sm font-normal ">Contact Information</p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-3">
              <EmailIcon />
              <div className="flex flex-col">
                <p className="text-white text-sm font-medium">Email:</p>
                <p className="text-white text-sm font-normal">
                  support@movieZ.com
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <PhoneIcon />
              <div className="flex flex-col">
                <p className="text-white text-sm font-medium">Phone:</p>
                <p className="text-white text-sm font-normal">
                  +976 (11) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-start gap-3">
          <p className="text-white text-sm font-normal ">Follow us</p>
          <div className="flex flex-row gap-3">
            <p className="text-white text-sm font-medium">Facebook </p>
            <p className="text-white text-sm font-medium">Instagram </p>
            <p className="text-white text-sm font-medium">Twitter </p>
            <p className="text-white text-sm font-medium">Youtube </p>
          </div>
        </div>
      </div>
    </div>
  );
};
