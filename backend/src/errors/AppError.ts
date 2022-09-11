export { AppError };

interface IAppError {
  message: string;
  statusCode: number;
}

class AppError extends Error {
  constructor(private data: IAppError) {
    super();

    if (data.statusCode === undefined) {
      this.data.statusCode = 400;
    }
  }

  get message() {
    return this.data.message;
  }

  get statusCode() {
    return this.data.statusCode;
  }
}
