import React from 'react';
import Container from '@material-ui/core/Container';
import Transactions from '../src/components/Transactions';
import Panel from '../src/components/Panel';
import PageHeading from '../src/components/PageHeading';

export default function TxListPage ({params}) {
  let type = params.type ? `#${params.type}`: '';
  return (
    <>
      <PageHeading title="Transactions" suffix={type} />
      <Container>
        <Panel>
          <Transactions
            params={params}
          />
        </Panel>
      </Container>
    </>
  )
}

TxListPage.getInitialProps = async ({query}) => {
  return {
    params: query
  }
}