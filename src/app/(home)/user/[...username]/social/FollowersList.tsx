export default function FollowersList({ followers }) {
    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Followers</h3>
            <ul>
                {followers.map((user) => (
                    <li key={user.id} className="flex items-center mb-2">
                        <img src={user.avatar || "/noImage.jpg"} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                        <span>{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
