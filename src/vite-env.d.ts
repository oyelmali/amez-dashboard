// src/vite-env.d.ts

/// <reference types="vite/client" />

// Bu kısmı ekliyoruz:
declare namespace JSX {
  interface IntrinsicElements {
    'w3m-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}