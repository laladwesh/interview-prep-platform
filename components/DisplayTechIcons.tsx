import Image from "next/image";

import { cn, getTechLogos } from "@/lib/utils";

// DisplayTechIcons is an async component that renders icons for a tech stack
const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  // Fetch tech logos for the provided tech stack (returns array of { tech, url })
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex flex-row">
      {/* Render up to 3 tech icons */}
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            // Basic style: circular, padded, flex centered, dark background
            "relative group bg-dark-300 rounded-full p-2 flex flex-center",
            // If not the first icon, overlap slightly to the left for stacking effect
            index >= 1 && "-ml-3"
          )}
        >
          {/* Tooltip on hover with tech name */}
          <span className="tech-tooltip">{tech}</span>

          {/* Logo image */}
          <Image
            src={url}
            alt={tech}
            width={100}        // Actual display size controlled via className
            height={100}
            className="size-5" // Utility class for consistent icon size (e.g. Tailwind 'w-5 h-5')
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
