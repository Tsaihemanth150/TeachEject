// pages/resetemail.js
import { useRouter } from 'next/router';
import { useState } from 'react';

const ResetEmailPage = () => {
    const router = useRouter();
    const { token } = router.query; // Retrieve token from URL query parameters

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [error, setError] = useState('');

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match. Please try again.");
            return;
        }

        try {
            const response = await fetch('/api/auth/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword })
            });

            if (response.ok) {
                setResetSuccess(true);

                setTimeout(() => {
                    router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
                  }, 5000);
            } else {
                setError('Error resetting password. Please try again.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md">
                {resetSuccess ? (
                    <p className="text-green-600">Password successfully reset!</p>
                ) : (
                    <>
                        <h2 className="text-2xl mb-4">Reset Your Password</h2>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            required
                            className="mb-2 px-4 py-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                            className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
                        />
                        <button
                            onClick={resetPassword}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full"
                        >
                            Reset Password
                        </button>
                        {error && <p className="text-red-600 mt-2">{error}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResetEmailPage;
