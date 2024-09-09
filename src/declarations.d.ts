declare module 'jwt-decode';
declare module '*.module.scss' {
    const content: { [className: string]: string };
    export default content;
  }
  export {};

declare global {
  interface Window {
    Pusher: any; // You can also specify the Pusher type here if needed
  }
}

  // declaration.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

  declare module '*.svg' {
    const content: string;
    export default content;
  }
  declare module '*.webp' {
    const content: string;
    export default content;
  }
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.png' {
    const content: string;
    export default content;
  }
  

    
