export const log = (logObject: any, level: string = 'debug') => {
  let logString =
    typeof logObject === 'object' ? JSON.stringify(logObject) : logObject;
  logString = `${level} => ${logString}`;
  if (level === 'error') {
    console.error(logString);
  } else if (level === 'warning') {
    console.warn(logString);
  } else if (level === 'info' && process.env.NODE_ENV === 'development') {
    console.log(logString);
  } else if (level === 'debug' && process.env.NODE_ENV === 'development') {
    console.log(logString);
  }
};
