import { Data } from '../entities/data';
import { DataRepository } from '../repositories/DataRepository';

export class DataServiceImpl {
  dataRepo: DataRepository;

  constructor(ir: DataRepository) {
    this.dataRepo = ir;
  }

  async GetData(): Promise<Data[]> {
    return this.dataRepo.GetData();
  }
}
