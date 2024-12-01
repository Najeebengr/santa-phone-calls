"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.addEventListener("ended", handleEnded);
      currentAudioRef.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        currentAudioRef.removeEventListener("ended", handleEnded);
        currentAudioRef.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsExpanded(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsExpanded(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsExpanded(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full">
      {!isExpanded ? (
        <button
          onClick={togglePlayback}
          className="flex flex-col justify-center items-center w-[218px] h-[54px] rounded-[100px] box-border"
          style={{
            padding: "12px 24px 12px 20px",
            background:
              "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
            border: "3px solid rgba(217, 201, 153, 0.8)",
            boxShadow: "inset 0px 0px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="flex flex-row items-center gap-3 w-[174px] h-[30px]">
            <div
              className="w-[30px] h-[30px] rounded-full flex items-center justify-center box-border relative"
              style={{
                background:
                  "linear-gradient(93.5deg, #D7C798 22.11%, #EDE4CC 54.95%, #D7C798 79.77%)",
                border: "3px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0px 0px 44px rgba(217, 201, 153, 0.25)",
              }}
            >
              <Image
                src="/play.svg"
                width={14}
                height={14}
                alt="play"
                className="relative left-0.5"
              />
            </div>
            <span className="w-[132px] h-[24px] font-seasons font-bold text-[20px] leading-[24px] text-center text-white">
              Listen to a Call
            </span>
          </div>
        </button>
      ) : (
        <div
          className="flex items-center relative px-6 py-3 rounded-[100px] w-[218px]"
          style={{
            background:
              "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
            border: "3px solid rgba(217, 201, 153, 0.8)",
            boxShadow: "inset 0px 0px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayback}
            className="w-[30px] h-[30px] rounded-full p-0"
            style={{
              background:
                "linear-gradient(93.5deg, #D7C798 22.11%, #EDE4CC 54.95%, #D7C798 79.77%)",
              border: "3px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 0px 44px rgba(217, 201, 153, 0.25)",
            }}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-[#51422F]" />
            ) : (
              <Play className="h-4 w-4 text-[#51422F]" />
            )}
          </Button>

          <span className="text-[#D7C798] font-harmonia text-[20px] leading-[24px] font-bold absolute left-1/2 -translate-x-1/2">
            {formatTime(currentTime)}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="w-[30px] h-[30px] rounded-full p-0 absolute right-5"
            style={{
              background:
                "linear-gradient(93.5deg, #D7C798 22.11%, #EDE4CC 54.95%, #D7C798 79.77%)",
              border: "3px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 0px 44px rgba(217, 201, 153, 0.25)",
            }}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-[#51422F]" />
            ) : (
              <Volume2 className="h-4 w-4 text-[#51422F]" />
            )}
          </Button>
        </div>
      )}

      <audio
        ref={audioRef}
        src="https://santaphonecalls.com/wp-content/uploads/2024/11/AUDIO_6509.m4a"
        onEnded={handleEnded}
      />
    </div>
  );
}
