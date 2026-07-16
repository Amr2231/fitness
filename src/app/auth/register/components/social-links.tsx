import { SiApple, SiFacebook, SiGoogle } from "react-icons/si";

export default function SocialLinks() {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <div className="w-30 h-px bg-gray-400"></div>
        <span>Or</span>
        <div className="w-30 h-px bg-gray-400"></div>
      </div>
      <div className="flex items-center justify-center gap-6 my-2">
        {/* Facebook */}
        <div className="bg-[#242424] rounded-full p-3 flex items-center justify-center cursor-pointer hover:bg-[#1d1d1d] transition-colors">
          <SiFacebook className="h-5 w-5 text-white" />
        </div>
        {/* Google */}
        <div className="bg-[#242424] rounded-full p-3 flex items-center justify-center cursor-pointer hover:bg-[#1d1d1d] transition-colors">
          <SiGoogle className="h-5 w-5 text-white" />
        </div>
        {/* Apple */}
        <div className="bg-[#242424] rounded-full p-3 flex items-center justify-center cursor-pointer hover:bg-[#1d1d1d] transition-colors">
          <SiApple className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}
