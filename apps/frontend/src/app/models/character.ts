export interface Character {
    id: number;
    name: string;
    imgUrl: string;
}

export interface CharacterUI extends Character {
  found: boolean;
}