import { atomWithStorage, createJSONStorage } from "jotai/utils";

const ACCESS_TOKEN_KEY = "access_token";

export const accessTokenAtom = atomWithStorage<string | null>(
  ACCESS_TOKEN_KEY,
  null,
  createJSONStorage(),
  { getOnInit: true },
);
