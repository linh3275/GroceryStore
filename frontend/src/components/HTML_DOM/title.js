import React from 'react'

export default function Title({title, margin}) {
  return (
    <h1 style={{ margin, color: 'var(--patone-green)'}}>{title}</h1>
  )
}
