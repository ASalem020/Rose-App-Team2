import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { generateProfileColor } from '../_utils/generate-profile-color.util';

export default async function UserSummary() {
  // Variables
  const session = await getServerSession(authOptions);
  const isDefaultPhoto =
    session?.user.photo ===
    'https://flower.elevateegy.com/uploads/default-profile.png';
  const userColor =
    isDefaultPhoto && session
      ? generateProfileColor(session.user._id)
      : null;

  return (
    <div className="user-summary flex items-center gap-2.5">
      <div className="user-image relative size-14 rounded-full">
        {isDefaultPhoto ? (
          <span
            className="flex h-full w-full items-center justify-center rounded-full text-lg font-bold"
            style={{
              backgroundColor:
                userColor?.background ?? undefined,
              color: userColor?.base ?? undefined,
            }}
          >
            {session?.user.firstName[0].toUpperCase()}
          </span>
        ) : (
          <Image
            src={session!.user.photo}
            alt="username profile image"
            fill
            className="rounded-full object-cover"
          />
        )}
      </div>

      {/* User Info */}
      <div className="info">
        {/* User Name */}
        <p className="user-name text-sm font-bold text-zinc-800">
          {`${session?.user.firstName} ${session?.user.lastName}`}
        </p>

        {/* User Email */}
        <p className="user-email text-xs text-zinc-800/50">
          {session?.user.email}
        </p>
      </div>
    </div>
  );
}
