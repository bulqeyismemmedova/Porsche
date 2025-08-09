import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f10] text-white text-xs px-4 pt-16 pb-6 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-[#333] pb-10">
        <div>
          <h4 className="font-medium mb-3 text-[16px]">Current Region / Language</h4>
          <p className="flex items-center gap-2 text-[13px]">
            🇺🇸 United States / English{" "}
            <button className="underline hover:opacity-80">Change</button>
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-3 text-[16px]">Locations & Contacts</h4>
          <p className="text-gray-400 mb-3 text-[13px]">Do you have any questions?</p>
          <button className="bg-white text-black font-medium text-[13px] py-2 px-4 rounded hover:opacity-90">
            Get in touch
          </button>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-[16px]">Social Media</h4>
          <p className="text-gray-400 mb-3 text-[13px]">Get in touch with us via social media.</p>
          <div className="flex gap-2 flex-wrap">
            <Icon icon={<FaFacebookF />} />
            <Icon icon={<FaInstagram />} />
            <Icon icon={<FaPinterestP />} />
            <Icon icon={<FaYoutube />} />
            <Icon icon={<FaXTwitter />} />
            <Icon icon={<FaLinkedinIn />} />
          </div>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-8 text-gray-400 text-[11px]">
        <div>
          <h5 className="text-white font-medium mb-2 text-[16px]">Company & Support</h5>
          <ul className="space-y-2 texy-[13px]">
            <li>Porsche Cars North America</li>
            <li>Global Partnership Council</li>
            <li>Newsroom & Press</li>
          </ul>
        </div>
        <div>
          <ul className="space-y-2 mt-6 md:mt-8 text-[13px]">
            <li>Recall Information</li>
            <li>Compliance</li>
          </ul>
        </div>
        <div>
          <ul className="space-y-2 mt-6 md:mt-8 text-[13px]">
            <li>Career</li>
            <li>Sustainability</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto text-[11px] text-gray-400 leading-relaxed border-t border-[#333] pt-6">
        <p className="mb-3">
          © 2025 Porsche Cars North America, Inc.{" "}
          <span className="underline">Legal notice</span>,{" "}
          <span className="underline">Privacy notice</span>,{" "}
          <span className="underline">California Privacy</span>,{" "}
          <span className="underline">Accessibility Statement</span>,{" "}
          <span className="underline">NNLS #73164</span>,{" "}
          <span className="underline">Open Source Software Notice</span>,{" "}
          <span className="underline">Do Not Sell or Share My Personal Information</span>,{" "}
          <span className="underline">Whistleblower System</span>,{" "}
          <span className="underline">Emergency Responders</span>.
        </p>
        <p className="underline cursor-pointer mb-6">
          In-Use Verification Program, Certification of Compliance, How to Disconnect Remote Vehicle Access.
        </p>

        <div className="text-center mt-6 text-white font-semibold text-[18px] tracking-[0.25em]">
          PORSCHE
        </div>
      </div>
    </footer>
  );
};

const Icon = ({ icon }) => (
  <div className="w-8 h-8 flex items-center justify-center border border-white hover:bg-white hover:text-black transition rounded-sm cursor-pointer">
    {icon}
  </div>
);

export default Footer;
