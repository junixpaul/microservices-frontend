import { Data } from '../entities/data';

export interface DataRepository {
  GetData: () => Promise<Data[]>;
}
