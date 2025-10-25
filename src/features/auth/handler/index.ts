import { Env } from '@/config/environtment';
import { supabase } from '@/lib/supabaseClient';
// ----------------- Auth Handlers -----------------
const authHandlers = {
    async handleSignup(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${Env.NEXT_PUBLIC_APP_URL}`,
            },
        });

        if (error) {
            console.error('[AUTH] Signup error:', error);
            throw new Error(error.message);
        }

        if (!data.user?.id) {
            throw new Error('Signup successful. Please check your email for confirmation.');
        }

        return data.user;
    },

    async handleSignIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('[AUTH] Signin error:', error);
            throw new Error(error.message);
        }

        if (!data.user?.id) {
            throw new Error('Invalid credentials');
        }

        return data.user;
    },

    async handleResetPassword(email: string) {
        // We'll implement this in Part 3
    },
};

export { authHandlers };