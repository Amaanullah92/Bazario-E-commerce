declare module 'next' {
    export interface PageProps {
      params: Promise<Record<string, string | string[]>>; // Mark `params` as a Promise
      searchParams: URLSearchParams;
    }
  
    export type Metadata = {
      title?: string | TemplateString;
      description?: string;
      // Add other metadata properties as needed
    };
  }
  
  declare module 'next/app' {
    import { NextComponentType, NextPageContext } from 'next';
    
    export interface AppProps<P = Record<string, unknown>> {
      Component: NextComponentType<NextPageContext, unknown, P>;
      pageProps: P;
    }
  }
  