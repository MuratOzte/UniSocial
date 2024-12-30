'use client';
import Loading from '../common/Loading';
import { useCommunities } from '@/hooks/useCommunities';
import { useEffect, useState } from 'react';
import WhoToFollowCard from './WhoToFollowCard';
import { useWhoToFollow } from '@/hooks/useWhoToFollow';

const WhoToFollowList = () => {
    const { peoples, error, isLoading } = useWhoToFollow();

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

    return (
        <div className="w-full h-fit max-w-sm p-4 bg-main1 text-gray-800 rounded-lg shadow-lg flex gap-2 flex-col min-w-[350px]">
            <h3 className="text-lg font-semibold mb-1">Takip edilecek kişiler</h3>

            {peoples &&
                peoples.map((people, index) => (
                    <WhoToFollowCard
                        key={index}
                        id={people.id}
                        avatar={people.profilePicture}
                        name={people.name + ' ' + people.surname}
                        role={''}
                        userId={people.id}
                    />
                ))}
        </div>
    );
};

export default WhoToFollowList;
