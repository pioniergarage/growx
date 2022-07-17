import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ApiError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string,
    password: string,
};

enum State {
    SIGN_IN, SIGN_UP
}

export default function Auth() {
    const router = useRouter()

    const [state, setState] = useState<State>(State.SIGN_IN)
    function toggleState() {
        if (state === State.SIGN_IN) setState(State.SIGN_UP)
        else setState(State.SIGN_IN)
    }

    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>();
    const [authError, setAuthError] = useState<ApiError | null>()
    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        let error;
        if (state === State.SIGN_IN) {
            const { error: e } = await supabaseClient.auth.signIn({ email, password })
            error = e;
        } else {
            const { error: e } = await supabaseClient.auth.signUp({ email, password })
            error = e;
        }
        setAuthError(error)
        if (!error) {
            // wait for the cookie. There's probably a better solution
            setTimeout(() => router.replace({ pathname: '/growconnect/app/' }), 500)
        }
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-columns-1 gap-4">
                <label htmlFor="email">Email address</label>
                <input id="email" {...register("email", { required: true })} />
                <label htmlFor="email">Password</label>
                <input id="password" type='password' {...register("password", { required: true })} />
                <button className="btn btn-primary mt-4">{state === State.SIGN_IN ? 'Sign in' : 'Sign up'}</button>
                <div className="flex flex-col items-center">
                    <div>
                        <button
                            onClick={toggleState}
                            className="link link-secondary"
                        >
                            {state === State.SIGN_IN ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </button>
                    </div>
                    <div className="text-error">{authError?.message}</div>
                </div>
            </form>
        </div>
    );
}