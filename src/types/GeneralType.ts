export interface GeneralType<T> {
  status: StatusType;
  data: T;
}

export interface StatusType {
  statusCode: number;
  timestamp: string;
  message: string;
}
