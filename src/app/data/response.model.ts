export class ResponseModel<T> {
  type: number;
  status: number;
  message: string[] = [];
  result: T;

  public constructor(
    data?: ResponseModel<T>
  ) {
    const responseModel = data == null ? this : data;

    this.type = responseModel.type;
    this.status = responseModel.status;
    this.message = responseModel.message;
    this.result = responseModel.result;
  }
}
