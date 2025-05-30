export class CharacterStats {
  knowledge: number;
  charisma: number;
  dexterity: number;
  administration: number;
  martial: number;

  constructor(
    knowledge: number,
    charisma: number,
    dexterity: number,
    administration: number,
    martial: number
  ) {
    this.knowledge = knowledge;
    this.charisma = charisma;
    this.dexterity = dexterity;
    this.administration = administration;
    this.martial = martial;
  }
}
