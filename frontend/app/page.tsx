import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center w-full max-w-md bg-white dark:bg-black rounded-xl shadow-lg py-16 px-8">

        <h1 className="text-3xl font-bold mb-10 text-center text-foreground">
          Main Menu
        </h1>

        <nav className="flex flex-col gap-6 w-full max-w-xs">
          <Link href="/stats" className="w-full">
            <Button className="w-full">Stats Page</Button>
          </Link>
          <Link href="/image-display" className="w-full">
            <Button className="w-full">E-Paper Image Upload</Button>
          </Link>
        </nav>

      </main>
    </div>
  );
}
