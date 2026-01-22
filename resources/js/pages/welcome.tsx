import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="VisitTrack | Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#fdfdfc] to-[#eaeaea] dark:from-[#0a0a0a] dark:to-[#161615]">
                {/* Navbar */}
                <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-bold text-[#1b1b18] dark:text-white">
                        VisitTrack
                    </h1>
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-md bg-[#1b1b18] px-5 py-2 text-white hover:bg-[#333] dark:bg-[#EDEDEC] dark:text-[#1C1C1A] dark:hover:bg-[#ccc]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-md border px-4 py-2 text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                {/* {canRegister && (
                                    <Link
                                        href={register()}
                                        className="px-5 py-2 rounded-md bg-[#f53003] text-white hover:bg-[#d22a00] dark:bg-[#FF4433] dark:hover:bg-[#cc3829]"
                                    >
                                        Register
                                    </Link>
                                )} */}
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:px-20">
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="mb-6 text-4xl font-bold text-[#1b1b18] lg:text-5xl dark:text-white">
                            Streamline Your Visitor Management
                        </h2>
                        <p className="mb-8 text-lg text-[#555] dark:text-[#ccc]">
                            Keep track of visitors efficiently, manage logs, and
                            ensure security with real-time reporting.
                        </p>
                        <div className="flex justify-center gap-4 lg:justify-start">
                            <Link
                                href={login()}
                                className="rounded-md bg-[#1b1b18] px-6 py-3 font-medium text-white hover:bg-[#333] dark:bg-[#EDEDEC] dark:text-[#1C1C1A] dark:hover:bg-[#ccc]"
                            >
                                Log in
                            </Link>
                            {/* {canRegister && (
                                <Link
                                    href={register()}
                                    className="px-6 py-3 rounded-md border border-[#f53003] text-[#f53003] font-medium hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white"
                                >
                                    Register
                                </Link>
                            )} */}
                        </div>
                    </div>

                    {/* Illustration / Image */}
                    <div className="flex-1">
                        <img
                            src="https://5.imimg.com/data5/WM/DA/ZS/ANDROID-98431635/product-jpeg.jpg"
                            alt="Visit Tracking Illustration"
                            className="mx-auto w-full max-w-lg"
                        />
                    </div>
                </main>

                {/* Features Section */}
                <section className="bg-white px-6 py-16 dark:bg-[#161615]">
                    <div className="mx-auto grid max-w-6xl gap-8 text-center lg:grid-cols-3">
                        <div className="transform rounded-xl p-6 shadow-md transition duration-300 hover:scale-105 dark:shadow-[0_0_10px_#222]">
                            <h3 className="mb-2 text-xl font-semibold text-[#1b1b18] dark:text-white">
                                Visitor Logs
                            </h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Record and manage visitor entries manually with
                                timestamps and details.
                            </p>
                        </div>

                        <div className="transform rounded-xl p-6 shadow-md transition duration-300 hover:scale-105 dark:shadow-[0_0_10px_#222]">
                            <h3 className="mb-2 text-xl font-semibold text-[#1b1b18] dark:text-white">
                                Reporting
                            </h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                View visitor logs by month and year, with
                                easy-to-read summaries.
                            </p>
                        </div>

                        <div className="transform rounded-xl p-6 shadow-md transition duration-300 hover:scale-105 dark:shadow-[0_0_10px_#222]">
                            <h3 className="mb-2 text-xl font-semibold text-[#1b1b18] dark:text-white">
                                Easy Hosting
                            </h3>
                            <p className="text-[#555] dark:text-[#ccc]">
                                Can be hosted locally or on web hosting for
                                secure and flexible access.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-4 text-center text-sm text-[#555] dark:text-[#000000]">
                    &copy; {new Date().getFullYear()} VisitTrack. All rights
                    reserved.
                </footer>
            </div>
        </>
    );
}
