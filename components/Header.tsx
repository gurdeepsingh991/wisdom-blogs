import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();

    const goHome = () => {
        if (router.pathname === '/') {
            window.location.href = '/';
        } else {
            router.push('/');
        }
    };

    return (
        <header className="bg-white border-b shadow-sm px-6 py-4 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
                <span onClick={goHome} className="cursor-pointer text-2xl font-bold text-blue-600" >
                    Wisdom Blogs
                </span>
            </div>
        </header>
    );
}
