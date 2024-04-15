import Link from "next/link";

const NotFound = () => {
    return (
        <div>
            <h2>Lỗi</h2>
            <p>Xin lỗi, mình không thể tìm thấy trang bạn cần :(</p>
            <Link href="/">Quay lại trang chủ</Link>
        </div>
    );
}

export default NotFound;