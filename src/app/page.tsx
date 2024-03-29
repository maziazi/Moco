import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <Link className={buttonVariants()} href='../admin'>Bukan Admin Saya</Link>
    </div>
  );
}
