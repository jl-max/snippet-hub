"use client";
import TimeLine from "@/components/TimeLine";
import { useState } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [year, setYear] = useState(2025);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex justify-between">
        <h1 className="text-4xl font-mono font-bold text-blue-500">Ling Jin</h1>
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
            src="/author.png"
            alt="Cropped Image"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center 45%",
            }}
          />
        </div>
      </div>

      <div className="font-serif mt-6">
        <p className="mb-3">
          Constructs cognitive scaffolding before filling in the details.
        </p>
        <p className="mb-3">
          Has passion for 'connecting disciplines into a unified whole'.
        </p>
        <p className="mb-3">Driven by systematicity.</p>
      </div>

      <h2 className="text-xl font-mono font-semibold mt-6 mb-3">Technology stack</h2>
      <ul className="font-serif list-disc list-inside space-y-1 text-slate-700">
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>MongoDB + Mongoose</li>
      </ul>

      <h2 className="text-xl font-mono font-semibold mt-6 mb-3">Experience</h2>
      <div className="flex justify-between items-start">
        <TimeLine startYear={2022} onYearClick={setYear} />
        <div className="font-serif border-4 border-yellow-300 rounded-lg flex-1 ml-15 p-5">
          {year === 2025 && (
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Spent a five-month sojourn in HuiZhou, GuangDong.</li>
              <li>
                Built a systematic lifestyle centered first on writing,
                and then on digital painting.
              </li>
              <li>
                Learned poster design with Photoshop and Adobe Illustrator.
              </li>
              <li>Learned how to play badminton.</li>
              <li>Built a blog system with Django.</li>
              <li>Built a website with Next.js.</li>
            </ul>
          )}
          {year === 2024 && (
            <div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Spent a month sojourn in YiLi, XinJiang.</li>
                <li>Traveled around and wrote essays.</li>
                <li>Found her own rhythm of life.</li>
              </ul>
            </div>
          )}
          {year === 2023 && (
            <div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Worked as a test engineer.</li>
                <li>Performed multilingual SDK testing.</li>
                <li>Developed automated web testing.</li>
                <li>Tested key business features.</li>
                <li>Developed small tools for testing.</li>
              </ul>
            </div>
          )}
          {year === 2022 && (
            <div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Worked as a product manager.</li>
                <li>Drove new sdk development & process standardization.</li>
                <li>Learned lessons about collaboration and product design.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <h2 className="font-mono text-xl font-semibold mt-6 mb-3">Hobby</h2>
      <ul className="font-serif list-disc list-inside space-y-1 text-slate-700">
        <li>Reading</li>
        <li>Watching detective series</li>
        <li>Playing badminton</li>
        <li>Eating chocolate</li>
        <li>Riding bikes</li>
      </ul>
    </div>
  );
}
