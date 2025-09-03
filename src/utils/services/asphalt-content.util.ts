export class AsphaltContentUtil {
  static getAsphaltContentValues(key: string, binderTrial: number): { 
    maxSpecificGravity: any; 
    asphaltContent: number 
  } {
    switch (key) {
      case 'lessOne':
        return { maxSpecificGravity: 'results.lessOne', asphaltContent: binderTrial - 1 };
      case 'lessHalf':
        return { maxSpecificGravity: 'results.lessHalf', asphaltContent: binderTrial - 0.5 };
      case 'normal':
        return { maxSpecificGravity: 'results.normal', asphaltContent: binderTrial };
      case 'plusHalf':
        return { maxSpecificGravity: 'results.plusHalf', asphaltContent: binderTrial + 0.5 };
      case 'plusOne':
        return { maxSpecificGravity: 'results.plusOne', asphaltContent: binderTrial + 1 };
      default:
        throw new Error('Invalid asphalt content key');
    }
  }

  static getMaxSpecificGravity(maxSpecificGravity: any, key: string): number {
    const path = this.getAsphaltContentValues(key, 0).maxSpecificGravity;
    return path.split('.').reduce((obj, prop) => obj?.[prop], maxSpecificGravity);
  }
}