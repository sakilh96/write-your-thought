import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import UserModel from "lib/models/user.model";
// import mongoConnect from "pages/common/mongoose";
import mongoConnect from 'pages/mongoose';

const authOptions = {
  session: {
    strategy: 'jwt',
    // maxAge: ({ session, token, user }) => {
    //  console.log('session up',session);
    //   // const rememberMe = session && session.rememberMe;
    //   // return rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; 
    // }
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password, rememberMe } = credentials;
        console.log('rememberMe',rememberMe);
        mongoConnect();
     

        const logUser = await UserModel.findOne({ email });
     

        if (!logUser) {
          throw new Error('Invalid Email or Password');
        }

        const isPasswordMatched = await bcrypt.compare(password, logUser.password);
        

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password');
        }

        return {...logUser, rememberMe};
      }
    })
  ],
  pages: {
    signIn: '../../../pages/admin/index.js',
    signOut: '../../../pages/admin/index.js'
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      // console.log('sessionsession',session);
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
