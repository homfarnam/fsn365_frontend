import React, { PureComponent } from 'react';

export default class MinerStakingPage extends PureComponent {
  render() {
    return (
      <div>
        {JSON.stringify(this.props)}
      </div>
    )
  }
}

MinerStakingPage.getInitialProps = async ({query, res}) =>{
  return {
    ...query,
    isServer: !!res
  }
}