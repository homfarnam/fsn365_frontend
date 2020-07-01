import Router from 'next/router';

export default function AssetIndex (){
  return null;
}

AssetIndex.getInitialProps = ({res}) => {
  if(res) {
    res.writeHead(302, {
      Location: '/assets'
    });
    res.end();
  } else {
    Router.push('/assets');
  }
}