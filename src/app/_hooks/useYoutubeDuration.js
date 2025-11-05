"use client";
import { useState, useEffect } from "react";

export function useYoutubeDuration(videoId, apiKey) {
  const [duration, setDuration] = useState(null); // in seconds
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId || !apiKey) return;

    const fetchDuration = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
        );
        const data = await res.json();
        const iso = data.items[0]?.contentDetails.duration;
        if (iso) {
          const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
          const hours = parseInt(match[1] || 0);
          const minutes = parseInt(match[2] || 0);
          const seconds = parseInt(match[3] || 0);
          setDuration(hours * 3600 + minutes * 60 + seconds);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDuration();
  }, [videoId, apiKey]);

  return { duration, loading };
}
