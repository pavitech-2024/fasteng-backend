import { ViscosityPayload } from "modules/asphalt/dosages/marshall/types/marshall.types";
export class TypeGuardsUtil {
  static isViscosityPayload(x: unknown): x is ViscosityPayload {
    if (typeof x !== 'object' || x === null) return false;
    const obj = x as Record<string, unknown>;
    const mt = obj['machiningTemperatureRange'] as Record<string, unknown>;
    const ct = obj['compressionTemperatureRange'] as Record<string, unknown>;
    return (
      typeof mt?.higher === 'number' &&
      typeof mt?.lower === 'number' &&
      typeof ct?.higher === 'number' &&
      typeof ct?.lower === 'number'
    );
  }

  static extractViscosityPayload(res: unknown): ViscosityPayload {
    if (typeof res === 'object' && res !== null) {
      const r = res as Record<string, unknown>;
      if ('results' in r && this.isViscosityPayload((r as any).results)) return (r as any).results;
      if ('data' in r && this.isViscosityPayload((r as any).data)) return (r as any).data;
    }
    throw new Error('Formato inesperado do retorno do ViscosityRotationalRepository.');
  }
}