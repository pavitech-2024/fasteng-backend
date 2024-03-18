export function calculateInverseMatrix(listaDeX: number[], n: number): number[][] {
  let matriz: number[][] = [];

  for (let i = 0; i <= n; i++) {
    let parcial: number[] = [];
    for (let j = 0; j <= n; j++) {
      let tmp = 0;
      for (let k = 0; k < listaDeX.length; k++) {
        tmp += listaDeX[k] ** (i + j);
      }
      parcial.push(tmp);
    }
    let aux: number[] = [];
    for (let a = 0; a <= n; a++) {
      if (a === i) {
        aux.push(1);
      } else {
        aux.push(0);
      }
    }
    let novaParcial = [...parcial, ...aux];
    matriz.push(novaParcial);
  }

  for (let i = 0; i < matriz.length; i++) {
    let aux = matriz[i][i];
    for (let j = i; j < matriz[i].length; j++) {
      matriz[i][j] = matriz[i][j] / aux;
    }
    for (let j = 0; j < matriz.length; j++) {
      if (j !== i) {
        let proporcao = matriz[j][i];
        for (let k = i; k < matriz[i].length; k++) {
          matriz[j][k] -= matriz[i][k] * proporcao;
        }
      }
    }
  }

  let result: number[][] = [];
  for (let i = 0; i <= n; i++) {
    let partial: number[] = [];
    for (let j = 1; j <= n + 1; j++) {
      partial.push(matriz[i][j + n]);
    }
    result.push(partial);
  }

  return result;
}

export function regression(listaDeX: number[], listaDeY: number[], n: number): number[] {
  const matrizInversa = calculateInverseMatrix(listaDeX, n);
  let matriz2: number[] = [];

  for (let i = 0; i <= n; i++) {
    let aux = 0;
    for (let j = 0; j < listaDeX.length; j++) {
      aux += listaDeY[j] * (listaDeX[j] ** i);
    }
    matriz2.push(aux);
  }

  const resultado: number[] = [];

  for (let i = 0; i < matriz2.length; i++) {
    let parcial = 0;
    for (let j = 0; j < matriz2.length; j++) {
      parcial += matrizInversa[i][j] * matriz2[j];
    }
    resultado.push(parcial);
  }

  return resultado;
}