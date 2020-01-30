import React, { useState } from "react";
import PropType from "prop-types";
import { FusionTab, FusionTabs, FusionTabPanel } from "../FusionTabs";
import FusionTabPanels from "../FusionTabs/FusionTabPanels";
import ActiveTickets from "../ActiveTickets";
import MinersBuyingTickets from "../MinersBuyingTickets";
import Panel from "../Panel";

const tabMap = {
  block: 0,
  ticket: 1
};

export default function MiningState(props) {
  const { miner, view = "block" } = props;

  const [state, setState] = useState({
    tab: tabMap[view] || 0
  });
  const handleTabChange = (e, newValue) => {
    setState({
      ...state,
      tab: newValue
    });
  };

  return (
    <Panel>
      <FusionTabs
        value={state.tab}
        onChange={handleTabChange}
        style={{ marginBottom: "0" }}
      >
        <FusionTab label="Ticket Buying"></FusionTab>
        <FusionTab label="Tickets Status"></FusionTab>
      </FusionTabs>
      <FusionTabPanels>
        <FusionTabPanel value={state.tab} index={0}>
          <MinersBuyingTickets miner={miner} />
        </FusionTabPanel>
        <FusionTabPanel value={state.tab} index={1}>
          <ActiveTickets miner={miner} />
        </FusionTabPanel>
      </FusionTabPanels>
    </Panel>
  );
}

MiningState.propTypes = {
  miner: PropType.string,
  className: PropType.string,
  view: PropType.string
};
