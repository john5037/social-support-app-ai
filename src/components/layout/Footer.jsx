import React from "react";

const Footer = ({ step, allSteps }) => {
  return (
    <footer className="app-footer">
      Application Status:{" "}
      {step <= allSteps.length
        ? `Step ${step} of ${allSteps.length}`
        : "Completed"}
    </footer>
  );
};

export default Footer;
