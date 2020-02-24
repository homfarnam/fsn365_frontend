import React from 'react';
import DoSearch from '../src/components/HomeSearchForm';
import FusionOverview from '../src/components/FusionOverview';
import RealTimeTxns from '../src/components/RealTimeTxns';
import RealTimeBks from '../src/components/RealTimeBlocks';
import { makeStyles, createStyles } from "@material-ui/core/styles";


export default function HomePage(props) {
  const bks = [{
    height: 1546720,
    txCount: 0,
    miner: '0xc4c4b34316f7b0fd3431af355ebcf0283c826198',
    timestamp:Date.now(),
    reward: 2.5
  }, {
    height: 9536583,
    txCount: 200,
    miner: '0x88817ef0545ca562530f9347b20138edecfd8e30',
    timestamp:Date.now(),
    reward: 2.5
  }, 
{
    height: 9536583,
    txCount: 1,
    miner: '0xc4c4b34316f7b0fd3431af355ebcf0283c826198',
    timestamp:Date.now(),
    reward: 2.5
  }, {
    height: 9536583,
    txCount: 1,
    miner: '0x88817ef0545ca562530f9347b20138edecfd8e30',
    timestamp:Date.now(),
    reward: 2.5
  },
{
    height: 9536583,
    txCount: 1,
    miner: '0xc4c4b34316f7b0fd3431af355ebcf0283c826198',
    timestamp:Date.now(),
    reward: 2.5
  }, {
    height: 9536583,
    txCount: 1,
    miner: '0x88817ef0545ca562530f9347b20138edecfd8e30',
    timestamp:Date.now(),
    reward: 2.5
  }];
  const txs = [{from: "0x37afe6319dbd980741cd3bfe701f196694d20564",
to: "0xe5a8654631b3729f73ca3503ba09a5d3e11b46da",
block: 1565467,
type: "TimeLockFunc",
gasLimit: 300000,
gasPrice: "21000000000",
gasUsed: 21000,
timestamp: 1582343769,
value: {
value: 2.499537048,
coin: "FSN",
assetID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
},
hash: "0xfe91d8b3b7f9f724c86d00dfdada3c95b0684e7a016c019fea09a522f586dbac"
  }, {
from: "0x29fec057b86ef46d240bd271837369f5715335ef",
to: "0x76c2ae4281fe1ee1a79ccbdda2516d4d7eb0eb37",
block: 1565458,
type: "BuyTicketFunc",
gasLimit: 90000,
gasPrice: "1000000000",
gasUsed: 26516,
timestamp: 1582343652,
value: {
value: 712528,
assetID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
coin: "FSN",
startTime: 1585612801,
endTime: 1593475200,
lockType: "TimeLockToTimeLock"
},
hash: "0x89bcf890cdc261f564b3a54f7afdb572f88775d74930d26fdd51c4eacd90fc65"
},{from: "0x37afe6319dbd980741cd3bfe701f196694d20564",
to: "0xe5a8654631b3729f73ca3503ba09a5d3e11b46da",
block: 1565467,
type: "TimeLockFunc",
gasLimit: 300000,
gasPrice: "21000000000",
gasUsed: 21000,
timestamp: 1582343769,
value: {
value: 2.499537048,
coin: "FSN",
assetID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
},
hash: "0xfe91d8b3b7f9f724c86d00dfdada3c95b0684e7a016c019fea09a522f586dbac"
  }, {
from: "0x29fec057b86ef46d240bd271837369f5715335ef",
to: "0x76c2ae4281fe1ee1a79ccbdda2516d4d7eb0eb37",
block: 1565458,
type: "BuyTicketFunc",
gasLimit: 90000,
gasPrice: "1000000000",
gasUsed: 26516,
timestamp: 1582343652,
value: {
value: 712528,
assetID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
coin: "FSN",
startTime: 1585612801,
endTime: 1593475200,
lockType: "TimeLockToTimeLock"
},
hash: "0x89bcf890cdc261f564b3a54f7afdb572f88775d74930d26fdd51c4eacd90fc65"
},{from: "0x37afe6319dbd980741cd3bfe701f196694d20564",
to: "0xe5a8654631b3729f73ca3503ba09a5d3e11b46da",
block: 1565467,
type: "TimeLockFunc",
gasLimit: 300000,
gasPrice: "21000000000",
gasUsed: 21000,
timestamp: 1582343769,
value: {
value: 2.499537048,
coin: "FSN",
assetID: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
},
hash: "0xfe91d8b3b7f9f724c86d00dfdada3c95b0684e7a016c019fea09a522f586dbac"
  },  {
  hash: "0x384e70108c2451c6f07d0424a3d1ba67894e7aeaef9b14b4f14fa0ceecf57051",
nonce: 14,
blockNumber: 133,
transactionIndex: 1,
from: "0xd2452651834e8f0c19c9d85e0bf09fe99283dabc",
to: "0x8e6bda71f3f0f49ddd29969de79afcfac4457379",
value: "1000000000000000000",
ivalue: "1",
dvalue: "0",
type: 'BuTicketFunc',
gasLimit: 90000,
gasPrice: "1000000000",
gasUsed: 25632,
timestamp: 1561896342,
}];
  const style = useStyles();
  return (
    <>
      <DoSearch />
      <FusionOverview />
      <section className={style.root}>
        <RealTimeTxns txs={txs} />
        <RealTimeBks bks={bks} />
      </section>
    </>
  )
}

HomePage.getInitialProps = ({}) => {
  return {
    txs: [],
    bks: []
  }
}



const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      '& > div': {
        width: '100%',
        [breakpoints.up("md")]: {
          width: "49%"
        }
      }
    }
  })
);