import { FC, PropsWithChildren } from "react";

interface ILinkProps {
  href: string
  className?: string
}

/* TODO: Интегрировать react-router */
const Link: FC<PropsWithChildren<ILinkProps>> = (props) => {
  return (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  );
};

export default Link;
