import React from 'react';
import Panel from '../src/components/Panel';
import PageHeading from '../src/components/PageHeading';
import { makeStyles, createStyles,  } from "@material-ui/core/styles";
import NotFound from '../src/components/NotFound';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: '10vh 8vw',
      alignItems: 'center',
      fontSize: '1.25rem',
      '&:img': {
        width: '240px'
      }
    }
  })
);


export default function SearchPage ({query}) {
  const classes = useStyles();
  return (
    <>
      <PageHeading title={'Search Result'} />
        <Panel >
          <div className={classes.container}>
            <div>
            <p>Oops! The search string you entered was: <strong>{query.keyword}</strong>.</p>
            <p>Sorry! This is an invalid search string.</p>
          </div>
          <NotFound />
          </div>
        </Panel>
    </>
  )
}

SearchPage.getInitialProps = async ({query}) => {
  return {
    query: query
  }
}