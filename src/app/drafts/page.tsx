"use client";

import LinkGenerator from "@/hooks/link-generation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Draft() {
  const searchParams = useSearchParams()
  const blueTeam = searchParams.get('blueTeam');
  const redTeam = searchParams.get('redTeam');
  const baseLink = LinkGenerator();
  const views = [
    { name: "Blue Team", param: "blueTeam" },
    { name: "Red Team", param: "redTeam" },
    { name: "Spectator", param: "spectator" }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-6">
      <h1>LINKS</h1>
      <div className="flex flex-col gap-6">
        {views.map((view, index) => (
          <div key={index}>
            <h2>{view.name}: {view.param === "blueTeam" ? blueTeam : view.param === "redTeam" ? redTeam : ""}</h2>
            <Link href={`${baseLink}/champions?typeView=${view.param}`}>
              {`${baseLink}/champions`}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
