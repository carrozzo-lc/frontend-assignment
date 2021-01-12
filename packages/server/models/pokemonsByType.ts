import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection } from "../types";

interface Pokemon {
  id: string;
  name: string;
  types: string[];
}

const SIZE = 10;

export function query(args: {
  after?: string;
  limit?: number;
  type?: string;
}): Connection<Pokemon> {
  const { after, type, limit = SIZE } = args;

  const filterByType: (as: Pokemon[]) => Pokemon[] =
    // filter only if type is defined
    type === undefined
      ? identity
      : A.filter(p => p.types.map(item => item.toLowerCase()).includes(type.toLowerCase()));

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if type is defined
    after === undefined
      ? identity
      : as =>
          pipe(
            as,
            A.findIndex(a => a.id === after),
            O.map(a => a + 1),
            O.fold(() => as, idx => as.slice(idx))
          );

  const results: Pokemon[] = pipe(
    data,
    filterByType,
    sliceByAfter,
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}
