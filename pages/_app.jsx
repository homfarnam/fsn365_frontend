import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import SiteNavigation from '../src/components/SiteNavigation';
import Container from '@material-ui/core/Container';

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
    const { route } = this.props.router;
    return (
      <React.Fragment>
        <Head>
          <title>FSN explorer</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <header>
            <Container><SiteNavigation route={route} /></Container>
          </header>
          <main>
            <Container><Component {...pageProps} /></Container>
          </main>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
