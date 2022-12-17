export class DalleAi {
  imgUrl: any;
  prompt: string;
  imgCount: number;
  imgSize: any;
  createdAt: Date;

  private static dalleAi: DalleAi;

  private constructor() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }

  public static getInstance() {
    if (!DalleAi.dalleAi) {
      DalleAi.dalleAi = new DalleAi();
    }

    return DalleAi.dalleAi;
  }
}
