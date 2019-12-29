import Router from 'next/router';

export default function AssetIndex (props){
  return null;
}

AssetIndex.getInitialProps = ({query, res}) => {
  if(res) {
    res.writeHead(302, {
      Location: '/assets'
    });
    res.end();
  } else {
    Router.push('/assets');
  }
}