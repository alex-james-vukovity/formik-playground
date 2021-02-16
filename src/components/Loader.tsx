import { FC, memo } from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

export const Loader: FC<IContentLoaderProps> = memo(() => (
  <ContentLoader
    width="100%"
    height="100%"
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
    role="spinbutton"
  >
    <rect y="50" rx="6" ry="6" width="100%" height="12" />
    <rect y="100" rx="6" ry="6" width="50%" height="12" />
    <rect y="200" rx="6" ry="6" width="100%" height="12" />
    <rect y="250" rx="6" ry="6" width="50%" height="12" />
    <rect y="350" rx="6" ry="6" width="100%" height="12" />
    <rect y="400" rx="6" ry="6" width="50%" height="12" />
    <rect y="500" rx="6" ry="6" width="100%" height="12" />
    <rect y="550" rx="6" ry="6" width="50%" height="12" />
  </ContentLoader>
))
