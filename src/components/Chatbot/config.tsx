import { createChatBotMessage } from "react-chatbot-kit";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import InitialOptions from "./initialOptions";
import { getOpeningHours } from "../../request/userManagement";
import ChatbotOpeningHours from "./ChatbotOpeningHours";

const config: IConfig = {
  initialMessages: [
    createChatBotMessage(
      `Hallo, ich bin der Chatbot vom Papaya Lieferdienst!`,
      { widget: "initialOptions" }
    ),
  ],
  botName: "Papaya Lieferdienst",
  widgets: [
    {
      widgetName: "initialOptions",
      widgetFunc: (props: any) => <InitialOptions {...props} />,
      mapStateToProps: ["messages"],
      props: {},
    },
    {
      widgetName: "openingHours",
      widgetFunc: (props: any) => <ChatbotOpeningHours {...props} />,
      mapStateToProps: ["messages"],
      props: { openingHours: getOpeningHours() },
    },
  ],
  customComponents: {
    botAvatar: () => (
      <SmartToyIcon style={{ fill: "black", fontSize: 35, marginRight: 5 }} />
    ),
    header: () => (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#515151f2",
          color: "white",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        Papaya Chatbot
      </div>
    ),
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#2d3134f2",
    },
    chatButton: {
      backgroundColor: "#2d3134f2",
    },
  },
};

export default config;
