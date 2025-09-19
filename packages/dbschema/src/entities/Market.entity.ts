import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./Base.entity";

@Entity("markets")
export class Market extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  symbol: string;

  @Column()
  baseAsset: string;

  @Column()
  quoteAsset: string;

  @Column()
  exchange: string;
}
