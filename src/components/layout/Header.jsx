import React from "react";
import { COLOR_PRIMARY } from "../../utils/constants";

const Header = ({ texts, isRTL, onToggleLanguage }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className={isRTL ? "text-right" : "text-left"}>
          <h1 className="app-title">{texts.appTitle}</h1>
          <p className="app-subtitle">{texts.appSubtitle}</p>
        </div>
        <button
          onClick={onToggleLanguage}
          className="language-toggle"
          aria-label={isRTL ? "Switch to English" : "التبديل إلى العربية"}
        >
          {isRTL ? "English" : "العربية"}
        </button>
      </div>
    </header>
  );
};

export default Header;
