import Link from 'next/link';

interface ButtonEditProps {
  href: string;
  label: string;
}

const ButtonEdit = ({ href, label }: ButtonEditProps) => {
  return (
    <Link
      href={href}
      className="w-1/2 my-10 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition text-center"
    >
      {label}
    </Link>
  );
}

export default ButtonEdit;
