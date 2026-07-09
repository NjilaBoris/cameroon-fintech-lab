import { cn } from "@/lib/utils"
import { Marquee } from "./ui/marquee"
import logo1 from "@/public/logo1.svg";
import logo2 from "@/public/logo2.svg";
import logo3 from "@/public/logo3.svg";
import logo4 from "@/public/logo4.svg";
import Image from "next/image";


const reviews = [
  { name: "Logo 1", img: logo1 },
  { name: "Logo 2", img: logo2 },
  { name: "Logo 3", img: logo3 },
  { name: "Logo 4", img: logo4 },
]

// const firstRow = reviews.slice(0, reviews.length / 2)
// const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
}: {
  img: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-34 cursor-pointer overflow-hidden rounded-xl",
        // // light styles
        // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // // dark styles
        // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width={90} height={90} alt="" src={img} />
      </div>
    </figure>
  )
}

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {reviews.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee> */}
      <div className="from-[#F9F9F9] pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-[#F9F9F9] pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
