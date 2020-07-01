import Router from 'next/router';

export default function BlockIndex (props){
  return null;
}

BlockIndex.getInitialProps = ({res}) => {
  if(res) {
    res.writeHead(302, {
      Location: '/blocks'
    });
    res.end();
  } else {
    Router.push('/block');
  }
}