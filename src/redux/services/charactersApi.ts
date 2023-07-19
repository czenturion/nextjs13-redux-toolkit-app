import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CharacterType = {
    id: number;
    name: string;
    status: CharacterStatusType;
    species: string;
    type: string;
    gender: CharacterGenderType;
    origin: ExtraDataType;
    location: ExtraDataType;
    image: string;
    episode: string[];
    url: string;
    created: string;
};

type CharacterStatusType = "Alive" | "Dead" | "unknown";

type CharacterGenderType = "Female" | "Male" | "Genderless" | "unknown";

type ExtraDataType = {
    name: string;
    url: string;
};

type ParamsType = {
    page: number;
};

export const charactersApi = createApi({
    reducerPath: "character",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_RICK_API_URL,
    }),
    endpoints: (builder) => ({
        getCharacters: builder.query<CharacterType[], ParamsType>({
            query: () => "/character",
        }),
    }),
});

export const {
    useGetCharactersQuery,
} = charactersApi;