'use client';
import { useDispatch } from 'react-redux';
import Loading from '../common/Loading';
import { useCommunities } from '@/hooks/useCommunities';
import ClubCard from './clubsCard';

const ClubList = () => {
    const dispatch = useDispatch();
    console.log('ClubList');

    const { clubs, error, isLoading } = useCommunities();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mt-16">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(clubs)

    return (
        <div className="p-6 space-y-4">
            {clubs &&
                clubs.map((club) => (
                    <ClubCard
                        key={club.id}
                        name={club.name}
                        description={club.description}
                        type={club.type}
                        image={club.image}
                        university={club.activityField}
                        communityId={club.id}
                        communityMembers={club.CommunityMember
                        }
                    />
                ))}
        </div>
    );
};

export default ClubList;
