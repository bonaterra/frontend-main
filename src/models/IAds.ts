export interface IAds extends Ad {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
}

export interface Ad {
  title: string;
  image?: string;
  startAt: string;
  endAt: string;
  type: AdsType;
}

export type AdsType = "STATIC" | "DYNAMIC";

