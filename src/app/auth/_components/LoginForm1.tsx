import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { FC } from "react";

interface SignInProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const LoginForm: FC<SignInProps> = ({ providers }) => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl mb-6">Đăng nhập</h1>
      {Object.values(providers || {}).map((provider) => (
        <div key={provider.name} className="mb-4">
          <button
            onClick={() => signIn(provider.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Đăng nhập với {provider.name}
          </button>
        </div>
      ))}
      <form method="post" action="/api/auth/callback/credentials" className="w-full max-w-md mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input type="email" name="email" className="w-full px-4 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu:</label>
          <input type="password" name="password" className="w-full px-4 py-2 border rounded" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default LoginForm;