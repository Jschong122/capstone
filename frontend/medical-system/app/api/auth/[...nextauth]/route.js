import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
          const response = await axios.post(
            "http://localhost:5000/users/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          // if the user's credentials are valid, then return the user's information
          if (response.status === 201) {
            console.log("Authentication successful:", response.status);
            return response.data.user;
          } else if (response.status === 200) {
            console.log("Authentication successful:", response.status);
            return response.data.user;
          } else {
            console.log("Authentication failed:", response.status);
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  // if user is not null, then add the user's information to the token
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    // using JWT to store the user's information , create a session object
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
