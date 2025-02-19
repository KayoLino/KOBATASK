import Link from 'next/link';

const ButtonEdit = ({ href, label }) => {
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