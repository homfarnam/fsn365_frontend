import React from "react";
import App from "next/app";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import SiteFooter from "../src/components/SiteFooter";
import SiteNavigation from "../src/components/SiteNavigation";

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
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
          <title>FSN365 Fusion Blockchain Explorer</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}> 
            <header style={{background: '#fff', boxShadow:'0 0.5rem 1.2rem rgba(189,197,209,.2)'}}>
              <Container>
                <SiteNavigation route={route} />
              </Container>
            </header>
            <main style={{flexGrow: 2}}>
              <Container>
                <Component {...pageProps} />
              </Container>
            </main>
            <footer style={{alignSelf: 'flex-end', width: '100%',background: 'rgba(52,152,219,.1)', marginTop: '2rem'}}>
              <SiteFooter />
            </footer>
          </div>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
