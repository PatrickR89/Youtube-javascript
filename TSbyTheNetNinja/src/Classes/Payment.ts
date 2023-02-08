import { HasFormater } from "../Interfaces/HasFormatter.js";

export class Payment implements HasFormater {
  readonly recipient: string;
  private details: string;
  public amount: number;

  constructor(client: string, details: string, amount: number) {
    this.recipient = client;
    this.details = details;
    this.amount = amount;
  }

  format() {
    return `${this.recipient} is owed $ ${this.amount} for ${this.details}`;
  }
}
