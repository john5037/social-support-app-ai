import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const AIModal = ({
  suggestion,
  targetField,
  onAccept,
  onDiscard,
  isRTL,
  texts,
  isGenerating,
}) => {
  const [editText, setEditText] = useState(suggestion || "");

  useEffect(() => {
    setEditText(suggestion || "");
  }, [suggestion]);

  if (!suggestion && !isGenerating) return null;

  const fieldLabel = texts[targetField] || targetField;

  return (
    <div
      className="ai-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-modal-title"
    >
      <div className={`ai-modal ${isRTL ? "rtl" : "ltr"}`}>
        <div className="ai-modal-header">
          <h3 id="ai-modal-title" className="ai-modal-title">
            {texts.aiModalTitle(fieldLabel)}
          </h3>
          <p className="ai-modal-subtitle">{texts.aiModalSubtitle}</p>
        </div>
        <div className="ai-modal-content">
          {isGenerating ? (
            <div className="ai-modal-loading">
              <Loader2 className="loading-spinner" />
              <span className="loading-text">{texts.loading}</span>
            </div>
          ) : (
            <textarea
              rows="8"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="ai-modal-textarea"
              aria-label="Edit AI suggestion"
            />
          )}
        </div>
        <div className={`ai-modal-actions ${isRTL ? "rtl" : "ltr"}`}>
          <button
            type="button"
            onClick={onDiscard}
            className="ai-modal-button secondary"
            disabled={isGenerating}
          >
            {texts.discard}
          </button>
          <button
            type="button"
            onClick={() => onAccept(editText)}
            className="ai-modal-button primary"
            disabled={isGenerating || !editText.trim()}
          >
            {texts.accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
