"use client";
import TimeLine from "@/components/TimeLine";
import { useState } from "react";
import Image from "next/image";

interface Experience {
  year: number;
  subject: string;
  things: string[];
}

interface Author {
  name: string;
  occupation: string;
  photo: string;
  traits: string[];
  technologyStacks: string[];
  experiences: Experience[];
  hobbies: string[];
}

const author: Author = {
  name: "Ling Jin",
  occupation: "Web Developer",
  photo: "/author.png",
  traits: [
    "Fueled by curiosity,",
    "excel at designing and building big-picture frameworks,",
    "while keeping details in perspective.",
  ],
  technologyStacks: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB + Mongoose",
  ],
  experiences: [
    {
      year: 2025,
      subject:"Self-directed Learning",
      things: [
        "Poster Design - Learned visual communication and layout composition skills.",
        "Blog System (Django) - Developed a full-featured blog platform with user authentication, content management, and database integration.",
        "Website Development (Next.js) - Built a responsive, SEO-optimized website using Next.js.",
      ],
    },
    {
      year: 2024,
      subject:"Self-discovery Gap Year",
      things: [
        "Found her own rhythm of life.",
      ],
    },
    {
      year: 2023,
      subject:"Employed as Test Engineer",
      things: [
        "Executed comprehensive multilingual SDK testing.",
        "Designed and implemented automated web testing task.",
        "Led the testing of mission-critical business features.",
      ],
    },
    {
      year: 2022,
      subject:"Employed as Product Manager",
      things: [
        "Led the development of a new SDK.",
        "Oversaw the full product lifecycle from concept to release.",
        "Strengthened cross-functional collaboration skills.",
        "Deepened expertise in user-centric product design."
      ],
    },
  ],
  hobbies: [
    "Reading",
    "Watching detective series",
    "Playing badminton",
    "Eating chocolate",
    "Riding bikes",
  ],
};

const timeNodes: number[] = author.experiences
  .map((e) => e.year)
  .sort((a, b) => b - a);

export default function AboutPage() {
  const [year, setYear] = useState(timeNodes[0]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-bold font-serif text-blue-500">
            {author.name}
          </h1>
          <h5 className="mt-6 text-xl font-serif text-blue-500">
            {author.occupation}
          </h5>
        </div>
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={author.photo}
            alt="Cropped Image"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center 45%",
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold font-serif mt-6 mb-3">
          Personal traits
        </h2>
        <ul className="list-disc list-inside space-y-1 text-slate-700">
          {author.traits.map((trait: string, i: number) => (
            <li key={i} className="mb-3">
              {trait}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-xl font-semibold font-serif mt-6 mb-3">
        Technology stack
      </h2>
      <ul className="list-disc list-inside space-y-1 text-slate-700">
        {author.technologyStacks.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold font-serif mt-6 mb-3">Experience</h2>
      <div className="flex justify-between items-start">
        <TimeLine timeNodes={timeNodes} onNodeClick={setYear} />
        <div className="border-4 border-yellow-300 rounded-lg flex-1 ml-15 p-5">
          <div className="font-serif text-xl text-yellow-600 mb-2">
            {author.experiences.find((e)=>e.year===year)?.subject}
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            {author.experiences
              .find((e) => e.year === year)
              ?.things.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
          </ul>
        </div>
      </div>

      <h2 className="text-xl font-semibold font-serif mt-6 mb-3">Hobby</h2>
      <ul className="list-disc list-inside space-y-1 text-slate-700">
        {author.hobbies.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
}
