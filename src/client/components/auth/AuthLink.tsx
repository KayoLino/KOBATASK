import Link from 'next/link';

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
}

const AuthLink = ({ text, linkText, href }: AuthLinkProps) => {
  return (
    <p className="text-center text-gray-600 text-sm mt-4">
      {text}{' '}
      <Link 
        href={href} 
        className="text-red-500 hover:text-red-600 font-semibold transition"
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AuthLink;