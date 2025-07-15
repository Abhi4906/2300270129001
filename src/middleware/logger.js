const sendLog = (source, type, message) => {
    console.log(`[${source.toUpperCase()}] [${type.toUpperCase()}]: ${message}`);
  };
  
  export default sendLog;
  