import { createRef, useState, useEffect } from "react";
import React from "react";

import "@apollo-elements-demos/spacex-launches";

export const LaunchesDemo = () => {
  const launchesRef = createRef(null);
  const launchRef = createRef(null);
  const [{ missionName, id }, setSelectedLaunch] = useState({});
  const [launches, setLaunches] = useState([]);

  function onLaunchesChanged({ detail }) {
    setLaunches(detail);
  }

  function onSelect({ detail }) {
    setSelectedLaunch(detail);
  }

  useEffect(() => {
    launchesRef.current.addEventListener("launches-changed", onLaunchesChanged);
    launchesRef.current.addEventListener("selected-launch-changed", onSelect);
  }, [launchesRef.current]);

  useEffect(() => {
    launchRef.current.launchId = id || "";
  }, [id]);

  return (
    <React.Fragment>
      <apollo-client uri="https://api.spacex.land/graphql" validate-variables>
        <p-card>
          <h2 slot="heading">React</h2>
          <p className="info">
            React renders this card. The card below it is handled by Apollo Elements.
          </p>

          <spacex-launches ref={launchesRef}></spacex-launches>

          <p>
            There are {launches.length} launches available. You've
            {!id ? "not " : ""} selected {missionName || "anything yet"}.
          </p>
        </p-card>

        <spacex-launch ref={launchRef}></spacex-launch>
      </apollo-client>
    </React.Fragment>
  );
};
