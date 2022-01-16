import { ActionProvider } from ".";

class MessageParser {
  actionProvider: ActionProvider;
  state: any;

  constructor(actionProvider: ActionProvider, state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message: string) {
    message = message.toLowerCase();
    if (checkHello(message)) {
      this.actionProvider.handleHello();
    } else if (checkDeliveryTime(message)) {
      this.actionProvider.handleDeliveryTime();
    } else if (checkContact(message)) {
      this.actionProvider.handleContact();
    } else if (openingHours(message)) {
      this.actionProvider.handleOpeningHours();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;

const openingHours = (message: string) => {
  return message.includes("öffnungszeiten") || message.includes("offen");
};

const checkHello = (message: string) => {
  return (
    message.includes("hallo") ||
    message.includes("hi") ||
    message.includes("hey") ||
    message.includes("servus") ||
    message.includes("dere")
  );
};

const checkDeliveryTime = (message: string) => {
  return (
    message.includes("wie lang") ||
    message.includes("lieferzeit") ||
    message.includes("wie lang") ||
    message.includes("ankommen") ||
    message.includes("wann kommt")
  );
};
const checkContact = (message: string) => {
  return (
    message.includes("adresse") ||
    message.includes("kontakt") ||
    message.includes("telefon") ||
    message.includes("straße")
  );
};
