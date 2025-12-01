
import Image from 'next/image';
import image1 from '../../public/image1.png';
import image2 from '../../public/image2.png';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Image 
          src={image2} 
          alt="Left Image" 
          width={100} 
          height={50}
          className="header-image"
          priority
        />
      </div>
      <div className="header-right">
        <Image 
          src={image1} 
          alt="Right Image" 
          width={100} 
          height={50}
          className="header-image"
          priority
        />
      </div>
    </header>
  );
}