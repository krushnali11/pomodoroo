import PomodoroTimer from "./components/PomodoroTimer";

export default function App() {
  const totoroImages = ["/totoro1.png", "/totoro2.png", "/totoro3.png"];

  const renderTotoroStickers = () => {
    return totoroImages.map((img, index) => (
      <img key={index} src={img} alt="Totoro" className="totoro" />
    ));
  };
   return (
    
    <div className="h-screen flex items-center justify-center">
      <PomodoroTimer />
    </div>
  );
}


