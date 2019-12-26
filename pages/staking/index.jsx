import React from 'react';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

export default function StakingPage (props) {
  return (
    <div>
      <h4>staking Index page</h4>
      <Button color="primary" onClick={handleClick}>To Miner page</Button>
      {JSON.stringify(props)}
    </div>
  )
}

const handleClick = () => {
  const miner = '0x47dd95c5c8ec54cc573dbbe0ab998022f3072aee';
  Router.push(`/staking/${miner}`)
}

StakingPage.getInitialProps = async({query, res}) => {
  return {
    isServer: !!res
  }
}
