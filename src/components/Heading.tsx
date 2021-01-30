import { FC, memo, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  variant: 'h1' | 'h2' | 'h3'
}

export const Heading: FC<Props> = memo(({ children, variant, ...props }) => {
  switch (variant) {
    case 'h1':
      return <h1 {...props}>{children}</h1>
    case 'h2':
      return <h2 {...props}>{children}</h2>
    case 'h3':
      return <h3 {...props}>{children}</h3>
  }
})
