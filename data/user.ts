import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        return user;
    } catch (error) {
        console.log("[USER FETCH ERROR by E-mail]", error);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        });

        return user;
    } catch (error) {
        console.log("[USER ID FETCH ERROR]", error);
        return null;
    }
}