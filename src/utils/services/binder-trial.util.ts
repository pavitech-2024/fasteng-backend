import { PercentsMap } from "modules/asphalt/dosages/marshall/types/marshall.types";
import { TrialItem } from "modules/asphalt/dosages/marshall/types/marshall.types";
export class BinderTrialUtil {
  static normalizePercents(percentsList: PercentsMap[]): { _id: string; value: number }[] {
    const modifiedPercents: { _id: string; value: number }[] = [];
    const ids = new Set<string>();

    const first = percentsList[0] ?? {};
    Object.keys(first).forEach((key) => {
      const id = key.split('_')[1];
      if (!id) return;
      ids.add(id);
      const value = Number(first[key] ?? 0);
      const index = Array.from(ids).indexOf(id);
      modifiedPercents[index] = { _id: id, value };
    });

    return modifiedPercents;
  }

  static calculateTrialValues(
    modifiedPercents: { _id: string; value: number }[],
    newPercent: number,
    trial: number
  ): {
    percentOfDosageToReturn: TrialItem[][];
    newPercentOfDosage: number[][];
  } {
    const onePlus: TrialItem[] = [];
    const halfPlus: TrialItem[] = [];
    const oneLess: TrialItem[] = [];
    const halfLess: TrialItem[] = [];
    const percentOfDosageToReturn: TrialItem[][] = [];
    const newPercentOfDosage: number[][] = [];

    for (let i = 0; i < modifiedPercents.length; i++) {
      const item = modifiedPercents[i];
      
      onePlus.push({ material: item._id, value: ((newPercent - 1) * item.value) / 100, trial: 'onePlus' });
      halfPlus.push({ material: item._id, value: ((newPercent - 0.5) * item.value) / 100, trial: 'halfPlus' });
      const normal = { material: item._id, value: (newPercent * item.value) / 100, trial: 'normal' } as const;
      halfLess.push({ material: item._id, value: ((newPercent + 0.5) * item.value) / 100, trial: 'halfLess' });
      oneLess.push({ material: item._id, value: ((newPercent + 1) * item.value) / 100, trial: 'oneLess' });

      newPercentOfDosage.push([
        onePlus[i].value,
        halfPlus[i].value,
        normal.value,
        halfLess[i].value,
        oneLess[i].value,
      ]);

      percentOfDosageToReturn.push([oneLess[i], halfLess[i], normal as TrialItem, halfPlus[i], onePlus[i]]);
    }

    // Adiciona linha do binder
    percentOfDosageToReturn.push([
      { trial: 'oneLess', value: trial - 1, material: 'binder' },
      { trial: 'halfLess', value: trial - 0.5, material: 'binder' },
      { trial: 'normal', value: trial, material: 'binder' },
      { trial: 'halfPlus', value: trial + 0.5, material: 'binder' },
      { trial: 'onePlus', value: trial + 1, material: 'binder' },
    ]);

    return { percentOfDosageToReturn, newPercentOfDosage };
  }
}