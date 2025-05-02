import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Herader";
import SqlChallanges from "@/components/SqlChallanges";
import Challenges from "@/data/Challenges";

export default async function Home() {
  return (
    <div>
      <Header />
      <SqlChallanges Challenge={Challenges} />
      <Footer />
    </div>
  );
}
