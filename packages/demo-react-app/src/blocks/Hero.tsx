import { useParallax } from "react-scroll-parallax";

export interface Props {
  title: string;
}

function Hero(props: Props) {
  const title = useParallax<HTMLDivElement>({ speed: -20 });
  return (
    <div className="w-screen h-screen bg-zinc-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div>
        <h1
          ref={title.ref}
          className="text-7xl text-orange-400 font-bold font-heading animate-fadein pointer-events-none"
        >
          {props.title.split("").map((char, i) => (
            <span
              key={`${props.title}-${char}-${i}`}
              className="inline-block px-4 animate-flip"
              style={{ animationDuration: `${i * 200 + 1500}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default Hero;
