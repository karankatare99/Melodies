"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Song } from '../lib/GetSession';
import ReactPlayer from 'react-player';
import axios from 'axios';

interface PlayerProps {
  spaceId: string;
}

export const VideoPlayer: React.FC<PlayerProps> = ({ spaceId }) => {
    const [song, setSong] = useState<Song>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onEnd()
    }, [spaceId])

    const onEnd = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const response = await axios.post('/api/space/topsong', { spaceId })
            const { topSong } = response.data;
            setSong(topSong);
        } catch (e) {
            console.log("Axios error")
            setIsLoading(false)
        }
    }

    return (
        <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden group"
        >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-full aspect-video rounded-4xl overflow-hidden mb-8 shadow-lg shadow-black/50 bg-slate-800">
            <ReactPlayer
                src={song?.url}
                width="100%" 
                height="100%" 
                className="absolute top-0 left-0"
                controls={false}
                onEnded={onEnd}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent pointer-events-none" />
        </div>

        <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-200 truncate pr-4">
                    {song?.title}
                </h2>
                <p className="text-slate-400 text-lg">{song?.channel}</p>
            </div>

        </div>

        </motion.div>
    );
};