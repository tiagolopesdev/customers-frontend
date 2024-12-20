
type ComponentProps<T> = {
  item: T;
  key: string;
};

export const renderList = <T,>(
  elements: T[] | undefined,
  Component: React.ComponentType<ComponentProps<T>>
) => {
  return ([] as T[])
    .concat(elements ?? [])
    .map((item) => {
      return <Component item={item} key={`item-key-${Math.random()}`} />
    })
}
