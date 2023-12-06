import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsArray, IsNotEmpty } from "class-validator";
import { Material } from "../../../../../modules/concrete/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SandIncrease_Out } from "../dto/calc.sand-increase.dto";

export type SandIncreaseDocument = HydratedDocument<SandIncrease>;

export type SandIncreaseGeneralData = {
  userId: string;
  name: string;
  material: Material;
  //createdAt: Date;
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

export type MoistureContentTableData = {
  capsuleWeight: number,
  dryGrossWeight: number,
  wetGrossWeight: number,
  sample: string,
  moistureContent: null
}

export type SandIncreaseUnitMassDeterminationData = {
  containerVolume: number,
  containerWeight: number,
  tableData: UnitMassTableData[]
}

export type SandIncreaseHumidityFoundData = {
  capsuleWeight: number,
  dryGrossWeight: number,
  moistureContent: number,
  wetGrossWeight: number,
  sample: string
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
    tableData: MoistureContentTableData[]
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
  @IsArray()
  @Prop({ type: Object })
  humidityFoundData: SandIncreaseHumidityFoundData[]

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SandIncrease_Out
  };
}

export const SandIncreaseSchema = SchemaFactory.createForClass(SandIncrease);
