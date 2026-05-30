export type FormState =
    | { status: "idle" }
    | { status: "sent"; email: string }
    | { status: "error"; error: string };

export const initialState: FormState = { status: "idle" };
