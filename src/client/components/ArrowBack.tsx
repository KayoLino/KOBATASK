import Link from "next/link";

interface ArrowBackProps {
  href: string;
}

const ArrowBack = ({ href }: ArrowBackProps) => {

  return (
    <Link href={href}>
      <div className="absolute top-4 left-4 cursor-pointer p-2 text-red-500 text-3xl font-bold hover:text-red-700 transition">&lt;</div>
    </Link>
  )
}

export default ArrowBack;