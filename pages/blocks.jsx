import React from 'react';
import Panel from '../src/components/Panel';
import PageHeading from '../src/components/PageHeading';
import MinedBlocks from '../src/components/MinedBlocks';

export default function BlockListPage (props) {
  const {miner} = props;
  return (
    <>
      <PageHeading title={'Blocks'} />
        <Panel>
          <MinedBlocks
            miner={miner}
            tableOptions={{pageSize: 10, pageSizeOptions: [10,20,50]}}
          />
        </Panel>
    </>
  )
}

BlockListPage.getInitialProps = async({query}) => {
  return {
    ...query
  }
}