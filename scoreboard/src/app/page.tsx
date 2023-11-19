import Image from "next/image";
import Scoreboard from "./Components/scoreboard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const persons = await getScores();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <Scoreboard persons={persons} />
    </main>
  );
}

async function getScores() {
  const supabase = createServerComponentClient({ cookies });
  let { data: Persons, error } = await supabase
    .from("Persons")
    .select("*")
    .order("score", { ascending: false });
  console.log(Persons);
  return Persons;
}
