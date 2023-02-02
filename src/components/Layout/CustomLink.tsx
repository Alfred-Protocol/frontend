import NextLink, { LinkProps } from 'next/link';
import { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

interface CustomLinkProps {
  nextLinkProps?: LinkProps;
  anchorProps?: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
  href: string;
  text: string;
}

const CustomLink = ({
  nextLinkProps,
  anchorProps,
  text,
  href,
}: CustomLinkProps) => {
  return (
    <NextLink href={href} passHref {...nextLinkProps}>
      <a {...anchorProps}>{text}</a>
    </NextLink>
  );
};

export default CustomLink;
