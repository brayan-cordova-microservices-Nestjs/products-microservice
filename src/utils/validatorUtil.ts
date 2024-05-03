export class ValidatorUtil {
  static isUpdateDtoEmpty(updateDto: any): boolean {
    return Object.values(updateDto).every(
      (value) => value === null || value === '',
    );
  }
}
