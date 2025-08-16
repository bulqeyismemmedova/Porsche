import { useRef } from "react";
import { CiPlay1 } from "react-icons/ci";


export default function SoundCar() {
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="w-full max-w-5xl  mx-auto rounded-xl overflow-hidden shadow-lg mt-24">
      <div
        className="relative sound_bg w-full h-[300px] md:h-[450px]  flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-0 top-[-400px]" />
        <div className="absolute top-[60px] z-10 text-center text-white px-4">
          <h2 className="text-xl md:text-4xl font-semibold mb-5">
            It doesn't just sound good. It also feels good.
          </h2>
          <p className="text-sm md:text-base mb-3 md:mb-6">
            Experience the unique mid-engine sound of the 718 Cayman GTS 4.0.
          </p>
          <div className="flex items-center justify-center  md:mt-[200px]">
            <button
              className="bg-white text-black md:px-4 md:py-3 px-2 py-2 rounded flex items-center gap-2 hover:bg-gray-100 text-sm"
              onMouseDown={playSound}
              onMouseUp={stopSound}
              onMouseLeave={stopSound}
              onTouchStart={playSound}
              onTouchEnd={stopSound}
              type="button"
            >
              <span><CiPlay1 /></span> Hold for sound
            </button>
          </div>
          <audio
            ref={audioRef}
            src="https://ia902807.us.archive.org/12/items/car-engines/18%20Porsche%20911%20GT3.mp3"
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}