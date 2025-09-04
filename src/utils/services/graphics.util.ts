import { GraphicsData } from "modules/asphalt/dosages/marshall/types";
export class GraphicsUtil {
  static createGraphicsStructure(): GraphicsData {
    return {
      rbv: [['Teor', 'Rbv']],
      vv: [['Teor', 'Vv']],
      sg: [['Teor', 'SpecificGravity']],
      gmb: [['Teor', 'Gmb']],
      stability: [['Teor', 'Stability']],
      vam: [['Teor', 'Vam']],
    };
  }

  static populateGraphicsData(graphics: GraphicsData, volumetricParameters: any[]): void {
    volumetricParameters.forEach(({ asphaltContent, values }) => {
      graphics.rbv.push([asphaltContent, values.ratioBitumenVoid * 100]);
      graphics.vv.push([asphaltContent, values.volumeVoids * 100]);
      graphics.sg.push([asphaltContent, values.maxSpecificGravity]);
      graphics.gmb.push([asphaltContent, values.apparentBulkSpecificGravity]);
      graphics.stability.push([asphaltContent, values.stability]);
      graphics.vam.push([asphaltContent, values.aggregateVolumeVoids * 100]);
    });
  }
}
