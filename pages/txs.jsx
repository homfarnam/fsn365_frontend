import React from 'react';
import Transactions from '../src/components/Transactions';
import Panel from '../src/components/Panel';
import PageHeading from '../src/components/PageHeading';
import FusionAddressLink from '../src/components/FusionAddressLink';
import { makeStyles, createStyles,  } from "@material-ui/core/styles";

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


export default function TxListPage ({params}) {
  let type = params.type ? `#${params.type}`: '';
  const {from, to} = params;
  const classes = useStyles();
  return (
    <>
      <PageHeading title="Transactions" suffix={type} />
      <Panel style={{paddingTop:0, paddingLeft:0, paddingRight:0}}>
        {from ? <p className={classes.address}><strong>Out </strong><span className={classes.span}>transactions for</span> <FusionAddressLink address={from} /></p>:null}
        {to? <p className={classes.address}><strong>Incoming </strong><span className={classes.span}>transactions for</span> <FusionAddressLink address={to} /></p>:null}
        <Transactions
          params={params}
        />
      </Panel>
    </>
  )
}

TxListPage.getInitialProps = async ({query}) => {
  return {
    params: query
  }
}