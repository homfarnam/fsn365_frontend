import React from 'react';
import Container from '@material-ui/core/Container';
import Panel from '../src/components/Panel';
import PageHeading from '../src/components/PageHeading';
import MinedBlocks from '../src/components/MinedBlocks';

export default function BlockListPage (props) {
  const {miner} = props;
  return (
    <>
      <PageHeading title={'Blocks'} />
      <Container>
        <Panel>
          <MinedBlocks
            miner={miner}
            tableOptions={{pageSize: 10, pageSizeOptions: [10,20,50]}}
          />
        </Panel>
      </Container>
    </>
  )
}

BlockListPage.getInitialProps = async({query}) => {
  return {
    ...query
  }
}