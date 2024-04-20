import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between py-8 px-8 max-w-7xl al m-auto">
        <div className="w-40 h-40 relative">
          <Image src="/ava.png" alt="Petito thumbnail" fill priority={true}
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 200px, 200px"/>
        </div>
        <div className="">
          <h5 className="text-right font-bold">Follow Us</h5>
          <ul className="flex gap-3 my-4">
            <li><Facebook size={48} color="#001299" /></li>
            <li><Instagram size={48} color="#ff004c" /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
