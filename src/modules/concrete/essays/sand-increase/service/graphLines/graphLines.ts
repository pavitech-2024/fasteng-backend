import { regression } from "../../../../../../utils/leastSquaresRegression";

export function graphLines(listaDeX: number[], listaDeY: number[]): any {
  console.log('Lista X>', listaDeX, 'Lista Y>', listaDeY);
  const coeficiente = regression(listaDeX, listaDeY, 3);
  console.log('coeficiente->', coeficiente);

  const a = coeficiente[3] * 3;
  const b = coeficiente[2] * 2;
  const c = coeficiente[1];

  const PontosDaCurva = listaDeX.map(value => {
    const y = (value ** 3) * coeficiente[3] + (value ** 2) * coeficiente[2] + value * coeficiente[1] + coeficiente[0];
    return [value, y];
  });

  const raiz1 = (-1 * b + Math.sqrt((b ** 2) - 4 * a * c)) / (2 * a);
  const raiz2 = (-1 * b - Math.sqrt((b ** 2) - 4 * a * c)) / (2 * a);

  const yDaRaiz1 = coeficiente[3] * raiz1 ** 3 + coeficiente[2] * raiz1 ** 2 + raiz1 * coeficiente[1] + coeficiente[0];
  const yDaRaiz2 = coeficiente[3] * raiz2 ** 3 + coeficiente[2] * raiz2 ** 2 + raiz2 * coeficiente[1] + coeficiente[0];

  const segundaDerivadaDaRaiz1 = 2 * a * raiz1 + b;
  const segundaDerivadaDaRaiz2 = 2 * a * raiz2 + b;

  let pontoMaximo;

  if (raiz1 > listaDeX[listaDeX.length - 1]) {
    pontoMaximo = [raiz2, yDaRaiz2];
  } else if (raiz2 > listaDeX[listaDeX.length - 1]) {
    pontoMaximo = [raiz1, yDaRaiz1];
  } else if (segundaDerivadaDaRaiz1 < segundaDerivadaDaRaiz2) {
    pontoMaximo = [raiz1, yDaRaiz1];
  } else {
    pontoMaximo = [raiz2, yDaRaiz2];
  }

  const retaR = pontoMaximo[1];
  const PontosDaRetaR = [[0, retaR], [pontoMaximo[0], retaR], [listaDeX[listaDeX.length - 1], retaR]];

  console.log('reta R:', PontosDaRetaR);

  const inclinacaoRetaS = (pontoMaximo[1] - listaDeY[0]) / (pontoMaximo[0] - listaDeX[0]);
  const retaS = [inclinacaoRetaS, listaDeY[0]];
  const PontosDaRetaS = [[listaDeX[0], listaDeY[0]], pontoMaximo];

  const novaRaiz1 = (-1 * coeficiente[2] + Math.sqrt((coeficiente[2] ** 2) - 4 * coeficiente[3] * (coeficiente[1] - inclinacaoRetaS))) / (2 * coeficiente[3]);
  const novaRaiz2 = (-1 * coeficiente[2] - Math.sqrt((coeficiente[2] ** 2) - 4 * coeficiente[3] * (coeficiente[1] - inclinacaoRetaS))) / (2 * coeficiente[3]);

  const yDaNovaRaiz1 = coeficiente[3] * novaRaiz1 ** 3 + coeficiente[2] * novaRaiz1 ** 2 + novaRaiz1 * coeficiente[1] + coeficiente[0];
  const yDaNovaRaiz2 = coeficiente[3] * novaRaiz2 ** 3 + coeficiente[2] * novaRaiz2 ** 2 + novaRaiz2 * coeficiente[1] + coeficiente[0];

  const segundaDerivadaDaNovaRaiz1 = 2 * a * novaRaiz1 + b;
  const segundaDerivadaDaNovaRaiz2 = 2 * a * novaRaiz2 + b;

  let pontoTangente;

  if (segundaDerivadaDaNovaRaiz1 < segundaDerivadaDaNovaRaiz2) {
    pontoTangente = [novaRaiz1, yDaNovaRaiz1];
  } else {
    pontoTangente = [novaRaiz2, yDaNovaRaiz2];
  }

  const retaT = [inclinacaoRetaS, (-1 * pontoTangente[0] * inclinacaoRetaS + pontoTangente[1])];
  console.log('reta T:', retaT);

  const PontosDaRetaT = [[0, retaT[1]], pontoTangente];

  const retaU = (pontoMaximo[1] - retaT[1]) / retaT[0];
  const yDoPontoB = coeficiente[2] * retaU ** 2 + retaU * coeficiente[1] + coeficiente[0];
  const PontosDaRetaU = [[retaU, 0], [retaU, yDoPontoB], [retaU, retaR]];
  console.log('reta U:', PontosDaRetaU);


  const coeficienteDeInchamento = (pontoMaximo[1] + yDoPontoB) / 2;
  console.log('coeficiente de inchamento: ', coeficienteDeInchamento);

  const graphLinesResult = {
    averageCoefficient: coeficienteDeInchamento,
    curve: PontosDaCurva,
    criticalHumidity: retaU,
    retaR: PontosDaRetaR,
    retaS: PontosDaRetaS,
    retaT: PontosDaRetaT,
    retaU: PontosDaRetaU,
  };

  return graphLinesResult;
}