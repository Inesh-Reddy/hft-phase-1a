import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758264390022 implements MigrationInterface {
    name = 'Init1758264390022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trades" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "marketSymbol" character varying NOT NULL, "price" numeric(30,8) NOT NULL, "quantity" numeric(30,8) NOT NULL, "side" character varying NOT NULL, "exchange" character varying NOT NULL, "tradeTime" bigint NOT NULL, CONSTRAINT "PK_c6d7c36a837411ba5194dc58595" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderbooks" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "marketSymbol" character varying NOT NULL, "bids" jsonb NOT NULL, "asks" jsonb NOT NULL, "exchange" character varying NOT NULL, "timestamp" bigint NOT NULL, CONSTRAINT "PK_8aa75fd2707f1decb3bb5892516" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "markets" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "symbol" character varying NOT NULL, "baseAsset" character varying NOT NULL, "quoteAsset" character varying NOT NULL, "exchange" character varying NOT NULL, CONSTRAINT "UQ_447a6e3bfcc2802e9ee55f7e2e2" UNIQUE ("symbol"), CONSTRAINT "PK_dda44129b32f21ae9f1c28dcf99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "markets"`);
        await queryRunner.query(`DROP TABLE "orderbooks"`);
        await queryRunner.query(`DROP TABLE "trades"`);
    }

}
