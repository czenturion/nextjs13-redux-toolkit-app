"use client";

import { useGetCharactersQuery } from "@/redux/services/charactersApi";
import {decrement, decrementByAmount, increment, incrementByAmount, reset} from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {useEffect} from "react";

export default function Home() {
    const count = useAppSelector((state) => state.counterReducer.value);
    const dispatch = useAppDispatch();

    const { isLoading, isFetching, data, error } = useGetCharactersQuery({page: 1});

    return (
        <main
            style={{
                maxWidth: 800,
                marginInline: "auto",
                padding: 20,
                height: "100vh",
            }}
        >
            <div
                style={{
                    marginBottom: "4rem",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                }}
            >
                <h4
                    style={{marginBottom: 16}}
                >
                    {count}
                </h4>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "250px",
                    }}
                >
                    <button onClick={() => dispatch(increment())}>increment</button>
                    <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
                    <button onClick={() => dispatch(decrement())}>decrement</button>
                    <button onClick={() => dispatch(decrementByAmount(5))}>-5</button>
                    <button onClick={() => dispatch(reset())}>reset</button>
                </div>
                </div>
            </div>
            {
                error ? (
                    <p>Oh no, there was an error</p>
                ) : isLoading || isFetching ? (
                    <p style={{display: "flex", justifyContent: "center"}}>Loading...</p>
                ) : data.results.length > 1 ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            gap: "20px",
                        }}
                    >
                        {
                            data.results.map((user) => (
                                <div
                                    key={user.id}
                                    style={{
                                        border: "1px solid #ccc",
                                        textAlign: "center",
                                    }}
                                >
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        style={{
                                            height: 180,
                                            width: 180
                                        }}
                                    />
                                    <h3>
                                        {user.name}
                                    </h3>
                                </div>
                                )
                            )
                        }
                    </div>
                ) : (
                    <div>
                        {
                            data.results
                            ? <div
                                    key={data.id}
                                    style={{
                                        border: "1px solid #ccc",
                                        textAlign: "center",
                                    }}
                                >
                                    <img
                                        src={`https://robohash.org/${data.id}?set=set2&size=180x180`}
                                        alt={data.name}
                                        style={{
                                            height: 180,
                                            width: 180
                                        }}
                                    />
                                    <h3>
                                        {data.name}
                                    </h3>
                                </div>
                            : null
                        }
                    </div>
                )

            }
        </main>
    )
}
