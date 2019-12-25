import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class BlockRedirectToBlocks  extends Component {
  render () {
    const {  height } = this.props;

    return (
      <>
        <Head>
          <title>block-{height} | FSN explorer</title>
        </Head>
        <div>
          <h4>Block List page</h4>
            {
              (height !== undefined) ? 
              <p>
                <Link href={`/block?height=${height-1}`} as={`/block/${height-1}`}>Prev</Link>
                <Link href={`/block?height=${height+1}`} as={`/block/${height+1}`}>Next</Link>
              </p>
                :null
            }
            {JSON.stringify(this.props)}
        </div>
      </>
    )
  }
}

BlockRedirectToBlocks.getInitialProps = ({query, res}) => {
  const height = Number(query.height);
  if(res) {
    if(isNaN(height)) {
      res.writeHead(302, {
        Location: '/blocks'
      })
      res.end()
    } else {
      return {
        height,
        isServer:true
      }
    }
  } else {
    return {
      height,
      isServer: false
    }
  }
}