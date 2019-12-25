import React, { PureComponent } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default class BlockPage extends PureComponent {
  render() {
    const {height} = this.props;
    const nextHeight = height + 1;
    const prevHeight = height -1 ;
    return (
      <>
        <Head>
          <title>block-{height} | FSN explorer</title>
        </Head>
        <div>
          <h4>Block Detail page</h4>
          <p>
            <Link href={`/block?height=${prevHeight}`} as={`/block/${prevHeight}`}>
              <a>Prev</a>
            </Link>
            <Link href={`/block?height=${nextHeight}`} as={`/block/${nextHeight}`}>
              <a>next</a>
            </Link>
          </p>
          {JSON.stringify(this.props)}
        </div>
      </>
    )
  }
}

BlockPage.getInitialProps = async ({query, res}) =>{
  const height = Math.abs(Number(query.height));
  if(isNaN(height)) {
    if(res) {
      res.writeHead(302, {
        Location: '/blocks'
      });
      res.end();
    } else {
      Router.push('/blocks')
    }
  } else {
    return {
      height,
      isServer:!!res
    }
  }
}