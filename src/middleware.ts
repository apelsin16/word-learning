import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/auth/login", // сторінка для редиректу, якщо користувач неавторизований
    },
});

export const config = {
    matcher: ["/topics/:path*", "/profile"], // захищені маршрути
};

console.log("Middleware працює!");