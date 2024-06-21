import { signIn } from "next-auth/react";
import { FC } from "react";

// // Assuming providerMap is imported from wherever it's defined
// import { providerMap } from "@/auth"; // Adjust the import path as necessary

// const GoogleLoginButton: FC = () => {
//   const googleProvider = providerMap.find((provider) => provider.id === "google");

//   if (!googleProvider) {
//     return null; // Handle case where Google provider is not found
//   }

//   return (
//     <button
//       onClick={() => signIn(googleProvider.id)}
//       className="px-4 py-2 mt-4 bg-blue-500 text-white rounded w-full"
//     >
//       Đăng nhập với {googleProvider.name}
//     </button>
//   );
// };

// export default GoogleLoginButton;

interface GoogleLoginButtonProps {
  setError: (error: string | null) => void;
}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({ setError }) => {
  const handleGoogleSignIn = async () => {
    setError(null);

    const result = await signIn("google", { redirect: false });

    if (result?.error) {
      setError(getErrorMessage(result.error));
    }
  };

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "OAuthAccountNotLinked":
        return "Một tài khoản khác đã tồn tại với cùng địa chỉ email nhưng phương thức đăng nhập khác. Vui lòng đăng nhập bằng phương thức đã liên kết.";
      default:
        return "Đã xảy ra lỗi. Vui lòng thử lại.";
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="px-4 py-2 mt-4 bg-blue-500 text-white rounded w-full"
    >
      Đăng nhập với Google
    </button>
  );
};

export default GoogleLoginButton;