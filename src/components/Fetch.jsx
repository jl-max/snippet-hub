import { useFetch } from "../hooks/useFetch";

function Fetch({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
  filter,
}) {
  const { loading, data, error } = useFetch(uri);

  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) {
    const filtered = filter ? filter(data) : data;
    console.log("filtered notes: ", filtered);
    return renderSuccess({ data: filtered });
  }
}

export default Fetch;
