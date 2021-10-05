import { useGetDataByNameQuery } from '../../services/dataServices'

export const Data = ({ name, pollingInterval }: { name: string; pollingInterval: number }) => {
  const { data, error, isLoading, isFetching } = useGetDataByNameQuery(name, { pollingInterval });
  return (
    <div>
      { error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>
            {data.species.name} {isFetching ? '...' : ''}
          </h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
};
