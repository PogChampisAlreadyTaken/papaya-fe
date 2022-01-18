import { getDeliverTime } from "../../request/userManagement";

class ActionProvider {
  createChatbotMessage: any;
  setState: any;
  createClientMessage: any;

  constructor(
    createChatbotMessage: any,
    setStateFunc: any,
    createClientMessage: any
  ) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleHello() {
    const message = this.createChatbotMessage(
      "Hallo! Schön dich kennenzulernen."
    );

    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  handleUnknown() {
    const message = this.createChatbotMessage(
      "Ich hab dich leider nicht verstanden."
    );

    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  async handleDeliveryTime() {
    const time = await getDeliverTime()
      .then((deliveryTime: number) => {
        return deliveryTime;
      })
      .catch((error: any) => {
        return 25;
      });
    const message = this.createChatbotMessage(
      "Die Lieferzeit beträgt aktuell etwa " + time + " Minuten."
    );

    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  handleContact() {
    const contactMessage = this.createChatbotMessage(
      "Hier kannst du uns jederzeit kontaktieren."
    );

    const addressMessage = this.createChatbotMessage(
      "Addresse: Bahnhofstraße 1, 83022 Rosenheim"
    );
    const phoneMessage = this.createChatbotMessage("Telefon: 08031 8070999");

    this.setState((prevState: any) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        contactMessage,
        addressMessage,
        phoneMessage,
      ],
    }));
  }

  async handleOpeningHours() {
    const message = this.createChatbotMessage(
      "Zu diesen Zeiten sind wir geöffnet.",
      { widget: "openingHours" }
    );

    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
