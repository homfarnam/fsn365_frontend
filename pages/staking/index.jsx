import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import NetworkStakingState from '../../src/components/NetworkStakingState';
import Panel from '../../src/components/Panel';
import PageHeading from '../../src/components/PageHeading';
import fetch from '../../src/libs/fetch';

const circleStyle = {
  display: 'inline-block',
  verticalAlign: 'center',
  marginLeft: '10px',
  verticalAlign: 'middle'
};

export default function StakingPage ({miner}) {
  const [state, setState] = useState({
    summary: {},
    stakeInfo: {},
    error: ''
  });

  useEffect(() => {
    fetch('/staking')
      .then(res => res.json())
      .then(res => res.data)
      .then((data) => {
        setState({
          ...data,
          error: ''
        });
      })
      .catch(e => {
        setState({
          error: 'Something went wrong, please refresh page and have a try!'
        })
      }).then
  }, [miner])

  const { summary, stakeInfo, error } = state;
  return (
    <>
      <PageHeading title={'Fusion Miners'} />
      <Panel style={{marginBottom: '1.75rem'}}>
        <Typography  variant="h6">Summary</Typography>
        <div className="summary">
          <div><strong>Total Miners:</strong> {summary.totalMiners ?  summary.totalMiners : (error ? <span>{error}</span>: <CircularProgress size={10} style={circleStyle} />)}</div>
          <div><strong>Total Tickets:</strong> {summary.totalTickets ?  summary.totalTickets : (error ? <span>{error}</span>: <CircularProgress size={10} style={circleStyle} />)}</div>
        </div>
      </Panel>
      {summary.totalMiners ?
      <Panel><NetworkStakingState data={stakeInfo} totalTickets={summary.totalTickets} /></Panel>:
      <Panel>
        <Typography component="h6" variant="h6">
          Fusion Miners {error ? <span>{error}</span>: <CircularProgress size={20} style={circleStyle} />}
        </Typography>
      </Panel>}
    </>
  )
}

StakingPage.getInitialProps = async({query, res}) => {
  const { miner } = query;
  if(miner) {
    if(res) {
      res.writeHead(302, {
        Location: `/staking/${miner}`
      });
    } else {
      Router.push(`/staking/${miner}`);
    }
  } else {
    return {
      isServer: !!res
    };
  }
}
