import React, { useContext, useEffect, useState } from "react";
import Section from "../Section";
import StatCard from "./StatCard";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { getFmeazyContract } from "../../utils/contractHelpers";
import { formatBigNumberValues } from "../../utils";
import { GlobalVars } from "./types";
import { RefreshContext } from "../../contexts/RefreshContext";

const initialState = {
  members: 0,
  gEazyMatrix: 0,
  gEazyReferral: 0,
  gEazyRewards: 0,
};
function StatComponent() {
  const [globalVars, setGlobalVars] =
    useState<ReturnType<typeof formatBigNumberValues>>(initialState);

  const { library } = useActiveWeb3React();
  const { fast } = useContext(RefreshContext);

  // fetch gglobal info
  useEffect(() => {
    async function fetchGlobalVariables() {
      if (library) {
        const contract = getFmeazyContract(
          library.getSigner("0xB93eDb2783632bCc59cc2ca563a2429bd373BD6B")
        );

        const globalVars = await contract.globalVariables();

        const { members, gEazyMatrix, gEazyReferral, gEazyRewards } =
          globalVars as GlobalVars;

        const gVars = formatBigNumberValues(
          {
            members,
            gEazyMatrix,
            gEazyReferral,
            gEazyRewards,
          },
          ["gEazyMatrix", "gEazyReferral", "gEazyRewards"]
        );
        setGlobalVars(gVars);
      } else {
        setGlobalVars(initialState);
      }
    }
    fetchGlobalVariables();
  }, [library, fast]);

  return (
    <Section containerClass="my-8">
      <div className="text-sm font-light p-2 text-primary-900">
        Verified Stats
      </div>
      <div className="flex flex-col m-5">
        <div className="flex flex-col md:flex-row justify-between">
          <StatCard
            amount={globalVars.members}
            label="Active Users"
            prefix={""}
          />
          <StatCard
            amount={globalVars.gEazyReferral}
            label="paid in EazyReferrals"
            prefix={"$ "}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <StatCard
            amount={globalVars.gEazyRewards}
            label="paid in EazyRewards"
            prefix={"$ "}
          />
          <StatCard
            amount={globalVars.gEazyMatrix}
            label="paid in EazyMatrix"
            prefix={"$ "}
          />
        </div>
      </div>
    </Section>
  );
}

export default StatComponent;
