import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./Base.entity";

@Entity("orderbooks")
export class Orderbook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marketSymbol: string;

  @Column("jsonb")
  bids: { price: string; quantity: string }[];

  @Column("jsonb")
  asks: { price: string; quantity: string }[];

  @Column()
  exchange: string;

  @Column({ type: "bigint" })
  timestamp: number;
}
