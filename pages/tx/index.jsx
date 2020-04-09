import Router from "next/router";

export default function TxIndex() {
  return null;
}

TxIndex.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(302, {
      Location: "/txs",
    });
    res.end();
  } else {
    Router.push("/txs");
  }
};
