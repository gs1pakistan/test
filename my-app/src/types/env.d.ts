declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_SCRIPT_URL: string;
      NEXT_PUBLIC_GOOGLE_SCRIPT_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
      // Aur bhi environment variables add kar sakte hain
    }
  }
}

export {};