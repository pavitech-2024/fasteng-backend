import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/concrete/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SandIncrease_Out } from "../dto/calc.sand-increase.dto";

export type SandIncreaseDocument = HydratedDocument<SandIncrease>;

export type SandIncreaseGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

export type UnitMassTableData = {
  containerWeightSample: number,
  moistureContent: string,
  sample: string,
  unitMass: number
}

export type HumidityFoundTableData = {
  capsuleWeight: number,
  dryGrossWeight: number,
  wetGrossWeight: number,
  sample: string,
  moistureContent: number
}

export type SandIncreaseUnitMassDeterminationData = {
  containerVolume: number,
  containerWeight: number,
  tableData: UnitMassTableData[]
}

export type SandIncreaseHumidityFoundData = {
  step: number,
  calculateMoistureContent: {
    capsuleWeight: number[],
    dryGrossWeight: number[],
    wetGrossWeight: number[],
    tableData: HumidityFoundTableData[]
  }
}

export type SandIncreaseResultsData = {
  step: number,
  unitMassDeterminationData: {
    containerVolume: string,
    containerWeight: string,
    containerWeightSample: UnitMassTableData[],
    tableData: UnitMassTableData[]
  },
  humidityFoundData: {
    tableData: HumidityFoundTableData[]
  },
  sandIncreaseGeneralData: SandIncreaseGeneralData
}

@Schema({ collection: 'sandIncrease' })
export class SandIncrease {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SandIncreaseGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  unitMassDeterminationData: SandIncreaseUnitMassDeterminationData

  @IsNotEmpty()
  @Prop({ type: Object })
  humidityFoundData: SandIncreaseHumidityFoundData

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SandIncrease_Out
  };
}

export const SandIncreaseSchema = SchemaFactory.createForClass(SandIncrease);
