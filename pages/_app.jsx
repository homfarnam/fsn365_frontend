import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Link from 'next/link';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>FSN explorer</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Link href="/"><a>Home</a></Link> {' '}
          <Link href="/txs"><a>Txs</a></Link> {' '}
          <Link href="/blocks"><a>blocks</a></Link> {' '}
          <Link href="/staking"><a>staking</a></Link> { ''}
          <Link href="/address"><a>addresses</a></Link>
          <Link href="/assets"><a>assets</a></Link>
          <Component {...pageProps} />
        </ThemeProvider>
        <style jsx global>{`
          body {
            font-size: .8125rem;
            font-weight: 400;
            line-height: 1.5;
            color: #1e2022;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
