import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#fff',
    border: 0,
    borderRadius:3,
    boxShadow: '0 0 3px #eee',
    height: 48,
    padding: '0 30px',
    color:'red',
    '& p':{
      color: 'green',
      '& span': {
        color:'blue'
      }
    }
  }
});

export default function Mui() {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Mui</title>
      </Head>
      <Nav>Home</Nav>
      <div className="container" className={classes.root}>
        <h2>Read headline</h2>
        <p>This is the red since is inside the root</p>
        <p>
          This is green since it is inside the paragrahp <span>and this is blue since it is inside the span.</span>
        </p>
      </div>
    </>
  )
}