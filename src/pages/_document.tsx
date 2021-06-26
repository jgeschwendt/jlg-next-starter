import type { DocumentContext, DocumentInitialProps } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  public static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  // eslint-disable-next-line class-methods-use-this -- react api
  public render(): JSX.Element {
    return (
      <Html>
        <Head />

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
