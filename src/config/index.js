import local from "./config.local";

const getConfig = () => {
  //console.log("config", window.config.ENV)

  const env = "local";
  //const env = window.config.ENV;

  switch (env) {
    case "local":
      return local.config;
    default:
      return "Invalid env";
  }
};

export const config = getConfig();
