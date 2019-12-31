import React from 'react';
import Panel from '../src/components/Panel';
import PageHeading from '../src/components/PageHeading';
import MinedBlocks from '../src/components/MinedBlocks';
import { useRouter } from 'next/router';

export default function BlockListPage () {
  const router = useRouter();
  return (
    <>
      <PageHeading title={'Blocks'} />
        <Panel>
          <MinedBlocks
            miner={router.query.miner}
            tableOptions={{pageSize: 10, pageSizeOptions: [10,20,50]}}
          />
        </Panel>
    </>
  )
}
