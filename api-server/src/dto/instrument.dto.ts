export enum InstrumentType {
  CALL = 'CALL',
  PUT = 'PUT',
}

export class InstrumentDto {
  _id?: any;

  strike: number;

  maturity: Date;

  type: InstrumentType = InstrumentType.PUT;
}
