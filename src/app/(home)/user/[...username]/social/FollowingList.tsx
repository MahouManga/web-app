import Link from 'next/link';

export default function FollowingList({ following }: any) {
    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Following</h3>
            <ul className="grid grid-cols-2 gap-4">
                {following.map(({ following }: any) => (
                    <li key={following.id}>
                        <Link href={`/user/${following.username}`}>
                            <div className="shadow-lg p-4 transition-transform transform hover:scale-105 bg-base-100 hover:bg-base-200">
                                <div className="flex items-center">
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={following.image || "/noImage.jpg"} alt={following.name} />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <span className="text-lg font-semibold text-gray-700 hover:text-primary">
                                            {following.name}
                                        </span>
                                        <p className="text-sm text-gray-500">@{following.username}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}