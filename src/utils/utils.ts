interface CustomError extends Error {
    statusCode?: number;
    message: string;
  }


  export function throwHttpError(statusCode: number, message: string): CustomError {
    if (typeof statusCode !== 'number') {
      throw new TypeError('statusCode must be a number');
    }
  
    const error: CustomError = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }
  