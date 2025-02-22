import Link from 'next/link';

interface ButtonLinkProps {
  href: string;
  label: string;
  className: string;
}

const ButtonLink = ({ href, label, className }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={className}
    >
      {label}
    </Link>
  );
}

export default ButtonLink;
