
import Footer from "./components/Footer";
import HeroSec from "./components/HeroSec";
import FilteredProducts from "./components/FilteredProducts";
import FooterSec from "./components/FooterSec";



export default async function Home() {
    return (<div>
     
    <div className="md:mx-24 mt-4"> <HeroSec/></div> 
    <div className="mb-10"><FilteredProducts
    tag="new ceramics" />
    </div>
    <div className="mb-10"><FilteredProducts
    tag="popular products" />
    </div>
    <FooterSec />
   <Footer/>
    </div>
  );
}
