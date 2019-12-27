import React, { PureComponent } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import NetworkStakingState from '../../src/components/NetworkStakingState';
import Panel from '../../src/components/Panel';

const circleStyle = {
  display: 'inline-block',
  verticalAlign: 'center',
  marginLeft: '10px',
  verticalAlign: 'middle'
};

export default class StakingPage extends PureComponent {
  state = {
    summary: {},
    stakeInfo: {},
    error: ''
  }

  async componentDidMount() {
    const staking = await this.fetchNetworkStaingState();
    this.setState((prevState) => {
      return {
        ...prevState,
        ...staking
      }
    })
  }

  render () {
    const { summary, stakeInfo, error } = this.state;
    return (
      <>
        <Head><title>Fusion Miners  | FSN explorer</title></Head>
        <Container style={{marginBottom: '1.25rem'}}>
          <Typography variant="h4">Fusion Staking</Typography>
        </Container>
        <Container style={{marginBottom: '1.75rem'}}>
          <Panel>
            <Typography  variant="h6">Summary</Typography>
            <div className="summary">
              <div><strong>Total Miners:</strong> {summary.totalMiners ?  summary.totalMiners : (error ? <span>{error}</span>: <CircularProgress size={10} style={circleStyle} />)}</div>
              <div><strong>Total Tickets:</strong> {summary.totalTickets ?  summary.totalTickets : (error ? <span>{error}</span>: <CircularProgress size={10} style={circleStyle} />)}</div>
            </div>
          </Panel>
        </Container>
        <Container>{summary.totalMiners ?
          <Panel><NetworkStakingState data={stakeInfo} /></Panel>:
          <Panel>
            <Typography component="h6" variant="h6">
              Fusion Miners {error ? <span>{error}</span>: <CircularProgress size={20} style={circleStyle} />}
            </Typography>
          </Panel>}
        </Container>
      </>
    )
  }

  fetchNetworkStaingState = async () => {
    return fetch('http://localhost:8888/api/staking')
      .then(res => res.json())
      .then(res => res.data)
      .then((data) => {
        return data;
      })
      .catch(e => {
        return {
          error: 'Something went wrong, please refresh page.'
        }
      });
  }
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