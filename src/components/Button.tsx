import { ElementType, ReactNode } from 'react';

interface ButtonProps {
  className: string;
  children: ReactNode;
  as: ElementType;
}

export default function Button<PropTypes = {}>({
  className,
  children,
  as: Element,
  ...props
}: ButtonProps & PropTypes) {
  return (
    <Element
      className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}
