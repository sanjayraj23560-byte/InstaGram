"use client";

import React, { useRef, useState } from "react";
import { reelsData } from "@/data/reelsData";
import { ReelItem } from "@/types/reel";
import { BiComment, BiSolidCommentX } from "react-icons/bi";
import { Heart, Share, ShareIcon, ThumbsUp } from "lucide-react";

export default function ReelsFeed() {
    return (
        <main className="feedContainer">
            {reelsData.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
            ))}
        </main>
    );
}

function ReelCard({ reel }: { reel: ReelItem }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(reel.likes_count);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHasLiked(!hasLiked);
        setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
    };

    return (
        <section className="reelSection" onClick={togglePlay}>
            <video
                ref={videoRef}
                src={reel.video_url}
                poster={reel.thumbnail_url}
                loop
                playsInline
                className="videoPlayer rounded-2xl pt-3"
            />

            <div className="actionsSidebar">
                <button onClick={handleLike} className="actionBtn">
                    <span>{hasLiked ? <Heart className="text-red-500" /> : <Heart />}</span>
                    <small>{likes.toLocaleString()}</small>
                </button>
                <button className="actionBtn">
                    <BiComment />
                    <small>{reel.comments_count.toLocaleString()}</small>
                </button>
                <button className="actionBtn">
                    <ShareIcon />
                    <small>{reel.shares_count.toLocaleString()}</small>
                </button>
            </div>

            <div className="metaOverlay">
                <div className="userInfo">
                    <img
                        src={reel.user.avatar_url}
                        alt={reel.user.username}
                        className="avatar"
                    />
                    <span className="username">@{reel.user.username}</span>
                    {reel.user.is_verified && <span className="badge">✓</span>}
                </div>
                <p className="caption">{reel.caption}</p>
                <p className="audio">🎵 {reel.audio_name}</p>
            </div>
        </section>
    );
}