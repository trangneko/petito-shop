import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between py-8">
        <div className="w-40 h-40 relative">
          <Image src="/ava.png" alt="Petito thumbnail" fill priority={true}
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 200px, 200px"/>
        </div>
        <div className="">
          <h5>Follow Us</h5>
          <ul>
            <li>Facebook</li>
            <li>Instargram</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
