import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      //verify the user's credentials

      async authorize(credentials) {
        try {
          console.log("Attempting to authenticate with:", credentials);
          const response = await axios.post(
            "http://localhost:5000/users/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          console.log("Authentication response:", response.data);

          if (response.status === 200 && response.data.user) {
            console.log("Authentication successful:", response.data.user);
            return response.data.user;
          } else if (response.status === 400) {
            console.log("Authentication failed:", error.message);
            return null;
          } else {
            console.log(
              "Authentication failed:",
              response.status,
              response.data
            );
            return null;
          }
        } catch (error) {
          console.error(
            "Authentication error:",
            error.response.data,
            error.message
          );
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  // if user is not null, then add the user's information to the token
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.imageUrl = user.imageUrl;
      }
      return token;
    },
    // using JWT to store the user's information , create a session object
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.imageUrl = token.imageUrl;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
