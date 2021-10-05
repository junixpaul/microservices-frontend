import { Data } from '../../domain/entities/data';
import { User } from '../../domain/entities/user';
import { DataRepository } from '../../domain/repositories/DataRepository';
import { DataRepository } from '../../domain/repositories/DataRepository';
import { request } from 'ice';

// class DataDTO {
//   id = 0;
//   name = '';
//   price = 0;
//   quantity = 0;
// }

export class DataRepositoryImpl implements DataRepository {
  async GetData(): Promise<Data[]> {
    const data = await request({
      url: 'https://localhost:3000/api/users/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      data: { user: {
        firstname: 'Robbie',
        lastname: 'Heygate',
        email: 'test@gmail.com',
        password: '123456',
      } },

    });
      // const { data, error, loading } = useRequest(() => ({
      //   url: 'https://localhost:3000/api/products',
      //   method: 'get',
      // }));
    console.log('=========================');
    console.log(data);
    console.log('=========================');
    // return data.rows.map((item: DataDTO) => new Data(item._id, item.name, item.price, item.quantity));
    // } catch (e) {
    //   console.log('ERRRRRRRR');
    //   console.log(e);
    //   console.log('ERRRRRRRR');
    // }
    // const data = await request('https://localhost:3000/api/products');
    // return data.rows.map((item: DataDTO) => new Data(item._id, item.name, item.price, item.quantity));
  }
}
