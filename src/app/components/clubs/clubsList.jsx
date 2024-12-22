'use client';
import { useDispatch } from 'react-redux';
import Loading from '../common/Loading';
import { useCommunities } from '@/hooks/useCommunities';
import ClubCard from './clubsCard';
import { useEffect, useState } from 'react';
import Search from './Search';

const ClubList = () => {
    const dispatch = useDispatch();
    const [filteredClubs, setFilteredClubs] = useState(null);
    const { clubs, error, isLoading } = useCommunities();

    // This useEffect will run when 'clubs' data is fetched
    useEffect(() => {
        if (clubs) {
            setFilteredClubs(clubs);
        }
    }, [clubs]);

    // Early return if loading or error
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

    // Render the club list only if filteredClubs are available
    return (
        <div className="p-6 space-y-4 flex flex-col items-center">
            <Search setFilteredClubs={setFilteredClubs} />
            {filteredClubs &&
                filteredClubs.map((club) => (
                    <ClubCard
                        key={club.id}
                        name={club.name}
                        description={club.description}
                        type={club.type}
                        image={club.image}
                        university={club.activityField}
                        communityId={club.id}
                        communityMembers={club.CommunityMember}
                    />
                ))}
        </div>
    );
};

export default ClubList;
