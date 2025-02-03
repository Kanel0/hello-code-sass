// utils/logger.ts
import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
  level: 'info', // Niveau de log : info, warn, error, etc.
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), 
    new transports.File({
      filename: path.join(process.cwd(), 'src/logs/app.log'), 
      level: 'info',
         }),
  ],
});

export default logger;
