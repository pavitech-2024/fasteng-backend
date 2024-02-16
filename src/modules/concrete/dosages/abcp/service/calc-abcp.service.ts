import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "../../../../../modules/concrete/materials/repository";
import { ConcreteGranulometryRepository } from "../../../../../modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "../../../../../modules/concrete/essays/unitMass/repository";
import { Calc_ABCP_Dto, Calc_ABCP_Out } from "../dto/abcp-calculate-results.dto";
import { Material } from "../../../../../modules/concrete/materials/schemas";

@Injectable()
export class Calculate_ABCP_Results_Service {
  private logger = new Logger(Calculate_ABCP_Results_Service.name)

  constructor(
      private readonly material_repository: MaterialsRepository,
      private readonly granulometry_repository: ConcreteGranulometryRepository,
      private readonly unit_mass_repository: UnitMassRepository,
  ) { }

  async calculateAbcpDosage({ materialSelectionData, essaySelectionData, insertParamsData }: Calc_ABCP_Dto): Promise <{ success: boolean; result: Calc_ABCP_Out }> {
    try {
      this.logger.log('calculate abcp on calc.abcp.service.ts > [body]');

      const { fck, condition, reduction } = insertParamsData;
      const { fineAggregate, coarseAggregate, cement } = essaySelectionData;

      const fcj = fck + (1.65 * condition);
      const cementData: Material = await this.material_repository.findById(materialSelectionData.cement.id);
      const cementResistance = parseInt(cementData.description.resistance.replace(/\D/g, ''), 10);
      const acResults = await this.calculateAc(fcj, cementResistance);
      const ac = Number(acResults.XacPoint);

      // Calculando o Consumo de Água
      const coarseAggregateGranulometry: any = await this.granulometry_repository.findById(coarseAggregate.granulometry_id);
      const maxDiameter: number = coarseAggregateGranulometry.results.nominal_diameter;
      const ca = await this.calculateCa(reduction, maxDiameter);

      // Calculando o Consumo de Cimento
      const cc = this.calculateCC(ca, ac);


      // Calculando o Consumo de Brita
      const fineAggregateGranulometry: any = await this.granulometry_repository.findById(fineAggregate.granulometry_id);
      const finenessModule: number = fineAggregateGranulometry.results.fineness_module;
      const coarseAggregateUnitMass: any = await this.unit_mass_repository.findById(coarseAggregate.unitMass_id);
      const unitMass: number = coarseAggregateUnitMass.result.result;
      const cb = this.calculateCb(maxDiameter, finenessModule, unitMass);

      // Calculando o Volume da Areia e o Consumo da Areia
      const SPCement = cement.specificMass
      const SPBrita = coarseAggregate.specificMass;
      const SPAreia = fineAggregate.specificMass;
      const careia = this.calculateCareia(cc, SPCement, cb, SPBrita, ca, SPAreia);

      return {
        success: true,
        result: {
          fcj,
          ac,
          ca,
          cc,
          cb,
          careia,
          Xvalues: acResults.Xvalues,
          Yvalues: acResults.Yvalues,
          formula: acResults.formula,
          resistanceCurve: acResults.resistanceCurve
        }
      }
    } catch (error) {
      return {
        success: false,
        result: null
      };
    }
  }

  calculateAc(fcj: number, cementResistance: number): any {

    const results: any = {
      formula: '',
      resistanceCurve: '',
      Xvalues: [],
      Yvalues: [],
    }

    // Equações de modelo para as curvas de resistência
    const calculeY29 = (Xvalue) => (-39.057239 * Math.pow(Xvalue, 3) + 139.047619 * Math.pow(Xvalue, 2) - 175.789803 * Xvalue + 82.385137);
    const calculeX29 = (Yvalue) => (-0.000017 * Math.pow(Yvalue, 3) + 0.001569 * Math.pow(Yvalue, 2) - 0.060017 * Yvalue + 1.283818);

    // Equação Modelo para a curva de Resistência 32: F(x) = -48.4848 x³ + 163.3766 x² - 199.9913 x + 92.1169
    const calculeY32 = (Xvalue) => ( (-48.4848 * Math.pow(Xvalue,3)) + (163.3766 * Math.pow(Xvalue, 2)) - (199.9913 * Xvalue) + (92.1169) )
    const calculeX32 = (Yvalue) => ( (- 0.000013 * Math.pow(Yvalue, 3)) + (0.001282 * Math.pow(Yvalue, 2)) - (0.054276 * Yvalue) + (1.283624) )

    // Equação Modelo para a curva de Resistência 35: F(x) = -90.9091 x³ + 246.7965 x² - 258.1255 x + 108.0234
    const calculeY35 = (Xvalue) => ( (-90.9091 * Math.pow(Xvalue,3)) + (246.7965 * Math.pow(Xvalue, 2)) - (258.1255 * Xvalue) + (108.0234) )
    const calculeX35 = (Yvalue) => ( (- 0.000007 * Math.pow(Yvalue, 3)) + (0.000886 * Math.pow(Yvalue, 2)) - (0.045340 * Yvalue) + (1.253431) )

    // Equação Modelo para a curva de Resistência 38: F(x) = -93.6027 x³ + 259.5671 x² - 276.0950 x + 116.7241
    const calculeY38 = (Xvalue) => ( (-93.6027 * Math.pow(Xvalue,3)) + (259.5671 * Math.pow(Xvalue, 2)) - (276.0950 * Xvalue) + (116.7241) )
    const calculeX38 = (Yvalue) => ( (- 0.00006 * Math.pow(Yvalue, 3)) + (0.000780 * Math.pow(Yvalue, 2)) - (0.042478 * Yvalue) + (1.259052) )

    // Equação Modelo para a curva de Resistência 41: F(x) = -113.804714 x³ + 306.147186 x² - 314.910293 x + 129.493362
    const calculeY41 = (Xvalue) => ( (-113.804714 * Math.pow(Xvalue,3)) + (306.147186 * Math.pow(Xvalue, 2)) - (314.910293 * Xvalue) + (129.493362) )
    const calculeX41 = (Yvalue) => ( (- 0.000005 * Math.pow(Yvalue, 3)) + (0.000688 * Math.pow(Yvalue, 2)) - (0.040190 * Yvalue) + (1.269374) )

    // Equação Modelo para a curva de Resistência 44: F(x) = -120.538721 x³ + 325.887446 x² - 336.460558 x + 138.666811
    const calculeY44 = (Xvalue) => ( (-120.538721 * Math.pow(Xvalue,3)) + (325.887446 * Math.pow(Xvalue, 2)) - (336.460558 * Xvalue) + (138.666811) )
    const calculeX44 = (Yvalue) => ( (- 0.000004 * Math.pow(Yvalue, 3)) + (0.000610 * Math.pow(Yvalue, 2)) - (0.037866 * Yvalue) + (1.273467) )

    // Equação Modelo para a curva de Resistência 47: F(x) = -144.10774 x³ + 376.580087 x² - 376.641895 x + 151.534921
    const calculeY47 = (Xvalue) => ( (-144.107744 * Math.pow(Xvalue,3)) + (376.580087 * Math.pow(Xvalue, 2)) - (376.641895 * Xvalue) + (151.534921) )
    const calculeX47 = (Yvalue) => ( (- 0.000003 * Math.pow(Yvalue, 3)) + (0.000515 * Math.pow(Yvalue, 2)) - (0.034830 * Yvalue) + (1.267624) )

    // Equação Modelo para a curva de Resistência 50: F(x) = -100.336700 x³ + 303.376623 x² - 342.528379 x + 149.839105
    const calculeY50 = (Xvalue) => ( (-100.336700 * Math.pow(Xvalue,3)) + (303.376623 * Math.pow(Xvalue, 2)) - (342.528379 * Xvalue) + (149.839105) )
    const calculeX50 = (Yvalue) => ( (- 0.000003 * Math.pow(Yvalue, 3)) + (0.000532 * Math.pow(Yvalue, 2)) - (0.035294 * Yvalue) + (1.293287) )

    //Loop responsável por inserir 40 pontos para o grafico
    for(let i = 0.4; i < 0.81; i = i + 0.05){
      results.Xvalues.push(i.toFixed(3));
      switch(cementResistance){
        case 29: results.Yvalues.push(calculeY29(i).toFixed(3));
        break;
        case 32: results.Yvalues.push(calculeY32(i).toFixed(3));
        break;
        case 35: results.Yvalues.push(calculeY35(i).toFixed(3));
        break;
        case 38: results.Yvalues.push(calculeY38(i).toFixed(3));
        break;
        case 41: results.Yvalues.push(calculeY41(i).toFixed(3));
        break;
        case 44: results.Yvalues.push(calculeY44(i).toFixed(3));
        break;
        case 47: results.Yvalues.push(calculeY47(i).toFixed(3));
        break;
        case 50: results.Yvalues.push(calculeY50(i).toFixed(3));
      }
    }

    let XacPoint;
    switch(cementResistance){
      case 29: XacPoint = calculeX29(fcj).toFixed(3);
      results.formula = 'F(x) = -39.057239 x³ + 139.047619 x² - 175.789803 x + 82.385137'
      results.resistanceCurve = '29 MPa'
      break;
      case 32: XacPoint = calculeX32(fcj).toFixed(3);
      results.formula = 'F(x) = -48.4848 x³ + 163.3766 x² - 199.9913 x + 92.1169'
      results.resistanceCurve = '32 MPa'
      break;
      case 35: XacPoint = calculeX35(fcj).toFixed(3);
      results.formula = 'F(x) = -90.9091 x³ + 246.7965 x² - 258.1255 x + 108.0234'
      results.resistanceCurve = '35 MPa'
      break;
      case 38: XacPoint = calculeX38(fcj).toFixed(3);
      results.formula = 'F(x) = -93.6027 x³ + 259.5671 x² - 276.0950 x + 116.7241'
      results.resistanceCurve = '38 MPa'
      break;
      case 41: XacPoint = calculeX41(fcj).toFixed(3);
      results.formula = 'F(x) = -113.804714 x³ + 306.147186 x² - 314.910293 x + 129.493362'
      results.resistanceCurve = '41 MPa'
      break;
      case 44: XacPoint = calculeX44(fcj).toFixed(3);
      results.formula = 'F(x) = -120.538721 x³ + 325.887446 x² - 336.460558 x + 138.666811'
      results.resistanceCurve = '44 MPa'
      break;
      case 47: XacPoint = calculeX47(fcj).toFixed(3);
      results.formula = 'F(x) = -144.10774 x³ + 376.580087 x² - 376.641895 x + 151.534921'
      results.resistanceCurve = '47 MPa'
      break;
      case 50: XacPoint = calculeX50(fcj).toFixed(3);
      results.formula = 'F(x) = -100.336700 x³ + 303.376623 x² - 342.528379 x + 149.839105'
      results.resistanceCurve = '50 MPa'
      break;
    }

    let ready = false;
    // Introduz o ponto para achar o A/c para o gráfico
    results.Xvalues.forEach((elem, index) => {
      if (XacPoint >= elem && XacPoint <= results.Xvalues[index + 1] && !ready) {
        results.Xvalues.splice(index + 1, 0, XacPoint);
        results.Yvalues.splice(index + 1, 0, fcj);
        ready = true;
      }
    });

    results.XacPoint = XacPoint;

    return results;
  }

  // método para calcular o consumo de água aproximado ( CA ) em L/m³
  calculateCa(reduction: number, maxDiameter: number): number {
    let initalValue = 0;

    switch(maxDiameter){
        case 9.5:
            initalValue = 220;
            break;
        case 19.5:
            initalValue = 195;
            break;
        case 25:
            initalValue = 190;
            break;
        case 32:
            initalValue = 185;
            break;
        case 37.5:
            initalValue = 180;
            break;
    }

    if(reduction < 60) var group = 1;
    if(reduction >= 60 && reduction < 80) var group = 2;
    if(reduction >= 80) var group = 3;

    let change = (group - 1) * 5;

    return initalValue + change;
  }

  calculateCC(ca: number, ac: number): number {
    const cc = Number((ca / ac).toFixed(3));

    return cc;
  }

  calculateCb(maxDiameter: number, finenessModule: number, unitMass: number): number {
    let initalValue = 0;
    switch(maxDiameter){
      case 9.5:
        initalValue = 0.645;
        break;
      case 19.5:
        initalValue = 0.770;
        break;
      case 25:
        initalValue = 0.975;
        break;
      case 32:
        initalValue = 0.820;
        break;
      case 37.5:
        initalValue = 0.845;
        break;
    }

    let group = 0;
    if(finenessModule < 1.99)  group = 0;
    else if(finenessModule < 2.19)  group = 1;
    else if(finenessModule < 2.39)  group = 2;
    else if(finenessModule < 2.59)  group = 3;
    else if(finenessModule < 2.79)  group = 4;
    else if(finenessModule < 2.99)  group = 5;
    else if(finenessModule < 3.19)  group = 6;
    else if(finenessModule < 3.39)  group = 7;
    else if(finenessModule < 3.61)  group = 8;

    console.log('AQUI',finenessModule, group)

    let britaVolume = initalValue - (group * 0.02)
    return Number(((unitMass) * britaVolume).toFixed(3));
  }

  calculateCareia(
    cc: number, 
    SPCement: number, 
    cb: number, 
    SPBrita: number, 
    ca: number, 
    SPAreia: number
  ): number {
    let Vareia = Number((1 - ( (cc / SPCement) + (cb / SPBrita) + (ca / 1000) )).toFixed(3));
    return Vareia * SPAreia;
  }
}