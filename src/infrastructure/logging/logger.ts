// Logger utility for comprehensive debugging
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  TRACE = 'TRACE'
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private isDevelopment = true;
  private maxLogs = 500;

  constructor() {
    // Store logs in sessionStorage for persistence
    this.loadLogs();
  }

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private getColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '#00A4EF'; // Blue
      case LogLevel.INFO:
        return '#28A745'; // Green
      case LogLevel.WARN:
        return '#FFC107'; // Yellow
      case LogLevel.ERROR:
        return '#DC3545'; // Red
      case LogLevel.TRACE:
        return '#6C757D'; // Gray
      default:
        return '#000000';
    }
  }

  private log(level: LogLevel, module: string, message: string, data?: any): void {
    const timestamp = this.formatTimestamp();
    const logEntry: LogEntry = { timestamp, level, module, message, data };

    // Store in logs array
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Save to sessionStorage
    this.saveLogs();

    // Console output
    const style = `color: ${this.getColor(level)}; font-weight: bold; font-size: 12px;`;
    const prefix = `[${level}] [${module}]`;
    
    if (data !== undefined) {
      console.log(`%c${prefix} ${message}`, style, data);
    } else {
      console.log(`%c${prefix} ${message}`, style);
    }
  }

  debug(module: string, message: string, data?: any): void {
    this.log(LogLevel.DEBUG, module, message, data);
  }

  info(module: string, message: string, data?: any): void {
    this.log(LogLevel.INFO, module, message, data);
  }

  warn(module: string, message: string, data?: any): void {
    this.log(LogLevel.WARN, module, message, data);
  }

  error(module: string, message: string, data?: any): void {
    this.log(LogLevel.ERROR, module, message, data);
  }

  trace(module: string, message: string, data?: any): void {
    this.log(LogLevel.TRACE, module, message, data);
  }

  private saveLogs(): void {
    try {
      sessionStorage.setItem('ghadwa_logs', JSON.stringify(this.logs));
    } catch (e) {
      console.warn('Failed to save logs to sessionStorage');
    }
  }

  private loadLogs(): void {
    try {
      const stored = sessionStorage.getItem('ghadwa_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load logs from sessionStorage');
    }
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  getLogsByModule(module: string): LogEntry[] {
    return this.logs.filter(log => log.module === module);
  }

  clearLogs(): void {
    this.logs = [];
    sessionStorage.removeItem('ghadwa_logs');
    console.log('%c[LOGGER] All logs cleared', 'color: #FFC107; font-weight: bold;');
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  downloadLogs(): void {
    const data = this.exportLogs();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ghadwa-logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const logger = new Logger();

// Also expose on window for browser console access
(window as any).GhadwaLogger = logger;
