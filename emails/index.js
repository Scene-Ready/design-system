import { PIECES } from "./compiled.js";
import { composeDigest } from "./wrap-digest.js";
import { composeIncidentAlert } from "./wrap-incident-alert.js";
import { composeSimpleMessage } from "./wrap-simple-message.js";

// Each wrapper composes the precompiled pieces in emails/compiled.js.
export const wrapSimpleMessage = (input) => composeSimpleMessage(input, PIECES);
export const wrapIncidentAlert = (input) => composeIncidentAlert(input, PIECES);
export const wrapDigest = (input) => composeDigest(input, PIECES);
