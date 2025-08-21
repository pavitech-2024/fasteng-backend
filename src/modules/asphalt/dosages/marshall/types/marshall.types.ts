import { BinderTrialDataDTO } from "../dto/binder-trial-data.dto";
export type TrialLabel = 'oneLess' | 'halfLess' | 'normal' | 'halfPlus' | 'onePlus';

export type TrialItem = {
  material: string;
  value: number;
  trial: TrialLabel;
};

export type PercentsMap = Record<string, number>;
export type PercentsInput =
  | { percentsOfDosages: PercentsMap[] } // nome usado no service original
  | { percentsOfDosage: PercentsMap[] }; // nome do seu DTO

export type CalculateBinderTrialInput = BinderTrialDataDTO &
  PercentsInput & {
    binder: string; // necessário para buscar as faixas de temperatura
  };

export type SaveStep4Body = {
  // no seu código original, o "name" vem DENTRO de binderTrialData
  binderTrialData: BinderTrialDataDTO & { name: string };
};

export type ViscosityTempRange = { higher: number; lower: number };
export type ViscosityPayload = {
  machiningTemperatureRange: ViscosityTempRange;
  compressionTemperatureRange: ViscosityTempRange;
};
export type ViscosityResultShape = { results: ViscosityPayload } | { data: ViscosityPayload };