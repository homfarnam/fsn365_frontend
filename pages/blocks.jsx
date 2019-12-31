import React from 'react';
import Panel from '../src/components/Panel';
import PageHeading from '../src/components/PageHeading';
import MinedBlocks from '../src/components/MinedBlocks';
import { makeStyles, createStyles,  } from "@material-ui/core/styles";
import FusionAddressLink from '../src/components/FusionAddressLink';

const useStyles = makeStyles(() =>
  createStyles({
    address: {
      display: 'flex',
      flexWrap: 'wrap',
      wordBreak: 'break-all',
      paddingLeft: '.75rem'
    },
    span: {
      margin: '0 4px',
      display: 'inline-block'
    },
  })
);


export default function BlockListPage ({params}) {
  const classes = useStyles();
  return (
    <>
      <PageHeading title={'Blocks'} />
        <Panel style={{paddingTop:0, paddingLeft:0, paddingRight:0}}>
          {params.miner ? <p className={classes.address}><span className={classes.span}>Blocks mined by</span> <FusionAddressLink address={params.miner} /></p>:null}
          <MinedBlocks
            miner={params.miner}
            tableOptions={{pageSize: 10, pageSizeOptions: [10,20,50]}}
          />
        </Panel>
    </>
  )
}

BlockListPage.getInitialProps = async ({query}) => {
  return {
    params: query
  }
}