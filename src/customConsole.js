// https://github.com/0xyami/web-scripts/blob/main/src/customConsole.js \\

const genericStyle = window.genericStyle
                     + " font-weight: 800; padding: 2px 5px; color: black;";
const appName = window.appName = "www.hylia.dev";
const backgroundColor = window.backgroundColor = "#05c896"

const createData = (type, color) => {
  if (!backgroundColor.startsWith("#"))
    {
      throw new Error ("Background color must start with #");
    }

  return [
    `%c${appName}%c${type.toUpperCase()}%c`,
    genericStyle + `border-radius: 25px 0 0 25px; background: ${backgroundColor};`,
    genericStyle + `border-radius: 0 25px 25px 0; background: #${color};`,
    "color: unset;",
  ];
};

class CustomConsole
{
  constructor()
  {
    return new Proxy (console, {
      get : (target, prop) => {
        if (typeof target[prop] === "function")
          {
            return this._overrideMethod(target, prop);
          }
        return target[prop];
      },
    });
  }

  _overrideMethod(target, methodName)
  {
    return (...args) => {
      let msg;
      switch (methodName)
        {
        case "log":
          msg = createData ("info", "5050ff");
          target[methodName](...msg, ...args);
          break;

        case "warn":
          msg = createData ("warning", "ffcd00");
          target[methodName](...msg, ...args);
          break;

        case "error":
          msg = createData ("error", "ff5050");
          target[methodName](...msg, ...args);
          break;

        case "debug":
          msg = createData ("debug", "1f00ff");
          target[methodName](...msg, ...args);
          break;

        default:
          msg = createData ("unkown", "bb00ff");
          target[methodName](...msg, ...args);
          break;
        }
    };
  }
}

console = new CustomConsole ();