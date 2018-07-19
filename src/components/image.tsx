import * as React from 'react'

export interface ImageProps {
  src: any
}

export const Image: React.SFC<ImageProps> = ({ src }) => (
  <div style={{ padding: '5rem' }}>
    <img src={src} />
  </div>
)