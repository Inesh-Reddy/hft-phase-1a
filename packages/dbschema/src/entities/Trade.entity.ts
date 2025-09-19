import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./Base.entity";

@Entity("trades")
export class Trade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marketSymbol: string;

  @Column("decimal", { precision: 30, scale: 8 })
  price: string;

  @Column("decimal", { precision: 30, scale: 8 })
  quantity: string;

  @Column()
  side: "buy" | "sell";

  @Column()
  exchange: string;

  @Column({ type: "bigint" })
  tradeTime: number;
}
