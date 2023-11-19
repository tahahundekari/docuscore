"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Row from "./row";
import { useEffect, useState } from "react";

export default async function Scoreboard(props: any) {
  const supabase = createClientComponentClient();
  const [persons, setPersons] = useState<any>(props.persons);

  return (
    <div>
      <div className="flex w-[512px] border-b p-[4px]">
        <div className="flex text text-black text-xl w-[128px] justify-center">
          rank
        </div>
        <div className="flex text text-black text-xl w-[384px] justify-center">
          name
        </div>
        <div className="justify-center text text-black text-xl w-[128px]">
          upvotes
        </div>
      </div>
      <div />
      <div>
        {" "}
        {persons.map((person: any, index: number) => (
          <Row
            key={index}
            rank={index + 1}
            name={person.name}
            upvotes={person.score}
          />
        ))}
      </div>
    </div>
  );
}
